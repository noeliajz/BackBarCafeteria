 import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import path from 'path'
import './public/src/database/dbConenection'
import productosRouter from './public/src/routes/productos.routes'
import usuariosRouter from './public/src/routes/usuarios.routes'

const app = express()
app.set('port', process.env.PORT || 3500)
app.listen(app.get('port'), () => {
    console.log('Estoy en el puerto'+app.get('port'))
})

//middlewares

app.use(cors()); 
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, '/public')))

app.use('/apiCafe', productosRouter);
app.use('/apiCafe', usuariosRouter)

