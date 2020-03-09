import express from 'express';
import { EnvironmentService, FirebaseService, LogService } from '../services'

var router = express.Router();
/* GET home page. */
router.get('/', async (req, res, next) => {
    // const users = await Promise.resolve(FirebaseService.listAllUsers())

    // res.json(users)
    res.json([])
});

export default router;