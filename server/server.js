const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/config').get(process.env.NODE_ENV);

const { empreendedor } = require('./models/empModel');
const { CadastroRt } = require('./models/rtModel');
const { processModel } = require('./models/processModel');

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
mongoose.connect('mongodb://localhost:27017/sim_anuencia_db', err => {
    if (err) {
        console.log(err);
    }
});


app.get('/api/showEmpreend', (req, res) => {

    empreendedor.find().sort({ nome: 1 }).exec((err, doc) => {
        if (err) return err;
        res.send(doc);
    });
});

app.get('/api/showRt', (req, res) => {

    CadastroRt.find().sort({ nomeRt: 1 }).exec((err, doc) => {
        if (err) return err;
        res.send(doc);
    });
});

app.get('/api/showProcess', (req, res) => {

    processModel.find().sort({ nomeRt: 1 }).exec((err, doc) => {
        if (err) return err;
        res.send(doc);
    });
});

app.get('api/findEmp', (req, res) => {
    empreendedor.find({ nome: { $eq: req.params } }).exec((err, doc) => {
        if (err) return err;
        res.send(doc);
    })
})

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

app.post('/api/cadastro_process', (req, res) => {

    const cadastroProcess = new processModel(req.body);

    cadastroProcess.save((err, doc) => {
        if (err) return res.status(400).send(err);
        res.status(200).json({
            post: true,
            process_id: doc._id
        })
    });

});

app.post('/api/findEmpreend/:id', (req, res) => {
    Empreend.findById(req.param._id, (err, doc) => {
        !err ? res.send(doc) : console.log(err);
    })
});

app.delete('/api/deleteEmp/:id', function (req, res) {
    empreendedor.deleteOne({ '_id': req.params.id })
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
})

app.delete("/api/deleteRt/:id", function (req, res) {

    CadastroRt.deleteOne({ '_id': req.params.id })
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
})

app.delete('/api/deleteProcess/:id', function (req, res) {

    processModel.deleteOne({ '_id': req.params.id })
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
})

app.put('/api/editEmp/', (req, res) => {

    empreendedor.update(
        { '_id': req.body.item._id },
        {
            $set:  req.body.item 
        }
    ).then(result => res.json(result))
})

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Running...`)
});



/* app.post('/api/empreend_update', (req, res) =>{
    Empreend.findByIdAndUpdate(req.body._id, req.body, (err, doc) )
}); */
