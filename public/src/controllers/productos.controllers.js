import Producto from '../models/producto';
import { validationResult } from 'express-validator';

export const crearProducto = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errores: errors.array()
            });
        }

        const productoNuevo = new Producto(req.body);
        await productoNuevo.save();
        console.log(productoNuevo)
        res.status(201).json({
            mensaje: 'El producto se creó correctamente',
            producto: productoNuevo
        });
    } catch (error) {
        console.error('Error al crear producto:', error);
        res.status(500).json({
            mensaje: 'Error al crear producto'
        });
    }
}

export const obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.find();
        res.status(200).json(productos);
    } catch (error) {
        console.error('Error al buscar productos:', error);
        res.status(500).json({
            mensaje: 'Error al buscar productos'
        });
    }
}

export const borrarProducto = async (req, res) => {
    try {
        const deleteP = await Producto.findByIdAndDelete(req.params.id);
        if (!deleteP) {
            return res.status(404).json({
                mensaje: 'Producto no encontrado'
            });
        }
        res.status(200).json({
            mensaje: "Producto borrado"
        });
    } catch (error) {
        console.error('Error al borrar producto:', error);
        res.status(500).json({
            mensaje: 'Error al borrar producto'
        });
    }
}

export const editarProducto = async (req, res) => {
    try {
        const editarProductos = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!editarProductos) {
            return res.status(404).json({
                mensaje: 'Producto no encontrado'
            });
        }
        res.status(200).json({
            mensaje: "Producto actualizado",
            producto: editarProductos
        });
    } catch (error) {
        console.error('Error al editar producto:', error);
        res.status(400).json({
            mensaje: "Error al editar producto"
        });
    }
}
