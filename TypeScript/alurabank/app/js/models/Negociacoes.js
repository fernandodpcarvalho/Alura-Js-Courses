System.register([], function (exports_1, context_1) {
    "use strict";
    var Negociacoes;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            // import { Negociacao} from './Negociacao';
            // import { Igualavel} from './Igualavel';
            // import { Imprimivel} from './Imprimivel';
            Negociacoes = class Negociacoes {
                constructor() {
                    // export class Negociacoes implements Imprimivel, Igualavel<Negociacoes> {
                    this._negociacoes = [];
                }
                adiciona(negociacao) {
                    this._negociacoes.push(negociacao);
                }
                paraArray() {
                    return [].concat(this._negociacoes);
                }
                paraTexto() {
                    console.log('-- paraTexto --');
                    console.log(JSON.stringify(this._negociacoes));
                }
                ehIgual(negociacoes) {
                    return JSON.stringify(this._negociacoes) == JSON.stringify(negociacoes.paraArray);
                }
            };
            exports_1("Negociacoes", Negociacoes);
        }
    };
});
