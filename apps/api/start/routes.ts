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

router.get('/dnd/books/:id/public', '#controllers/dnd_books_controller.publicFind')
router.get('/dnd/books/:id/pdf', '#controllers/dnd_books_controller.pdf')

router
  .group(() => {
    router.get('/n5e/characters', '#controllers/n5e_controller.listAllCharacters')
    router.post('/n5e/characters', '#controllers/n5e_controller.createCharacter')
    router.put('/n5e/characters/:id', '#controllers/n5e_controller.updateCharacter')
  })
  .middleware(middleware.auth())

router.get('/n5e/characters/:id', '#controllers/n5e_controller.findCharacter')

router.post('/auth/login', '#controllers/session_controller.login')
router.post('/auth/register', '#controllers/session_controller.register')
router.post('/auth/logout', '#controllers/session_controller.logout').middleware(middleware.auth())
router.get('/auth/me', '#controllers/session_controller.me').middleware(middleware.auth())
