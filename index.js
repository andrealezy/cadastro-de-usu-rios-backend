import express  from 'express'
import mongoose from 'mongoose';

import cors from 'cors';



const app = express();

app.use(cors({})); 

app.use(express.json());


mongoose.connect('mongodb+srv://contatrabalho769_db_user:d7c2zFTIA9KGRonp@cluster0.mjpkd4x.mongodb.net/Usuarios?appName=Cluster0').then(() => {
  console.log('Conectado com sucesso ao bando de dados')
}).catch((error) => {console.log('Error ao se conectar no Mongo DB', error)})


// avisando o formato dos dados a serem enviados

const usuarioSchema = new mongoose.Schema({
  nome: {type: String, require: true},
  email: {type: String, require: true, unique: true},
  idade: {type: Number, require: true}
},{timestamps: true}) 

const Usuario = mongoose.model('Usuario', usuarioSchema)


app.get('/usuarios', async (req, res) => {
  const usuarios = await Usuario.find()
  res.json(usuarios)
});

app.post('/usuarios', async (req, res) => {

  const usuarioCriado = await Usuario.create(req.body)

  res.status(201).json(usuarioCriado)
})

//frontend manda requisições para o backend
const PORT = 3020;

app.listen(PORT, function () {
  console.log(` Servidor rodando no http://localhost:${PORT}`)
})