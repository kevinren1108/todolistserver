require('dotenv').config()
const { request, response } = require('express')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
app.use(express.json())
app.use(cors())
const Note = require('./models/db.js')

app.get('/', (req, res) => {
  res.send(
    `
      <h1>A todolist backend server build with express.js</h1>
      <p>Aviliable APIs</p>
      <a href='/api/notes'>Get all list</a>
      </br>
      <a href='/info'>Get api info</a>
    `
  )
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})


app.get('/info', (request, response) => {
  const noteCount = Note.length
  response.send(
    `
      <p>Note has info for ${noteCount} notes</p> 
      <p>${new Date()}</p>
    `
  );
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)
  response.status(204).end()
})

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (body.content === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  })
})

app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id).then(note => {
    response.json(note)
  })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
