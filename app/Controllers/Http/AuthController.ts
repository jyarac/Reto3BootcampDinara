import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
export default class AuthController {

    public async register({request, auth}:HttpContextContract){
        const id = request.input("id");
        const email = request.input("email");
        const password = request.input("password");
        const nombres = request.input("nombres");
        const apellidos = request.input("apellidos");
        const direccion = request.input("direccion");
        const barrio = request.input("barrio");
        const municipio= request.input("municipio");
        const departamento = request.input("departamento");
        const perfil_id = request.input("perfil_id");
        const user = new User();
        user.id = id;
        user.nombres =nombres,
        user.email = email;
        user.password = password,
        user.apellidos = apellidos;
        user.direccion = direccion;
        user.barrio = barrio;
        user.departamento = departamento;
        user.perfil_id = perfil_id;
        user.municipio =municipio;
        const usuarioExistente: Number = await this.getValidarUserExistente(id);
        if(usuarioExistente == 0 ){
 
            await user.save();
            const token =await auth.use("api").login(user,{
                expiresIn: "30 mins"
            });
            return{
                token,
                "msg": "usuario registrado"
            }
        } else{
            return{
                "msg": "Error, usuario existente"
            }
        }

    
    }
    public async login({auth, request, response}:HttpContextContract){
        const email = request.input("email");
        const password = request.input("password");
        try{
            const token = await auth.use("api").attempt(email,password,{
                expiresIn: "60 mins"
            });
            return{
                token,
                "msg":"usuario logueado correctamente"
            }
        }catch(error){
                return response.unauthorized("Credenciales invalidas")
        }
    }
 async getValidarUserExistente(codigo_usuario: Number): Promise<Number>{
        const total = await User.query().where({'id':codigo_usuario}).count('*').from('users');
        console.log(total[0]);
        return parseInt(total[0]['count'])
    }
}
