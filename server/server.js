const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const crypto = require('crypto')
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
const path = require('path');
const methodOverride = require('method-override')
const nodemailer = require('nodemailer')
require('dotenv').config()

const { User } = require('./models/user');
const { auth } = require('./config/auth');
const { signup, login } = require('./config/authService');

const { empreendedor } = require('./models/empModel');
const { CadastroRt } = require('./models/rtModel');
const { processModel } = require('./models/processModel');
const { filesModel } = require('./models/filesModel');
const { tecModel } = require('./models/tecnicos');

const app = express()

app.use(function (req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Credentials", true);
    next();
})

app.use(bodyParser.json());
app.use(cookieParser());

const mongoURI = (process.env.MONGODB_URI || 'mongodb://localhost:27017/sim_anuencia_db');
mongoose.connect(mongoURI, { useNewUrlParser: true }, (err) => {
    if (err) {
        console.log(err);
    }
});

app.use(express.static('client/build'))

app.use(methodOverride('_method'))

app.post('/api/login', login)
app.post('/api/signup', signup)

const conn = mongoose.connection

let gfs;

conn.once('open', () => {
    // Init stream
    gfs = Grid(conn.db);
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


app.use(auth)

app.get('/api/download/:id', function (req, res) {

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
                'Content-Disposition': 'attachment',
            });

            // Return response
            return readstream.pipe(res)
        }
    });
});

app.post('/api/mail', (req, res) => {
    const { to, subject, html } = req.body
    let answer

    const transporter = nodemailer.createTransport({
        host: process.env.MAILHOST,
        port: 465,
        secureConnection: true, // use SSL        
        auth: {
            user: process.env.MAILUSER,
            pass: process.env.MAILPASS
        },
    })

    const mailOptions = {
        from: 'anuencia.digital@agenciarmbh.mg.gov.br',
        to: to,
        subject: subject,
        html: html
    }

    transporter.sendMail(mailOptions, function (err, res) {
        if (err) {
            console.log(err);
        } else {
            answer = res.status
        }
    })
    res.json(answer)
})

app.post('/api/solDirUpload', upload.fields([

    {
        name: "dirMunFile", maxCount: 1
    }, {
        name: "kml", maxCount: 1
    }, {
        name: "levPlanFile", maxCount: 1
    }, {
        name: "dirDaeFile", maxCount: 1
    }]
), (req, res) => {

    res.json({
        file: req.files,
    });
});


app.post('/api/diretrizUpload', upload.fields([

    {
        name: "diretrizFile", maxCount: 1
    }]
), (req, res) => {
    res.json({
        file: req.files,
    });
});

app.post('/api/anuenciaUpload', upload.fields([

    {
        name: "notaTecnica", maxCount: 1
    },
    {
        name: "anuenciaFile", maxCount: 1
    }]
), (req, res) => {
    res.json({
        file: req.files,
    });
});

app.post('/api/solAnuenciaUpload', upload.fields([

    {
        name: "regImovel", maxCount: 1
    }, {
        name: "CNDOnus", maxCount: 1
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
    }, {
        name: "projDesmemb", maxCount: 1
    }
]),
    (req, res) => {
        res.json({
            file: req.files,
        });
    });



app.get('/api/files', (req, res) => {

    filesModel.find().sort({ uploadDate: -1 }).exec((err, doc) => {
        if (err) throw err;
        res.send(doc)
    });
})


app.get('/api/showEmpreend', (req, res) => {

    let user = req.decoded

    if (user.role === 'prefeitura') {
        let emps = []

        processModel.find({ 'munEmpreendimento': user.municipio }, (err, processes) => {
            if (err) throw err
            processes.forEach(async proc => {
                await empreendedor.findOne({ '_id': proc.empId }, (erro, doc) => {
                    if (erro) console.log(erro)
                    emps.push(doc)
                })
                res.status(200).send(emps)
            })
        }).catch(err => {
            console.log(err)
        })

    } else if (user.role === 'empreend') {
        empreendedor.find({ 'email': user.email }, (err, doc) => {
            if (err) console.log(err)
            res.send(doc)
        })

    } else {
        empreendedor.find().sort({ nome: 1 }).exec((err, doc) => {
            if (err) return err
            res.send(doc)
        })
    }
})

app.get('/api/showRt', (req, res) => {

    let user = req.decoded

    if (user.role === 'prefeitura') {
        let rts = []

        processModel.find({ 'munEmpreendimento': user.municipio }, (err, processes) => {
            if (err) throw err
            processes.forEach(async proc => {
                await CadastroRt.findOne({ '_id': proc.rtId }, (erro, doc) => {
                    if (erro) console.log(erro)
                    rts.push(doc)
                })
                res.status(200).send(rts)
            })
        }).catch(err => {
            console.log(err)
        })
    } else if (user.role !== 'empreend') {
        CadastroRt.find().sort({ nomeRt: 1 }).exec((err, doc) => {
            if (err) return err;
            res.send(doc);
        })
    } else if (user.role === 'empreend') {
        const getEmpId = (usuario) => {
            return new Promise((resolve, reject) => {
                empreendedor.findOne({ 'email': usuario.email })
                    .then(res => resolve(res._id))
                    .catch(e => reject(e))
            })
        }

        getProcesses = (userId) => {
            return new Promise((resolve, reject) => {
                processModel.find({ 'empId': userId })
                    .then(res => resolve(res))
                    .catch(e => reject(e))
            })
        }
        getRts = (processes) => {
            let rtIds = []
            processes.forEach(p => {
                rtIds.push(p.rtId)
            })               
            CadastroRt.find({_id: {$in: rtIds}}).exec((err, doc)=>{
                if (err) console.log(err)
                console.log(doc)
                res.status(200).send(doc)
            })

        }

        getEmpId(user)
            .then(response => getProcesses(response))
            .then(response => getRts(response)            
            

            )
        //  .then(response3 => console.log('fuck', response3))
    }


});

app.get('/api/showProcess', async (req, res) => {

    let user = req.decoded
    if (user.role === 'prefeitura') {
        processModel
            .find({ 'munEmpreendimento': user.municipio })
            .sort({ nomeEmpreendimento: 1 })
            .exec((err, collection) => {
                if (err) return err
                res.send(collection)
            })
    }

    else if (user.role === 'empreend') {

        empreendedor.findOne({ 'email': user.email }).exec((err, doc) => {
            if (err) return err
            if (doc) {
                processModel
                    .find({ 'empId': doc._id })
                    .sort({ nomeEmpreendimento: 1 })
                    .exec((err, collection) => {
                        if (err) return err
                        res.send(collection)
                    })
            } else res.send([])
        })

    } else {
        processModel
            .find()
            .sort({ nomeEmpreendimento: 1 })
            .exec((err, collection) => {
                if (err) return err
                res.send(collection)
            })
    }


});

app.get('/api/tecnicos', (req, res) => {

    tecModel.find().exec((err, doc) => {
        if (err) return err;
        res.send(doc)
    })
})

app.get('/api/users', (req, res) => {
    if (req.decoded.role === 'admin') {
        let filteredDocs = []
        User.find().exec((err, docs) => {
            if (err) return err;
            docs.forEach(doc => {
                let { _id, name, surName, email, municipio, role, verified } = doc
                filteredDocs.push({ _id, name, surName, email, municipio, role, verified })
            })

            res.send(filteredDocs)
        })
    } else res.status(403).send('Este usuário não possui permissões para esta solicitação')
})

app.post('/api/cadastro_emp', (req, res) => {

    if (req.decoded.role === 'admin' || req.decoded.role === 'prefeitura') {
        const cadastroEmp = new empreendedor(req.body);
        cadastroEmp.save((err, doc) => {
            if (err) return res.status(400).send(err);

            return res.status(200).json({
                post: true,
                Cadastro_id: doc._id
            })
        })
    } else res.status(403).send('Este usuário não possui permissões para esta solicitação')
});

app.post('/api/cadastro_rt', (req, res) => {

    if (req.decoded.role === 'admin' || req.decoded.role === 'prefeitura') {
        const RT = new CadastroRt(req.body);
        RT.save((err, doc) => {
            if (err) return res.status(400).send(err);
            return res.status(200).json({
                post: true,
                RT_id: doc._id
            })
        });
    } else res.status(403).send('Este usuário não possui permissões para esta solicitação')
});

app.post('/api/cadastro_process', (req, res) => {

    if (req.decoded.role === 'admin' || req.decoded.role === 'prefeitura') {
        const cadastroProcess = new processModel(req.body);
        cadastroProcess.save((err, doc) => {
            if (err) return res.status(400).send(err);
            return res.status(200).json({
                post: true,
                process: doc
            })
        });
    } else res.status(403).send('Este usuário não possui permissões para esta solicitação')
});

app.delete('/api/delete/:item', (req, res) => {
    const el = req.query.el
    let collection
    if (el === 'emp') collection = empreendedor
    if (el === 'rt') collection = CadastroRt
    if (el === 'process') collection = processModel
    if (el === 'user') collection = User

    if (req.decoded.role === 'admin') {
        collection.deleteOne({ '_id': req.query.id })
            .exec()
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => res.status(400).send(err))
    } else res.status(403).send('Este usuário não possui permissões para esta solicitação')

})

app.put('/api/edit', (req, res) => {
    const el = req.body.el
    let items = req.body.item
    if (!items[0]) items = [req.body.item]

    let collection
    if (el === 'emp') collection = empreendedor
    if (el === 'rt') collection = CadastroRt
    if (el === 'user') collection = User

    if (req.decoded.role === 'admin') {
        items.forEach(user => {
            collection.find({ '_id': user._id }).updateOne(
                { $set: user }
            )
                .then(response => res.send(response))
        })
    } else {
        res.status(403).send('Este usuário não possui permissões para esta solicitação')
    }
})

app.put('/api/editProcess/', (req, res) => {

    if (req.decoded.role !== 'empreend') {
        if (req.body.processHistory) {
            processModel.updateOne(
                { '_id': req.body.item._id },
                {
                    $push: { 'processHistory': req.body.processHistory },
                    $set: req.body.item
                }).then(result => res.json(result))
        } else {
            processModel.updateOne(
                { '_id': req.body.item._id },
                { $set: req.body.item })
                .then(result => res.json(result))
        }
    } else {
        res.status(403).send('Este usuário não possui permissões para esta solicitação')
    }
})

if (process.env.NODE_ENV === 'production') {
    app.get('/*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'))
    })
}

const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log('Running...')
})
