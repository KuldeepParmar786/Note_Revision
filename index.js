const express=require('express')
const app=express()
const cors=require('cors')
let notes= [
    {
    id: 1,
    content: "HTML is easy",
    important: false
  },
  {
    id:2,
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: false
  }
]
app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.get('/api/notes',(request,response)=>{
    response.json(notes)
})


app.get('/api/notes/:id',(request,response)=>{
  const id=Number(request.params.id)
  const note=notes.find(not=>not.id === id)
  if(note) response.json(note)
  else response.status(404).end()
})
app.delete('/api/notes/:id',(request,response)=>{
   const id=Number(request.params.id)
   notes=notes.filter(note=>note.id!==id)
   response.status(204).end()
})
const generateId=()=>{
  const maxID=notes.length>0
  ? Math.max(...notes.map(note=>Number(note.id)))
  : 0
  return String(maxID+1)
}
app.post('/api/notes/',(request,response)=>{
    const body=request.body
    const content=body.content
    if(!content){
      return response.status(400).json({error:'content missing'})
    }
    const note={
      content:body.content,
      important:body.important||false,
      id:generateId()
    }
    
    notes=notes.concat(note)
    response.json(note)
})
const PORT=process.env.PORT || 3002
app.listen(PORT,()=>{
    console.log(`Server succesfully started a PORT ${PORT}`)
})
