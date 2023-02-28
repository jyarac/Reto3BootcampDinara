import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Checkprofile {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    try {
      // Obtener el usuario autenticado
      const user = await auth.user!
      // Verificar si el usuario tiene el rol de "administrador"
      if (user.perfil_id === 1) { // Suponiendo que 1 es el ID del perfil de administrador
        // Si el usuario tiene el rol de "administrador", permitir el acceso
        await next()
      } else {
        // Si el usuario no tiene el rol de "administrador", redirigir al inicio de sesión
        throw new Error('No tiene acceso a esta ruta')
      }
    } catch (error) {
      console.log(error)
      // Si no hay un usuario autenticado, redirigir al inicio de sesión
      throw new Error('usuario no autenticado')
    }
  }
}

