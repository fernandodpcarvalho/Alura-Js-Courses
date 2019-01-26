var fs = require('fs');

//A escrita do arquivo é feita ao mesmo tempo da leitura. 
//Não transfere tudo para um buffer para depois executar a escrita.
//Melhor que trabalhar com buffer. V8 armazana até 1Gb em memória
fs.createReadStream('imagem2.jpg')
  .pipe(fs.createWriteStream('imagem-com-stream.jpg'))
  .on('finish', function() {
    console.log('arquivo escrito com stream');
  });