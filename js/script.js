// Data de hoje no formato AAAA-MM-DD (o mesmo do input type="date")
function obterDataDeHoje() {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const dia = String(hoje.getDate()).padStart(2, '0');
    return ano + '-' + mes + '-' + dia;
}

// AAAA-MM-DD -> DD/MM/AAAA
function formatarData(dataIso) {
    const partes = dataIso.split('-');
    return partes[2] + '/' + partes[1] + '/' + partes[0];
}

const dataDeHoje = obterDataDeHoje();