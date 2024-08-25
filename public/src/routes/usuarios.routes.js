import { Router } from "express";
import { crearUsuario, editarUsuario, eliminarUsuario, obtenerUsuarios, loginUser, logoutUser } from '../controllers/usuario.controllers';
import { check } from "express-validator";


const router = Router();
router
  .route("/usuarios")
  .post( 
    [
    check("usuario")
        .notEmpty()
        .withMessage('El usuario es obligatorio')
        .isLength({ min: 3, max: 25 })
        .withMessage('El usuario debe tener entre 3 y 25 caracteres'),
    check("nombreCompleto")
        .notEmpty()
        .withMessage('El nombre completo es obligatorio')
        .isLength({ min: 3, max: 25 })
        .withMessage('El nombre completo debe tener entre 3 y 25 caracteres'),
        check("pass")
        .notEmpty()
        .withMessage('La contraseña es obligatoria')
        .isLength({ min: 3, max: 72 })
        .withMessage('La contraseña debe tener entre 3 y 72 caracteres'),
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
        check("usuario")
        .notEmpty()
        .withMessage('El usuario es obligatorio')
        .isLength({ min: 3, max: 25 })
        .withMessage('El usuario debe tener entre 3 y 25 caracteres'),
         check("nombreCompleto")
        .notEmpty()
        .withMessage('El nombre completo es obligatorio')
        .isLength({ min: 3, max: 25 })
        .withMessage('El nombre completo debe tener entre 3 y 25 caracteres'),
        check("pass")
        .notEmpty()
        .withMessage('La contraseña es obligatoria')
        .isLength({ min: 3, max: 72 })
        .withMessage('La contraseña debe tener entre 3 y 72 caracteres'),
        check("rol")
        .notEmpty()
        .withMessage('El rol es obligatorio')
        .isIn(['admin', 'cajero', 'mozo'])
        .withMessage('Debe seleccionar un rol')
    ],
        editarUsuario)

    .delete(eliminarUsuario)
    
    router.post('/login', [
        check('usuario', 'El campo USUARIO de usuario esta vacío').notEmpty(),
       check('usuario', 'El mínimo es de 3 caracteres y maximo 25 caracteres').isLength({ min:3 , max: 25}),
       check('pass', 'El campo contraseña esta vacío').notEmpty(), 
       check('pass', 'El mínimo es de 3 caracteres y máximo 72').isLength({ min:3 , max: 72})
   ], loginUser)
   router.put('/logout',  /* auth('user'), */  logoutUser)

export default router;
