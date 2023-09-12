const router = require('express').Router()

const Car = require('../models/Car')


router.post('/', async (req, res) => {

  // req.body
  const {name , year, color, price, ipva} = req.body

  if(!name) {
    res.status(422).json({error: 'o nome é obrigatorio!'})
    return
  }
  if(!year) {
    res.status(422).json({error: 'o ano é obrigatorio!'})
    return
  }
  if(!color) {
    res.status(422).json({error: 'a cor é obrigatorio!'})
    return
  }
  if(!ipva) {
    res.status(422).json({error: 'o ipva é obrigatorio!'})
    return
  }

  const car = {
    name,
    year,
    color,
    price,
    ipva
  }

  // metodo create
  try {
    // criando dados
    await Car.create(car)

    res.status(201).json({message: 'carro inserido no sistema com sucesso'})

  } catch (error) {
    res.status(500).json({error: error})
  }
})

router.get('/', async (req, res) => {
  try {
    const cars =  await Car.find()

    res.status(200).json(cars)

  } catch (error) {
    res.status(500).json({ error: error })
  }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id

  try {
    const cars =  await Car.findOne({_id: id})

    if (!cars) {
      res.status(422).json({ message: 'Esse carro não foi encontrado' })
      return
    }

    res.status(200).json(cars)
    
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

router.patch('/:id', async (req, res) => {
  const id = req.params.id

  const {name , year, color, price, ipva} = req.body

  const car = {
    name,
    year,
    color,
    price,
    ipva,
  }

  try {
    const updatedCar = await Car.updateOne({_id: id}, car)

    if (updatedCar.matchedCount === 0) {
      res.status(422).json({ message: 'O carro não foi encontrado'})
      return
    }

    res.status(200).json(car)
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

router.delete('/:id', async (req, res) => {
  const id = req.params.id

  const cars =  await Car.findOne({_id: id})

  if (!cars) {
    res.status(422).json({ message: 'Esse carro não foi encontrado' })
    return
  }

try {
  
  await Car.deleteOne({_id: id})

  res.status(200).json({message: 'Carro removido com sucesso'})
  
} catch (error) {
  res.status(500).json({ error: error })
}
})



module.exports = router
