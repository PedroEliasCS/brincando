const request = require('request')
const fs = require('fs');
const {
    rejects
} = require('assert');

const padronizaString = (texto) => { // funcao que tira acentos e deixa toda a string maiscula
    return ((texto).toUpperCase()).normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}


let bairro = 'Pinheiros'
let endereco = 'RUA dos Pinheiros'
bairro = padronizaString(bairro)
endereco = padronizaString(bairro)
//console.log(bairro,   ' as ')

let op = { //  confugração da busca
    uri: 'http://cep.la/pinheiros/RUA-dos-Pinheiros',
    headers: {
        'Accept': 'application/json'
    }
}


const teste = async () => {
    let valor = {
        UF: 'PEDRO',
        cep: 0000000
    }
    await request.get(op, async function (error, response, body) { // faz o request de metodo GET
        if (!error && response.statusCode == 200) { // se n houver erros e retornar 200 que é o codigo que deu certo

            let a = JSON.parse(body) // converte o json que chegou em um Array para ser usado

            fs.writeFile('./pedro.json', body, err => { // escreve o json 
                if (err) console.log(err)
            })

            if (a.length == 1) { // se o json só houver uma informação retorna somente ela
                valor.UF = a[prop]['uf']
                valor.cep = a[prop]['cep']
                return
            }

            for (let prop in a) { // passsa 1 ha 1 procurando o bairro e a rua
                let stringBairro = padronizaString(a[prop]['bairro'])
                let stringEndereco = padronizaString(a[prop]['logradouro'])
                if ((stringBairro.indexOf(bairro) > -1) == true || (bairro.indexOf(stringEndereco) > -1) == true) {
                    // console.log(stringEndereco, ' achou o bairro')
                    if ((stringEndereco.indexOf(endereco) > -1) == true) {
                        valor.UF = a[prop]['uf']
                        valor.cep = a[prop]['cep']
                        return
                    }
                }
            }
            //   return valores
        }
    })

    return valor


}

const teste1 = (a) => {
    return a
}
const pedro = async () => {
    let a = await teste()
   console.log( await teste1(a))
   

 //   console.log('tem q acontecer dps')
}
pedro()