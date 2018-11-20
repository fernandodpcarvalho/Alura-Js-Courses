//target = Referência para o elemento cujo método foi decorado por logarTempoDeExecucao.
//propertyKey =  String que nos retorna o nome do método decorado.
//descriptor = Dá acesso ao método que desejamos modificar sua execução, através de descriptor.value
System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function throttle(milissegundos = 500) {
        return function (target, propertyKey, descriptor) {
            const metodoOriginal = descriptor.value;
            let timer = 0;
            descriptor.value = function (...args) {
                if (event)
                    event.preventDefault();
                clearInterval(timer);
                timer = setTimeout(() => metodoOriginal.apply(this, args), milissegundos);
            };
            return descriptor;
        };
    }
    exports_1("throttle", throttle);
    return {
        setters: [],
        execute: function () {
            //target = Referência para o elemento cujo método foi decorado por logarTempoDeExecucao.
            //propertyKey =  String que nos retorna o nome do método decorado.
            //descriptor = Dá acesso ao método que desejamos modificar sua execução, através de descriptor.value
        }
    };
});
