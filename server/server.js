const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/config').get(process.env.NODE_ENV);
const { Empreend } = require('./models/cadastro_emp_model');

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
mongoose.connect('mongodb://localhost:27017/sim_anuencia_db', err => {
    if(err) {
        console.log(err);
    }
});


app.get('/api/showEmpreend', (req, res) => {
    let skip = parseInt(req.query.skip);
    let limit = parseInt(req.query.limit);
    let order = req.query.order;

    Empreend.find().exec((err, doc) => {
        if(err) return err;
        res.send(doc);
    });
    
   /*  Empreend.find().skip(skip).sort({_id:order}).limit(limit).exec((err, doc) => {
        if(err) return err;
        res.send(doc)
    }) */
});
    


app.post('/api/cadastro_emp', (req, res) => {
   
    const empreend = new Empreend(req.body); 
    
    empreend.save((err, doc) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({
            post: true,
            Empreend_id: doc._id
        })
    });

});

app.post('/api/empreend_update', (req, res) =>{
    Empreend.findByIdAndUpdate(req.body._id, req.body, (err, doc) )
});





const port = process.env.PORT || 3001;
app.listen(port, () => {
console.log(`Hell ya Running...`)
});
