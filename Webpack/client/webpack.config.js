const path = require('path');
const babiliPlugin = require('babili-webpack-plugin');

let plugins = [];

if(process.env.NODE_ENV == 'production') {
    plugins.push(new babiliPlugin());
}

module.exports = {
    //Módulo o qual o webpack usará para construir o gráfico interno de dependência
    //Desta forma, o webpack irá encontrar todas as dependências e fazer a importação.
    //Por padrão o ponto de entrada é definido no arquivo ./src/index.js
    entry: './app-src/app.js',
    //Define o nome e o local do pacote gerado pelo webpack
    //Padrão: ./dist/main.js
    //A variável do nodejs __dirname contém o nome do diretório onde se encontra o módulo atual. 
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                use: {
                    loader: 'babel-loader' //Webpack conhece arquivos javascript. Loader permite usar outros arquivos, ou converter versões..
                }
            }
        ]
    },
    plugins
}