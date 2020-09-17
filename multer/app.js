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



        cb(null, './temp');

        console.log('pedro 33 ')
        
    },
    filename: (req, file, cb) => {
        console.log('dentro de fileName')
        const fileName = Date.now() + '' + Math.round(Math.random() * 1E9)
        cb(null, fileName + '.txt')
    },
});
// 
let upload = multer({
    storage: storage,
});

app.post('/home', upload.single('file'), async function (req, res) {

    console.log(req.file, ' file')

    res.send('deu certo?')
});


app.get('/home', (req, res) => {
    res.render('home')
})


app.listen(3000, () => {
    console.log('ligado em 3000')
})