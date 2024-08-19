
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
        res.status(201).json({
            mensaje: 'El producto se creó correctamente',
        });
    } catch (error) {
        console.error(error);
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
        console.error(error);
        res.status(500).json({
            mensaje: 'Error al buscar productos'
        });
    }
}

export const borrarProducto = async (req, res) => {
  try {
      const deleteP = await Producto.findByIdAndDelete(req.params.id)
      res.status(200).json({
        mensaje: "Producto borrado"
      }) 
  } catch (error) {
    console.log(error)
  }
}
 
export const editarProducto = async (req, res) => {
   try {
    const editarProductos = await Producto.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).json({
    mensaje: "Producto actualizado"
})
   } catch (error) {
    console.log(error)
    res.status(400).json({
        mensaje: "error al editar producto"
    })
   }
 } 