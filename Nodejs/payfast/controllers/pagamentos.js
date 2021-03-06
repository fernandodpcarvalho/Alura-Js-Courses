const PAGAMENTO_CRIADO = "CRIADO";
const PAGAMENTO_CONFIRMADO = "CONFIRMADO";
const PAGAMENTO_CANCELADO = "CANCELADO";

var logger = require('../servicos/logger.js');

module.exports = function(app) {

    app.get('/pagamentos', function(req, res) {
        console.log('Recebida requisição de teste');
        res.send('OK');
    });

    app.get('/pagamentos/pagamento/:id', function(req, res) {
        var id = req.params.id;
        console.log('consultando pagamento: '+id);
        logger.info('consultando pagamento: '+id);

        //primeiro consulta no cache
        var memcachedClient = app.servicos.memcachedClient();
        memcachedClient.get('pagamento-'+id, function(erro, retorno) {
            if(erro || !retorno) {
                console.log('MISS - Chave '+id+' não encontrada');
                var connection = app.persistencia.connectionFactory();
                var pagamentoDao = new app.persistencia.PagamentoDao(connection);

                pagamentoDao.buscaPorId(id, function(erro, resultado) {
                    if(erro) {
                        console.log('erro ao consultar o banco' + erro);
                        res.status(500).send(erro);
                        return;
                    }

                    console.log('pagamento encontrado: ' + JSON.stringify(resultado));
                    res.json(resultado);
                    return;
                });
            } else {
                console.log('HIT - valor: '+JSON.stringify(retorno));
                res.json(retorno);
                return
            }
        });
    });


    app.post('/pagamentos/pagamento', function(req, res) {

        req.assert("pagamento.forma_de_pagamento", "Forma de pagamento é obrigatória").notEmpty();
        req.assert("pagamento.valor", "Valor é obrigatório e deve ser um decimal").notEmpty().isFloat();

        var erros = req.validationErrors();
        if(erros) {
            console.log('erros de validação encontrados');
            res.status(400).send(erros);
            return;
        }

        var pagamento = req.body["pagamento"];
        console.log('Processando requisição de pagamento');
        pagamento.status = PAGAMENTO_CRIADO;
        pagamento.data = new Date;

        var connection = app.persistencia.connectionFactory();
        var pagamentoDao = new app.persistencia.PagamentoDao(connection);

        pagamentoDao.salva(pagamento, function(error, result){
            if(error) {
                console.log('Erro ao inserir no banco');
                res.status(400).send(error);
            } else {
                pagamento.id = result.insertId;
                console.log('pagamento criado: ' + result);

                //Inserindo no cache - chave + pagamento
                var memcachedClient = app.servicos.memcachedClient();
                memcachedClient.set('pagamento-'+pagamento.id, pagamento, 300000, function(erro) {
                        console.log('Nova chave adicionada ao cache: pagamento-'+pagamento.id);
                    });

                if(pagamento.forma_de_pagamento == 'cartao') {
                    var cartao = req.body["cartao"];
                    console.log(cartao);

                    var clienteCartoes = new app.servicos.clienteCartoes();
                    clienteCartoes.autoriza(cartao, function(erro, request, response, retorno){
                        if(erro) {
                            console.log(erro);
                            res.status(400).send(erro);
                            return;
                        }
                        console.log(retorno);

                        res.location('/pagamentos/pagamento/' + result.insertId);
                        var response = {
                            dados_do_pagamento: pagamento,
                            cartao: retorno,
                            links: [
                                {
                                    href: "http://localhost:3000/pagamentos/pagamento/" + pagamento.id,
                                    rel:"confirmar",
                                    method:"PUT"
                                },
                                {
                                    href: "http://localhost:3000/pagamentos/pagamento/" + pagamento.id,
                                    rel:"cancelar",
                                    method:"DELETE"
                                }
                            ]
                        }

                        res.status(201).json(response);
                        return;
                    });

                } else {
                    res.location('/pagamentos/pagamento/' + result.insertId);
                    var response = {
                        dados_do_pagamento: pagamento,
                        links: [
                            {
                                href: "http://localhost:3000/pagamentos/pagamento/" + pagamento.id,
                                rel:"confirmar",
                                method:"PUT"
                            },
                            {
                                href: "http://localhost:3000/pagamentos/pagamento/" + pagamento.id,
                                rel:"cancelar",
                                method:"DELETE"
                            }
                        ]
                    }
                    res.status(201).json(response);
                }
            }
        });
    });

    app.put('/pagamentos/pagamento/:id', function(req, res) {

        var pagamento = {};
        var id = req.params.id;

        pagamento.id = id;
        pagamento.status = PAGAMENTO_CONFIRMADO;

        var connection = app.persistencia.connectionFactory();
        var pagamentoDao = new app.persistencia.PagamentoDao(connection);

        pagamentoDao.atualiza(pagamento, function(erro) {
            if(erro) {
                console.log('Erro ao atualizar pagamento');
                res.status(500).send(erro);
                return;
            }
            res.send(pagamento);
        });

    });

    app.delete('/pagamentos/pagamento/:id', function(req, res) {

        var pagamento = {};
        var id = req.params.id;

        pagamento.id = id;
        pagamento.status = PAGAMENTO_CANCELADO;

        var connection = app.persistencia.connectionFactory();
        var pagamentoDao = new app.persistencia.PagamentoDao(connection);

        pagamentoDao.atualiza(pagamento, function(erro) {
            if(erro) {
                console.log('Erro ao cancelar pagamento');
                res.status(500).send(erro);
                return;
            }
            console.log('pagamento cancelado');
            res.status(204).send(pagamento);
        });

    });
}

