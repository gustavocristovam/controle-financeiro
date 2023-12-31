
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


    amount = String(amount).replace(/[^\d.]/g, "")

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
    var amount = parseFloat(document.querySelector('input#valueid').value);
    var date = document.querySelector('input#dataid').value;
    // Obter a referência ao tbody da tabela
    const tbody = document.querySelector('#dados-tabela tbody');

    // Obter a lista de transações do Local Storage
    var transacoes = obterTransacoesDoLocalStorage();

    // Adicionar a nova transação à lista
    var novatransacao = {
        id: new Date().getTime(),
        description: description,
        amount: amount,
        date: date
    };

    transacoes.push(novatransacao)

    // Salvar a lista atualizada de transações no Local Storage
    salvarTransacoesNoLocalStorage(transacoes);


    adicionarLinhaNaTabela(novatransacao);

    
}

function adicionarLinhaNaTabela(transacoes) {
    // Obter a referência ao tbody da tabela
   
        // Verificar se o valor é um objeto
        if (typeof transacoes === 'object' && transacoes !== null && !Array.isArray(transacoes)) {
          // Transformar o objeto em uma array
          transacoes = [transacoes];
         
        } 
     
    console.log(transacoes)
    console.log(transacoes.length)
  
    for(let transacao in transacoes) {
        
    const tbody = document.querySelector('#dados-tabela tbody');

    // Criar uma nova linha
    const novaLinha = document.createElement('tr');

    const CSSCla = transacoes[transacao].amount > 0 ? "in" : "out";
    var amount = formatCurrency(transacoes[transacao].amount);


    novaLinha.setAttribute('data-id', transacoes[transacao].id);

    // Adicionar células à nova linha
    novaLinha.innerHTML = `
        <td class="description">${transacoes[transacao].description}</td>
        <td class="entrada ${CSSCla}">${amount}</td>
        <td class="date">${transacoes[transacao].date}</td>
        <td><img class='img' src="imagens/remove.png" alt="Remove" onclick='remove(${transacoes[transacao].id})'></td>
    `;

    // Adicionar o identificador único como data-id à linha
    

    // Adicionar a nova linha ao tbody
    tbody.appendChild(novaLinha);
    }
    updateBalance();
}

// Função para obter a lista de transações do Local Storage
function obterTransacoesDoLocalStorage() {
    var transacoes = localStorage.getItem('transacoes');

    // Se não houver transações armazenadas, retorna um array vazio
    return transacoes ? JSON.parse(transacoes) : [];
}

// Função para salvar a lista de transações no Local Storage
function salvarTransacoesNoLocalStorage(transacoes) {
    localStorage.setItem('transacoes', JSON.stringify(transacoes));
   
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
    var transacoes = obterTransacoesDoLocalStorage();


    transacoesAmount = transacoes.map(transacao => transacao.amount)
    
    var transacao_soma = 0

    for (let transacao in transacoesAmount) {
        if (classe == '.in' && transacoesAmount[transacao] >0) {
            
            transacao_soma += transacoesAmount[transacao]

          
        } else if (classe == '.out'  && transacoesAmount[transacao] < 0){
            transacao_soma += transacoesAmount[transacao]

            
        }
    }
    return transacao_soma;
    
    
};



function clearTransation() {
    document.querySelector('#dados-tabela tbody').innerHTML = ''
}

function remove(id) {
    var transacoes = obterTransacoesDoLocalStorage();

    // Remover a transação da lista com base no identificador único
    transacoes = transacoes.filter(transacao => transacao.id !== id);

    // Salvar a lista atualizada de transações no Local Storage
    salvarTransacoesNoLocalStorage(transacoes);

    // Remover a linha da tabela com base no identificador único
    var linhaParaRemover = document.querySelector(`#dados-tabela tbody tr[data-id="${id}"]`);

  
    linhaParaRemover.remove();

    // Atualizar os saldos
    
    updateBalance();
}


adicionarLinhaNaTabela(obterTransacoesDoLocalStorage());


