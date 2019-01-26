var fs = require('fs');
module.exports = function(app) {

    //Colocar no header da requisiçao: "Content-type: application/octet-stream" e "filname: _file_name_"
    app.post("/upload/imagem", function(req, res) {
        console.log('recebendo imagem');

        var filename = req.headers.filename;

        req.pipe(fs.createWriteStream('files/' + filename))
           .on('finish', function() {
            console.log('Arquivo escrito');
            res.status(201).send('ok');
           })
    });
}