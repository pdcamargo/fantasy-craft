/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router
  .group(() => {
    router.get('/dnd/books', '#controllers/dnd_books_controller.listAll')
    router.get('/dnd/books/:id', '#controllers/dnd_books_controller.find')
    router.post('/dnd/books', '#controllers/dnd_books_controller.create')
    router.put('/dnd/books/:id', '#controllers/dnd_books_controller.update')
    router.delete('/dnd/books/:id', '#controllers/dnd_books_controller.delete')
    router.get('/dnd/books/:slug/check', '#controllers/dnd_books_controller.isSlugAvailable')
  })
  .middleware(middleware.auth())

router.post('/auth/login', '#controllers/session_controller.login')
router.post('/auth/register', '#controllers/session_controller.register')
router.post('/auth/logout', '#controllers/session_controller.logout').middleware(middleware.auth())
router.get('/auth/me', '#controllers/session_controller.me').middleware(middleware.auth())
