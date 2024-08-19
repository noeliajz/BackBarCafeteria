import { validationResult } from 'express-validator';
import Usuario from '../models/usuario';

export const crearUsuario = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errores: errors.array()
            });
        }

        const nuevoUsuario = new Usuario(req.body);
        await nuevoUsuario.save();

        res.status(201).json({
            mensaje: 'Se creó un nuevo usuario'
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            mensaje: 'Error al crear usuario'
        });
    }
};

export const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find()
        res.status(200).json(usuarios)

    } catch (error) {
        console.log(error)
        res.status.json({
            mensaje: 'error al encontrar usuarios'
        })
    }
}

export const editarUsuario = async (req, res) => {
    try {
        const nuevoUsuario = await Usuario.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json(nuevoUsuario)
    } catch (error) {
        console.log(error)
        res.status(400).json({
            mensaje: 'error al actualizar el usuario'
        })
    }
}

export const eliminarUsuario = async (req, res) => {
   try {
    const eliminarUsuario = await Usuario.findByIdAndDelete(req.params.id)
    res.status(200).json({
        mensaje: 'se eliminó el usuario'
    })
   } catch (error) {
    console.log(error)
    res.status.json({
        mensaje: 'error al eliminar el usuario'
    })
   }
}
