import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/user'

export default class UsersController {
    public async getListarUsuarios(): Promise<User[]> {
        const user = await User.all();
        return user
    }
    public async buscarPorId({ request }: HttpContextContract){
    const id = request.param("id");
    const user = await User.find(id);
    return user
    }

    public async actualizarUsuario({ request }: HttpContextContract){
        const id = request.param("id");
        const user = request.all();
        await User.query().where('id', id).update({
            email : user.email,
            password : user.password,
            nombres : user.nombres,
            apellidos: user.apellidos,
            direccion: user.direccion,
            barrio: user.barrio,
            municipio: user.municipio,
            departamento:user.departamento,
            perfil_id: user.perfil_id
        });
        return("registro actualizado");
    }

    public async eliminarUsuario({ request }: HttpContextContract){
        const id = request.param("id");
        await User.query().where("id", id).delete();
        return("Usuario eliminado");
}

}
