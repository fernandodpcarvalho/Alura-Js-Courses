import { NegociacoesView, MensagemView } from '../views/index';
import { Negociacao, Negociacoes } from '../models/index';
import { domInject, throttle } from '../helpers/decorators/index';
import { NegociacaoService } from '../services/index';
import { imprime } from '../helpers/index';

export class NegociacaoController {

    @domInject('#data')
    private _inputData: JQuery;

    @domInject('#quantidade')
    private _inputQuantidade: JQuery;

    @domInject('#valor')
    private _inputValor: JQuery;

    private _negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView('#negociacoesView');
    private _mensagemView = new MensagemView('#mensagemView');
    private _negociacaoService = new NegociacaoService();

    constructor() {
        this._negociacoesView.update(this._negociacoes);
    }

    @throttle()
    adiciona() {
        let dataInput: any = $(this._inputData).val();

        let data = new Date(dataInput.replace(/-/g, ','));

        if (!this._ehDiaUtil(data)) {
            this._mensagemView.update('Somente negociações em dias úteis, por favor!');
            return
        }

        let quantidadeInput: any = $(this._inputQuantidade).val();
        let valorInput: any = $(this._inputValor).val();

        const negociacao = new Negociacao(
            data,
            parseInt(quantidadeInput),
            parseFloat(valorInput)
        );

        
        this._negociacoes.adiciona(negociacao);

        imprime(negociacao, this._negociacoes);
        
        this._negociacoesView.update(this._negociacoes);
        this._mensagemView.update('Negociação adicionada com sucesso!');
    }

    private _ehDiaUtil(data: Date) {

        return data.getDay() != DiaDaSemana.Sabado && data.getDay() != DiaDaSemana.Domingo;
    }

    @throttle(500)
    async importaDados() {
        try {
            const negociacoesParaImportar = await this._negociacaoService
                .obterNegociacoes(res => {
                    if (res.ok) {
                        return res;
                    } else {
                        throw new Error(res.statusText);
                    }
                });
                    
            const negociacoesJaImportadas = this._negociacoes.paraArray();

            negociacoesParaImportar
                .filter(negociacao => 
                    !negociacoesJaImportadas.some(jaImportada => 
                        negociacao.ehIgual(jaImportada)))
                .forEach(negociacao => 
                this._negociacoes.adiciona(negociacao));

            this._negociacoesView.update(this._negociacoes);
        } catch(err) {
            this._mensagemView.update(err.message);
        }    
    }


    // importaDados() {

    //     this._negociacaoService
    //         .obterNegociacoes(res => {
    //             if (res.ok) {
    //                 return res;
    //             } else {
    //                 throw new Error(res.statusText);
    //             }
    //         })
    //         .then((negociacoesParaImportar: any) => {
                
    //             const negociacoesJaImportadas = this._negociacoes.paraArray();

    //             negociacoesParaImportar
    //                 .filter((negociacao: any) => 
    //                     !negociacoesJaImportadas.some(jaImportada => 
    //                         negociacao.ehIgual(jaImportada)))
    //                 .forEach((negociacao: any) => 
    //                 this._negociacoes.adiciona(negociacao));
        
    //             this._negociacoesView.update(this._negociacoes);
    //         })
    //         .catch(err => {
    //             this._mensagemView.update(err.message);
    //         });    
    // }
}

enum DiaDaSemana {
    Domingo,
    Segunda,
    Terca,
    Quarta,
    Quinta,
    Sexta,
    Sabado
}