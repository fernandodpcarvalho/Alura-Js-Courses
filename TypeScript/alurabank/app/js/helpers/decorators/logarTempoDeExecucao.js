//target = Referência para o elemento cujo método foi decorado por logarTempoDeExecucao.
//propertyKey =  String que nos retorna o nome do método decorado.
//descriptor = Dá acesso ao método que desejamos modificar sua execução, através de descriptor.value
System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function logarTempoDeExecucao() {
        return function (target, propertyKey, descriptor) {
            const metodoOriginal = descriptor.value;
            descriptor.value = function (...args) {
                console.log('-----------------------');
                console.log(`Parâmetros do método ${propertyKey}: ${JSON.stringify(args)}`);
                const t1 = performance.now();
                const resultado = metodoOriginal.apply(this, args);
                console.log(`Resultado do método: ${JSON.stringify(resultado)}`);
                const t2 = performance.now();
                console.log(`${propertyKey} demorou ${t2 - t1} ms`);
                console.log('-----------------------');
                return resultado;
            };
            return descriptor;
        };
    }
    exports_1("logarTempoDeExecucao", logarTempoDeExecucao);
    return {
        setters: [],
        execute: function () {
            //target = Referência para o elemento cujo método foi decorado por logarTempoDeExecucao.
            //propertyKey =  String que nos retorna o nome do método decorado.
            //descriptor = Dá acesso ao método que desejamos modificar sua execução, através de descriptor.value
        }
    };
});
