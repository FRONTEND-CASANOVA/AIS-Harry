import express from 'express'
import {getStudentsInfoById } from '../controllers/studentController.js'

const router = express.Router()

router.get('/:id', getStudentsInfoById)

export default router