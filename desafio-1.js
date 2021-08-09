dadosClientes = [
    {nome: "Lucas",
    sobrenome: "da Silva",
    idade: 21,
    genero: "Masculino",
    plano: "full",
    carencia: false,
    aquisicao: "12/01/2019"},
    {nome: "Ana",
    sobrenome: "Lima",
    idade: 17,
    genero: "Feminino",
    plano: "medium",
    carencia: false,
    aquisicao: "17/03/2019"},
    {nome: "Adriana",
    sobrenome: "Menezes",
    idade: 27,
    genero: "Feminino",
    plano: "full",
    carencia: true,
    aquisicao: "14/09/2020"}
]
// module.exports.retornaLista ....
var retornaLista = (array) => {
    var lista = [];
    for (var i=0;i < array.length; i++)
    {
        if (array[i].idade <= 26 && array[i].idade >= 18)
        {
            lista.push(array[i]);
        }
    }
    return lista}
retornaLista(dadosClientes)