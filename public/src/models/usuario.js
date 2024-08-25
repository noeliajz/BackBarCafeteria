import { Schema, model } from "mongoose";

const UsuarioSchema = new Schema({
  usuario: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 25,
    unique: true
  },
  nombreCompleto: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 25,
  },
  pass: {
    type: String,
    minlength: 3,
    maxlength: 72,
    require: true
 },
  rol: {
    type: String,
    required: true,
  },
});

const Usuario = model('usuario', UsuarioSchema)
export default Usuario