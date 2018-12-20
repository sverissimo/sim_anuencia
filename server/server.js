const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var MongoClient = require('mongodb').MongoClient;
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
const { filesModel } = require('./models/filesModel');

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
mongoose.connect('mongodb://localhost:27017/sim_anuencia_db', (err) => {
    if (err) {
        console.log(err);
    }
});


app.use(methodOverride('_method'));

const mongoURI = 'mongodb://localhost:27017/sim_anuencia_db';

const conn = mongoose.createConnection(mongoURI);

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
                const filename = buf.toString('hex') + '.' + file.originalname.split('.').pop();
                const fileInfo = {
                    filename: filename,
                    metadata: {
                        'fieldName': file.fieldname,
                        'originalName': file.originalname,
                        'processId': req.body.processId
                    },
                    bucketName: 'uploads',
                };
                resolve(fileInfo);
            });
        });
    }
});
const upload = multer({ storage });


app.get('/api/downloadSolDir/:id', function (req, res) {

    const fileId = new mongoose.mongo.ObjectId(req.params.id)
    gfs.files.findOne({ _id: fileId }, function (err, file) {

        if (!file) {
            return res.status(404).json({
                responseCode: 1,
                responseMessage: "error"
            });
        } else {
            //return res.json(file)
            const readstream = gfs.createReadStream({
                filename: file.filename,
                root: "uploads"
            });
            // set the proper content type 
            res.set({
                'Content-Type': file.contentType,
                'Content-Disposition': `attachment; filename=${file.metadata.originalName}`,
                'fileId': file._id,
                'uploadDate': file.uploadDate
            });

            // Return response
            return readstream.pipe(res);
        }
    });
});

app.post('/api/solDirUpload', upload.fields([

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


app.post('/api/diretrizUpload', upload.fields([

    {
        name: "diretrizFile", maxCount: 1
    }]
),
    (req, res) => {
        res.json({
            file: req.files,
        });
    });

app.post('/api/solAnuenciaUpload', upload.fields([

    {
        name: "regImovel", maxCount: 1
    }, {
        name: "CNDMun", maxCount: 1
    }, {
        name: "empRG", maxCount: 1
    }, {
        name: "art", maxCount: 1
    }, {
        name: "decConform", maxCount: 1
    }, {
        name: "daeAnuencia", maxCount: 1
    }, {
        name: "memDescritivo", maxCount: 1
    }, {
        name: "memDescTp", maxCount: 1
    }, {
        name: "cemig", maxCount: 1
    }, {
        name: "dtbCopasa", maxCount: 1
    }, {
        name: "licAmbental", maxCount: 1
    }, {
        name: "levPlan", maxCount: 1
    }, {
        name: "projUrb", maxCount: 1
    }, {
        name: "mapaIso", maxCount: 1
    }, {
        name: "projTer", maxCount: 1
    }, {
        name: "projDren", maxCount: 1
    }
]),
    (req, res) => {

        res.json({
            file: req.files,
        });
    });



app.get('/api/files', (req, res) => {


    filesModel.find().sort({uploadDate: -1}).exec((err, doc) => {
        if (err) throw err;
        res.send(doc)

    });

})


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
            process: doc
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

/* app.put('/api/solDirFiles/', (req, res) => {

    processModel.updateOne(
        { '_id': req.body.itemId },
        {
            $push: { solDirFiles: req.body.filesArray },
            $set: { status: req.body.status }
        },

    ).then(result => res.json(result))
}) */

app.put('/api/dirPendencias/', (req, res) => {

    processModel.updateOne(
        { '_id': req.body.id },
        { $push: { "dirPendencias": req.body.dirPendencias } },


    ).then(result => res.json(result))
})

app.put('/api/fileObject/', (req, res) => {

    processModel.updateOne(
        { '_id': req.body.itemId },
        {
            $push: { fileObjects: req.body.filesArray },
            $set: { status: req.body.status }
        },

    ).then(result => res.json(result))
})

app.post('/api/sendHtml', (req, res) => {
    console.log(req.body.data)
    res.json(req.body.data)
    
})

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Running...`)
});
