
//target = Referência para o elemento cujo método foi decorado por logarTempoDeExecucao.
//propertyKey =  String que nos retorna o nome do método decorado.
//descriptor = Dá acesso ao método que desejamos modificar sua execução, através de descriptor.value

export function logarTempoDeExecucao() {

    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {

            const metodoOriginal = descriptor.value;

            descriptor.value = function(...args: any[]) {
                console.log('-----------------------')
                console.log(`Parâmetros do método ${propertyKey}: ${JSON.stringify(args)}`);
                const t1 = performance.now();
                const resultado = metodoOriginal.apply(this, args);
                console.log(`Resultado do método: ${JSON.stringify(resultado)}` )
                const t2 = performance.now();
                console.log(`${propertyKey} demorou ${t2 - t1} ms`);
                console.log('-----------------------')
                return resultado;
            }
            return descriptor;
    }

}