import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Book from 'App/Models/book';
export default class BooksController {

    public async register({request}:HttpContextContract){
        const titulo = request.input("titulo");
        const formato = request.input('formato');
        const no_paginas = request.input('no_paginas');
        const id_usuario = request.input('id_usuario');
        const editorial = request.input('editorial');
        const author= request.input('author');
        const book = new Book()
        const usuarioExistente: Number = await this.getValidarLibroExistente(titulo);       
        if(usuarioExistente == 0 ){
            book.titulo = titulo
            book.formato = formato;
            book.no_paginas = no_paginas;
            book.id_usuario = id_usuario;
            book.editorial = editorial;
            book.author = author;
            await book.save();
            return{
                "msg": "libro registrado"
            }
        } else{
            return{
                "msg": "Error, libro existente"
            }
        }
    }
    private async getValidarLibroExistente(titulo: string): Promise<Number>{
        const total = await Book.query().where({'titulo':titulo}).count('*').from('books');
        console.log(total[0]);
        return parseInt(total[0]['count'])
    }

    public async getListarLibro(): Promise< Book[]> {
        const user = await Book.all();
        return user
    }
    public async buscarPorTitulo({ request }: HttpContextContract){
    const id = request.param("id");
    const user = await Book.find(id);
    return user
    }

    public async actualizarLibro({ request }: HttpContextContract){
        const id = request.param("id");
        const book = request.all();
        await Book.query().where("id", id).update({
            titulo : book.titulo,
            formato : book.formato ,
            no_paginas : book.no_paginas,
            id_usuario : book.id_usuario,
            editorial: book.editorial,
            author: book.author,
        });
        return("registro actualizado");
    }

    public async eliminarLibro({ request }: HttpContextContract){
        const id = request.param("id");
        await Book.query().where("id", id).delete();
        return("Libro eliminado");
}



}

