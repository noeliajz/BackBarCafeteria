import { Schema, model } from "mongoose";

const productoSchema = new Schema ({
    nombreProducto:{
     type: String,
     minLength: 2,
     maxLength: 20,
     required: true,
     unique: true
    },
    precio:{
     type: Number,
     min: 100,
     max: 100000,
     required: true,

    },
    imagen:{
     type: String,
     required: true
    },
    categoria:{
     type: String,
     required: true
    },
    desc:{
     type: String
    }
})

const Producto = model('producto', productoSchema)

export default Producto