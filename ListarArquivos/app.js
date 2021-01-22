const fs = require('fs');

let files = [];//Vetor para armazenar todos os nomes dos arquivos lidos

let pathDir = './teste'
let locData = []
let dirR = []

const readDic2 = (data, dir) => {
    fs.readdirSync(dir + data).forEach(file => {
        readDic(data + '/' + file)
    });
};

const readDic = (data, dir = './teste/')  => {
    if((data.substr(data.lastIndexOf('.') +1)) != 'txt') {
        readDic2(data, dir)
    }else{
        console.log('a')
        locData.push(dir + data)
    }
};

const inio = (pathFiles) => {
    fs.readdirSync(pathFiles).forEach(file => {
        readDic(file)
    });
};

inio(pathDir)
console.log(locData)



