import express from 'express';
import { EnvironmentService, FirebaseService, LogService } from '../services'

var router = express.Router();
/* request custom auth code */
router.post('/request', async (req, res, next) => {
	const { email, password } = req.body
	// find uid from user request from body and also check password
	LogService.logDebug(email, password)
  try{  	
			if(
				email !== EnvironmentService.get('CUSTOM_USER_EMAIL')
				||
				password !== EnvironmentService.get('CUSTOM_USER_PASSWORD')
				){
				throw {'E_AUTH': '{{api.auth.request.invalid_user_or_password}}'}
				return
			}  	
  		const uid = EnvironmentService.get('CUSTOM_USER')
      const token = await Promise.resolve(FirebaseService.requestAuth(uid))        
      res.json(token)
  }catch(err){      
      res.status(500).json(err)
  } 	
});

export default router;