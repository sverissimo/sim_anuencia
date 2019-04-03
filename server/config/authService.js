const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user')
const { CadastroRt } = require('../models/rtModel')

const emailRegex = /\S+@\S+\.\S+/
//const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/

const signup = (req, res, next) => {

    const { name, surName, email, password, confirmPassword, municipio } = req.body || ''
    const verified = false

    if (!email.match(emailRegex)) {
        return res.send('E-mail inválido.')
    }
    /*   if (!password.match(passwordRegex)) {
          return res.status(400).send({
              errors: [
                  "Senha precisar ter: uma letra maiúscula, uma letra minúscula, um número, uma caractere especial(@#$ %) e tamanho entre 6 - 20."
              ]
          })
      } */
    const salt = bcrypt.genSaltSync()
    const passwordHash = bcrypt.hashSync(password, salt)
    if (!bcrypt.compareSync(confirmPassword, passwordHash)) {
        return res.send('Senhas não conferem.')
    }

    User.findOne({ email }, async (err, user) => {
        if (err) {
            return err
        } else if (user) {
            return res.send('Usuário já cadastrado.')
        } else {
            const defRole = new Promise((resolve, reject) => {
                CadastroRt.findOne({ 'emailRt': email })
                    .then(res => {
                        if (res) resolve('rt')
                        resolve('empreend')
                    })
                    .catch(e => reject(e))
            })
            defRole.then(role => {
                const newUser = new User({ name, surName, email, municipio, password: passwordHash, role, verified })
                newUser.save((err, user) => {
                    if (err) {
                        return err
                    } else {
                        return res.send(user)
                    }
                })
            })

        }
    })
}

const login = async (req, res, next) => {
    const email = req.body.email || ''
    const password = req.body.password || ''

    User.findOne({ email }, (err, user) => {
        if (err) {
            return res.status(400).send(err)
        } else if (user && bcrypt.compareSync(password, user.password)) {
            user = { _id: user._id, name: user.name, surName: user.surName, email: user.email, municipio: user.municipio, role: user.role, verified: user.verified }

            if (user.verified) {
                const token = jwt.sign(user, process.env.AUTHSECRET, {
                    expiresIn: 60 * 60 * 4
                })
                res.cookie('_sim-ad', token, { maxAge: 1000 * 60 * 60 * 4 }).send(user)
            } else {
                res.send('Aguardando verificação do usuário.')
            }

        } else {
            return res.status(400).send('Usuário/Senha inválidos')
        }
    })
}

module.exports = { signup, login }