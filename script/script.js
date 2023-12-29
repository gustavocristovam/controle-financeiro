
function neww() {
    let modal = document.querySelector('div.modal-overlay')

    modal.setAttribute('class', `${modal.getAttribute('class')} active`)
}

function cancel() {
    var modal = document.querySelector('div.modal-overlay')
    modal.setAttribute('class', `modal-overlay`)
}

function formatCurrency(amount) {
    const signal = amount < 0 ? "-" : ""
   

    amount = String(amount).replace(/\D/g, "")
    amount = Number(amount) 

    const formatoMoeda = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL' // Código de moeda para Real Brasileiro
    });
    // Formatando o valor como moeda
    const valorFormatado = signal + formatoMoeda.format(amount);

    return valorFormatado;
}

function adicionar() {
    // Obter os valores dos campos de entrada
    var description = document.querySelector('input#descriptionid').value;
    var amount = Number(document.querySelector('input#valueid').value);
    var date = document.querySelector('input#dataid').value;
    // Obter a referência ao tbody da tabela
    const tbody = document.querySelector('#dados-tabela tbody');

    // Criar uma nova linha
    const novaLinha = document.createElement('tr');

    const CSSCla = amount > 0 ? "in" : "out"
    var amount = formatCurrency(amount)

    // Adicionar células à nova linha
    novaLinha.innerHTML = `
        <td class="description">${description}</td>
        <td class="entrada ${CSSCla}">${amount}</td>
        <td class="date">${date}</td>
        <td><img class='img' src="imagens/remove.png" alt="Remove"></td>
    `;

    // Adicionar a nova linha ao tbody
    tbody.appendChild(novaLinha);
    updateBalance()
}

function updateBalance() {

    document.querySelector('p#entrada_amount').innerHTML = formatCurrency(somaEntradas())
    document.querySelector('p#saida_amount').innerHTML = formatCurrency(somaSaidas())
    document.querySelector('p#total_amount').innerHTML = formatCurrency(somaTotal())



}

function somaEntradas() {
    return calcularTotal('.in');
}

function somaSaidas() {
    return calcularTotal('.out');
}


function somaTotal() {
   var total = somaEntradas() + somaSaidas() 
   
    return total
}

function calcularTotal(classe) {
    let total = 0;
    const tabela = document.getElementById('dados-tabela');
    const linhas = tabela.querySelectorAll('tbody tr');

    linhas.forEach(linha => {
        let celulaAmount = linha.querySelector(classe);
        console.log(celulaAmount)
        // Adicione uma verificação para garantir que celulaAmount não seja nulo
        if (celulaAmount) {
            let valorAmount = parseFloat(celulaAmount.textContent.trim().replace(/\s+/g, '').replace(/R\$/g, '').replace(/[^\d,-]/g, '')); 
          


            if (!isNaN(valorAmount)) {
                total += valorAmount;
            } 
        }
    });

    
    return total;
}
