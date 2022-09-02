const router = require('express').Router()
const User = require('../models/User')
const Redis = require("ioredis")

const redis = new Redis ()

// Criação de usuário
router.post('/', (req, res) => {
    const {cpf, name, age, email} = req.body

    if(!name && !cpf && !age && !email) {
        res.status(422).json({error: 'Por favor preencher todos os campos!'})
    }

    redis.set('myKey', req.body.name)

    const user = {
        cpf,
        name,
        age,
        email
    }

    try {
        User.create(user)
        res.status(201).json({message: 'Usuário inserido com sucesso!'})

    } catch (error) {
        res.status(500).json({error: error})
    }
})

// Leitura dos dados
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)

    } catch (error) {
        res.status(500).json({ error: error })
    }
})

// Leitura usuário por ID
router.get('/:id', async (req, res) => {
    const id = req.params.id

    try {
        const user = await User.findOne({_id: id})

        if(!user){
            res.status(422).json({ message: 'O usuário não foi encontrado'})
            return
        }
        res.status(200).json(user)

    } catch (error) {
        res.status(500).json({ error: error })
    }
}) 

// Leitura usuário por CPF
router.get('/cpf/:cpf', async (req, res) => {
    const cpf = req.params.cpf

    try {
        const user = await User.findOne({cpf: cpf})

        if(!user){
            res.status(422).json({ message: 'O usuário não foi encontrado'})
            return
        }
        res.status(200).json(user)

    } catch (error) {
        res.status(500).json({ error: error })
    }
}) 

// Atualização de dados 
router.patch('/:id', async (req, res) => {
    const id = req.params.id
    const {cpf, name, age, email} = req.body

    const user = {
        cpf,
        name,
        age,
        email
    }

    try {
        const updatedUser = await User.updateOne({_id: id}, user)

        if(updatedUser.matchedCount === 0) {
            res.status(422).json({ message: 'O usuário não foi encontrado!'})
        }
        res.status(200).json(user)

    } catch(error){
        res.status(500).json({ error: error })
    }
})

// Deletar dados
router.delete('/:id', async (req, res) => {
    const id = req.params.id

    const user = await User.findOne({_id: id})

    if(!user){
        res.status(422).json({ message: 'O usuário não foi encontrado'})
        return
    }
    try {
        await User.deleteOne({_id: id})

        res.status(200).json({ message: 'Usuário removido com sucesso!'})

    } catch(error) {
        res.status(500).json({ error: error })
    }

})

redis.get("mykey").then((result) => {
    console.log(result);
  });


module.exports = router