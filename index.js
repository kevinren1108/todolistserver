const { request, response } = require('express')
const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true
  }
]

app.get('/', (req, res) => {
  res.send(
    `
      <h1>A todolist backend server build with express.js</h1>
      <p>Aviliable APIs</p>
      <a href='https://todolistserver1.herokuapp.com/api/notes'>Get all list</a>
      </br>
      <a href='https://todolistserver1.herokuapp.com/api/notes/1'>Get todo item with id</a>
      </br>
      <a href='https://todolistserver1.herokuapp.com/info'>Get api info</a>
    `
  )
})

app.get('/api/notes', (req, res) => {
  res.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)
  if(note){
    response.json(note);
  }else{
    response.status(404).send('Note not existing');
  }
})

app.get('/info', (request, response) => {
  const noteCount = notes.length
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

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))// === Math.max(...[1,2,3,4])
    : 0
  return maxId + 1
}

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId(),
  }

  notes = notes.concat(note)
  response.json(note)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
