
//target = Referência para o elemento cujo método foi decorado por logarTempoDeExecucao.
//propertyKey =  String que nos retorna o nome do método decorado.
//descriptor = Dá acesso ao método que desejamos modificar sua execução, através de descriptor.value

export function throttle(milissegundos = 500) {

    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {

            const metodoOriginal = descriptor.value;

            let timer = 0;

            descriptor.value = function(...args: any[]) {
                if(event) event.preventDefault();
                clearInterval(timer);
                timer = setTimeout(() => metodoOriginal.apply(this, args), milissegundos);
            }
            return descriptor;
    }

}