var valores = ['R$ 0,25', 'R$ 5,00', 'R$ 3.000,25', '-R$ 600,00'];

valores.forEach(valor => {
    // Substitui vírgulas por pontos para garantir que o ponto decimal seja reconhecido corretamente
    valor = valor.replace(',', '.');

    // Ajusta a expressão regular para permitir pontos como separadores de milhar
    var n = parseFloat(valor.replace(/[^\d,-]/g, '').replace(/,(?=\d{3})/g, '')); 

     n = n / 100
    console.log(n);
});
