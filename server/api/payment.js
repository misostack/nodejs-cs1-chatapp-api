import express from 'express';
import { EnvironmentService, StripeService, LogService } from '../services'

var router = express.Router();
/* request custom auth code */
router.post('/process', async (req, res, next) => {
	const { source, description } = req.body
	// find uid from user request from body and also check password
	LogService.logDebug(source)
  try{  	
			if(
				source.length === 0
				){
				throw {'E_AUTH': '{{api.charges.process.invalid_source}}'}
				return
			}  	
  		const charge = await StripeService.charge({
  			amount: 1, // euro
  			currency: 'eur',
  			source: source,
  			description: description ? description : `Example Payment with nodeJS at ${Date.now()}`, 
  		})
      res.json(charge)
  }catch(err){      
  		LogService.logError(err);
      res.status(500).json(err)
  } 	
});

export default router;