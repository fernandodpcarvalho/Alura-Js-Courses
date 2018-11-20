import { Negociacao, MeuObjeto } from './index';
// import { Negociacao} from './Negociacao';
// import { Igualavel} from './Igualavel';
// import { Imprimivel} from './Imprimivel';

export class Negociacoes implements MeuObjeto<Negociacoes> {
// export class Negociacoes implements Imprimivel, Igualavel<Negociacoes> {

    private _negociacoes: Negociacao[] = [];

    adiciona(negociacao: Negociacao): void {

        this._negociacoes.push(negociacao);
    }

    paraArray(): Negociacao[] {

        return ([] as Negociacao[]).concat(this._negociacoes);
    }

    paraTexto(): void {

        console.log('-- paraTexto --');
        console.log(JSON.stringify(this._negociacoes));
    }

    ehIgual(negociacoes: Negociacoes): boolean {

        return JSON.stringify(this._negociacoes) == JSON.stringify(negociacoes.paraArray);
    }
}