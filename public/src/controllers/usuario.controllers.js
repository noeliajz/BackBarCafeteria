import { validationResult } from 'express-validator';
import Usuario from '../models/usuario';
import bcrypt from 'bcrypt'

export const crearUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findOne({usuario: req.body.usuario})
        if(usuario){
           return  res.status(400).json({mensaje: 'ya existe el usuario enviado'})
        }
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errores: errors.array()
            });
        }

        const nuevoUsuario = new Usuario(req.body);
        const salt = bcrypt.genSaltSync(10)
        nuevoUsuario.pass = bcrypt.hashSync(req.body.pass, salt)
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

export const loginUser = async (req, res) => {
    try {
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       res.status(400).json({ msg: errors.array() });
     }
 
     const { usuario, pass } = req.body;
     
     const userExist = await UserModel.findOne({ usuario });
     console.log(userExist)
     if (!userExist) {
       return res.status(400).json({ msg: "El usuario no existe" });
     }
     const passCheck = await bcrypt.compare(pass, userExist.pass);
 
     if (passCheck) {
       const jwtPayload = {
         usuario: {
           id: userExist._id,
           username: userExist.usuario,
         },
       };
       const token = jwt.sign(jwtPayload, process.env.SECRET_key);
       userExist.token = token;
         userExist.save()
        res.status(200).json({ msg: "Usuario logueado" , userExist});
       
       

       } else {
       res.status(422).json({ msg: "Usuario y/o contraseña incorrecto" });
     }
   } catch (error) {
     console.log(error);
   } 
     
     
   }; 
 
 
   export const logoutUser = async (req, res) => {
      const userId = await UserModel.findOne({ _id: req.body.userLoginId });
     console.log(userId);
     userId.token = "";
     const userLogout = await UserModel.findByIdAndUpdate(
       { _id: req.body.userLoginId },
       userId,
       { new: true } 
      );
 
     console.log(userLogout);
     res.status(200).json({ msg: "Usuario deslogueado" }); 
   };
