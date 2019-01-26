var fs = require('fs');

//Buffer mode = Primeiro carrega o arquivo todo em memória (buffer) para depois executar o callback.
fs.readFile('praia.jpg', function(error, buffer) {
    console.log('arquivo lido');

    fs.writeFile('imagem2.jpg', buffer, function() {
        console.log('arquivo escrito');
    });
});