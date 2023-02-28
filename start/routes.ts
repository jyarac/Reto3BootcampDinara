/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

/*
Route.get('/', async () => {
  return { hello: 'world' }
})
*/

/*
Sobre cada ruta protegida agregue un middleware llamado check
este middleware solo le da acceso al usuario si tiene un 1 en perfil_ID
suponiendo que 1 es el identificador del administrador

en dado caso de querer darle acceso a otro perfil, habra que agregar un || para
incluir al identificador unico del perfil

*/ 
Route.group(()=> {
  Route.post("/register","AuthController.register");
  Route.post("/login","AuthController.login");
  Route.group(()=> {
  Route.get("/listar","UsersController.getListarUsuarios");
  Route.get("/buscar-id/:id","UsersController.buscarPorId");
  Route.delete("/eliminar/:id","UsersController.eliminarUsuario");
  Route.put("actualizar/:id","Userscontroller.actualizarUsuario");
  }).middleware(["auth","check"]) 
}).prefix("usuario")

Route.group(()=> {
  Route.group(()=>{
  Route.post("/register","PerfilsController.register");
  Route.get("/listar","PerfilsController.getListarPerfil");
  Route.get("/buscar-id/:id","PerfilsController.buscarPorId");
  Route.delete("/eliminar/:id","PerfilsController.eliminarPerfil");
  Route.put("actualizar/:id","PerfilsController.actualizarPerfil");
  }).middleware(["auth","check"])
}).prefix("perfil")

Route.group(()=> {
  Route.get("/listar","BooksController.getListarLibro");
  Route.group(()=> {
  Route.post("/register","BooksController.register");
  Route.get("/buscar-id/:id","BooksController.buscarPorTitulo");
  Route.delete("/eliminar/:id","BooksController.eliminarLibro");
  Route.put("actualizar/:id","BooksController.actualizarLibro");
 }).middleware(["auth","check"])
}).prefix("books")