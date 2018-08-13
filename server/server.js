const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/config').get(process.env.NODE_ENV);
const { empreendedor } = require('./models/cadastro_model');
const { CadastroRt } = require('./models/cadastro_rt');

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
mongoose.connect('mongodb://localhost:27017/sim_anuencia_db', err => {
    if (err) {
        console.log(err);
    }
});


app.get('/api/showEmpreend', (req, res) => {
    let skip = parseInt(req.query.skip);
    let limit = parseInt(req.query.limit);
    let order = req.query.order;
    
    empreendedor.find().sort({nome: 1}).exec((err, doc) => {
        if (err) return err;
        res.send(doc);
        
        
    });

    /*  Empreend.find().skip(skip).sort({_id:order}).limit(limit).exec((err, doc) => {
         if(err) return err;
         res.send(doc)
     }) */
});



app.post('/api/cadastro_emp', (req, res) => {

    const cadastroEmp = new empreendedor(req.body);

    cadastroEmp.save((err, doc) => {
        if (err) return res.status(400).send(err);
        res.status(200).json({
            post: true,
            Cadastro_id: doc._id
        })
    });

});

app.post('/api/cadastro_rt', (req, res) => {

    const RT = new CadastroRt(req.body);

    RT.save((err, doc) => {
        if (err) return res.status(400).send(err);
        res.status(200).json({
            post: true,
            RT_id: doc._id
        })
    });

});


/* app.post('/api/empreend_update', (req, res) =>{
    Empreend.findByIdAndUpdate(req.body._id, req.body, (err, doc) )
}); */


app.post('/api/findEmpreend/:id', (req, res) => {
    Empreend.findById(req.param._id, (err, doc) => {
        !err ? res.send(doc) : console.log(err);
    })
});

app.get("/api/delEmpreend/:id", function (req, res) {
    empreendedor.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            console.log(err);
            res.redirect("/");
        } else {
            res.redirect("/");
        }
    });
});


const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Running...`)
});
