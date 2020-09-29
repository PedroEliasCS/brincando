const express = require('express');
const path = require('path');
const app = express();
let multer = require('multer');

app.use(express.static(path.join(__dirname, 'views')));
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html') // seta html como render padrão
app.use(express.urlencoded({
    extended: false
}));

let storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        console.log('dentro do destination');
        cb(null, './temp');         // faz o retorno a passa a back
    },
    filename: (req, file, cb) => {
        console.log('dentro de fileName')
        const fileName = Date.now() + '' + Math.round(Math.random() * 1E9)
        cb(null, fileName + '.txt') // nome do arquivo e "extensão"
    },
    
});

let upload = multer({
    storage: storage,
});

app.post('/home', upload.single('inputTxt'), async function (req, res) { 

    // sistema só chegara nessa parte se multer conseguir salvar o arquivo sem erros
    console.log(req.file, ' file')

    res.send('deu certo?')
});


app.get('/home', (req, res) => { // homeeeee
    res.render('home')
})


app.listen(3000, () => {
    console.log('ligado em 3000')
})