
function calcularTotal(classe) {
  linhas = ['-R$ 3000,00','R$ -50,00','-R$25,00']
    total = 0
    linhas.forEach(linha => {
        let celulaAmount = linha

        // Adicione uma verificação para garantir que celulaAmount não seja nulo
        if (celulaAmount) {
            let valorAmount = parseFloat(celulaAmount.trim().replace(/\s+/g, '').replace(/R\$/g, '')); 
            console.log(typeof(valorAmount))
            console.log(valorAmount)


            if (!isNaN(valorAmount) ) {
                total += valorAmount;
               
            }
        }
    });

    
    
    console.log(total)
    return total;
}


calcularTotal()