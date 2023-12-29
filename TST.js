function somaEntradas() {
    return calcularTotal('.in');
}

function somaSaidas() {
    return calcularTotal('.out');
}


function calcularTotal(classe) {
  linhas = ['-R$ 30,00','R$ -50,00','-R$25,00']
    total = 0
    linhas.forEach(linha => {
        let celulaAmount = linha

        // Adicione uma verificação para garantir que celulaAmount não seja nulo
        if (celulaAmount) {
            let valorAmount = parseFloat(celulaAmount.trim().replace(/\s+/g, '').replace(/R\$/g, '')); 
            console.log(typeof(valorAmount))
            console.log(valorAmount)


            if (!isNaN(valorAmount) && valorAmount > 0) {
                total += valorAmount;
            } else if(!isNaN(valorAmount) && valorAmount < 0) {
                
                total -= valorAmount;
            }
        }
    });

    
    return total;
}


somaEntradas()