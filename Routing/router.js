// 1) import express
const express = require('express')

// import userController
const userController = require('../Controller/userController')

// Routing is created with the help of Routing()class present in express modules 


// importk project Controller
const projectController = require('../Controller/projectController')
const jwtMiddleware = require('../Middleware/jwtMiddleware')

// import multer
const multerConfig = require('../Middleware/multerMiddleWare')



// 2) create an object for routin class
const router = new express.Router()

// 3) set up path

// path for register request -which is made in allAPI.js1 in frntend
router.post('/user/register',userController.register)

// paths to resolve login request
router.post('/user/login',userController.login)

// paths for storing project data
router.post('/user/add-project',jwtMiddleware,multerConfig.single('projectImage'),projectController.addProject)

// path to get home projects
router.get('/home-project',projectController.getHomeProjects)

// path to get all projects
router.get('/all-project',jwtMiddleware,projectController.getAllProjects)


// path to get user project
router.get('/user/all-project',jwtMiddleware,projectController.getUserProject)


// path to delete user project
router.delete('/user-project/delete/:id',jwtMiddleware,projectController.deleteUserProject  )

// path to update user project
router.put('/project/edit/:projectId',jwtMiddleware,multerConfig.single('projectImage'),projectController.editUserproject)

// path to update profile
router.put('/profile-update',multerConfig.single('profile'),userController.profileUpdate)


// 4) export router
module.exports = router