import { Schema, model } from "mongoose";

const UsuarioSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 25,
  },
  apellido: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 25,
  },
  rol: {
    type: String,
    required: true,
  },
});

const Usuario = model('usuario', UsuarioSchema)
export default Usuario