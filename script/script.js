
function neww() {
    let modal = document.querySelector('div.modal-overlay')

    modal.setAttribute('class', `${modal.getAttribute('class')} active`)
}

function cancel() {
    var modal = document.querySelector('div.modal-overlay')
    modal.setAttribute('class', `modal-overlay`)
}

function formatCurrency(amount) {
        const signal = amount > 0 ? "+" : ""
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

    const CSSCla = amount > 0 ? "entrada" : "saida"
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

    console.log(tbody);
}
