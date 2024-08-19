import { Router } from "express";
import { crearUsuario, editarUsuario, eliminarUsuario, obtenerUsuarios } from '../controllers/usuario.controllers';
import { check } from "express-validator";


const router = Router();
router
  .route("/usuarios")
  .post( 
    [
    check("nombre")
        .notEmpty()
        .withMessage('El nombre es obligatorio')
        .isLength({ min: 3, max: 25 })
        .withMessage('El nombre debe tener entre 3 y 25 caracteres'),
    check("apellido")
        .notEmpty()
        .withMessage('El apellido es obligatorio')
        .isLength({ min: 3, max: 25 })
        .withMessage('El apellido debe tener entre 3 y 25 caracteres'),
    check("rol")
        .notEmpty()
        .withMessage('El rol es obligatorio')
        .isIn(['admin', 'cajero', 'mozo'])
        .withMessage('Debe seleccionar un rol')
    ], crearUsuario)
    .get(obtenerUsuarios)
    router
    .route("/usuarios/:id")
    .put([
        check("nombre")
        .notEmpty()
        .withMessage('El nombre es obligatorio')
        .isLength({ min: 3, max: 25 })
        .withMessage('El nombre debe tener entre 3 y 25 caracteres'),
    check("apellido")
        .notEmpty()
        .withMessage('El apellido es obligatorio')
        .isLength({ min: 3, max: 25 })
        .withMessage('El apellido debe tener entre 3 y 25 caracteres'),
    check("rol")
        .notEmpty()
        .withMessage('El rol es obligatorio')
        .isIn(['admin', 'cajero', 'mozo'])
        .withMessage('Debe seleccionar un rol')
    ],
        editarUsuario)
    .delete(eliminarUsuario)
export default router;
