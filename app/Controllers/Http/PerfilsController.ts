import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Perfil from 'App/Models/Perfil'
export default class PerfilsController {
    public async register({request}:HttpContextContract){
        const id = request.input('id');
        const descripcion = request.input('descripcion_perfil');
        const perfil = new Perfil();
        const perfilExistente: Number = await this.getValidarPerfilExistente(id);
        if(perfilExistente == 0 ){
            perfil.id = id
            perfil.descripcion_perfil = descripcion;
            await perfil.save();
            return{
                "msg": "perfil registrado"
            }
        } else{
            return{
                "msg": "Error, perfil existente"
            }
        }
    }
    private async getValidarPerfilExistente(codigo_usuario: Number): Promise<Number>{
        const total = await Perfil.query().where({'id':codigo_usuario}).count('*').from('perfils');
        console.log(total[0]);
        return parseInt(total[0]['count'])
    }
    public async getListarPerfil(): Promise<Perfil[]> {
        const user = await Perfil.all();
        return user
    }
    public async buscarPorId({ request }: HttpContextContract){
    const id = request.param("id");
    const user = await Perfil.find(id);
    return user
    }

    public async actualizarPerfil({ request }: HttpContextContract){
        const id = request.param("id");
        const user = request.all();
        await Perfil.query().where("id", id).update({
            email : user.email,
            descripcion_perfil : user.descripcion_perfil
        });
        return("perfil actualizado");
    }

    public async eliminarPerfil({ request }: HttpContextContract){
        const id = request.param("id");
        await Perfil.query().where("id", id).delete();
        return("Perfil eliminado");
}

}
