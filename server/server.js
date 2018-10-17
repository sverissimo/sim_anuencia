const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const crypto = require('crypto')
const config = require('./config/config').get(process.env.NODE_ENV);
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
const path = require('path');
const methodOverride = require('method-override')
//const gfs = Grid(conn.db);


const { empreendedor } = require('./models/empModel');
const { CadastroRt } = require('./models/rtModel');
const { processModel } = require('./models/processModel');

const app = express();


app.use(function (req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});


app.use(bodyParser.json());
app.use(cookieParser());
mongoose.connect('mongodb://localhost:27017/sim_anuencia_db', { useNewUrlParser: true }, (err) => {
    if (err) {
        console.log(err);
    }
});


app.use(methodOverride('_method'));

// Mongo URI
const mongoURI = 'mongodb://localhost:27017/sim_anuencia_db';

// Create mongo connection
const conn = mongoose.createConnection(mongoURI, { useNewUrlParser: true });

let gfs;

conn.once('open', () => {
    // Init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
    url: mongoURI,

    file: (req, file) => {

        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads',
                };
                resolve(fileInfo);
            });
        });
    }
});
const upload = multer({ storage });

// @desc  Uploads file to DB
app.post('/api/upload', upload.fields([

    {
        name: "dirMunFile", maxCount: 1
    }, {
        name: "levPlanFile", maxCount: 1
    }, {
        name: "dirDaeFile", maxCount: 1
    }]
        ),
    (req, res) => {

        res.json({
            file: req.files,
        });
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

    processModel.find().sort({ nomeEmpreendimento: 1 }).exec((err, doc) => {
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

    empreendedor.updateOne(
        { '_id': req.body.item._id },
        { $set: req.body.item }
    ).then(result => res.json(result))
})

app.put('/api/editRt/', (req, res) => {

    CadastroRt.updateOne(
        { '_id': req.body.item._id },
        { $set: req.body.item }
    ).then(result => res.json(result))
})

app.put('/api/editProcess/', (req, res) => {

    processModel.updateOne(
        { '_id': req.body.item._id },
        { $set: req.body.item }
    ).then(result => res.json(result))
})

app.put('/api/solDirFiles/', (req, res) => {

    processModel.updateOne(
        { '_id': req.body.itemId },
        {
            $push: { solDirFileIds: req.body.filesArray },
            $set: { status: req.body.status }
        },

    ).then(result => res.json(result))
})

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Running...`)
});
