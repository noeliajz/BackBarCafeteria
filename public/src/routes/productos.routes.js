import { Router } from "express";
import {
  borrarProducto,
  crearProducto,
  editarProducto,
  obtenerProductos,
} from "../controllers/productos.controllers";
import { check } from "express-validator";

const router = Router();
router
  .route("/productos")
  .post(
    [
      check("nombreProducto")
        .notEmpty()
        .withMessage("el nombre es obligatorio")
        .isLength({min:2, max: 100})
        .withMessage('debe tener como minimo 2 caracteres y maximo 100'),
        check("precio")
        .notEmpty()
        .withMessage("el precio es obligatorio")
        .isNumeric()
        .withMessage("el campo precio debe ser un numero")
        .custom((value)=> {
            if(value >= 1 && value <= 10000){
                return true
            }else{
                throw new Error('el precio debe tener tener el valor entre 1 y 10000 pesos')

            }
        }),
        check("imagen")
        .notEmpty()
        .withMessage("el campo imagen es obligatorio")
        .matches(/(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/)
        .withMessage("debe ser una url de imagen"),
        check("categoria")
        .notEmpty()
        .withMessage("el campo categoria es obligatorio")
        .isIn(['bebida', 'salado', 'dulce'])
        .withMessage("debe seleccionar una categoria")  ,
        check("desc")
        .isLength({min: 2, max: 25})
        .withMessage("debe tener como minimo 2 cacteres y maximo 25")  
     

    ],
    crearProducto
  )
  .get(obtenerProductos);
router.route("/productos/:id")
.delete(borrarProducto)
.put([
  check("nombreProducto")
        .notEmpty()
        .withMessage("el nombre es obligatorio")
        .isLength({min:2, max: 100})
        .withMessage('debe tener como minimo 2 caracteres y maximo 100'),
        check("precio")
        .notEmpty()
        .withMessage("el precio es obligatorio")
        .isNumeric()
        .withMessage("el campo precio debe ser un numero")
        .custom((value)=> {
            if(value >= 1 && value <= 10000){
                return true
            }else{
                throw new Error('el precio debe tener tener el valor entre 1 y 10000 pesos')

            }
        }),
        check("imagen")
        .notEmpty()
        .withMessage("el campo imagen es obligatorio")
        .matches(/(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/)
        .withMessage("debe ser una url de imagen"),
        check("categoria")
        .notEmpty()
        .withMessage("el campo categoria es obligatorio")
        .isIn(['bebida', 'salado', 'dulce'])
        .withMessage("debe seleccionar una categoria")  ,
        check("desc")
        .isLength({min: 2, max: 25})
        .withMessage("debe tener como minimo 2 cacteres y maximo 25")  
     
],
  editarProducto);

export default router;
