import express from 'express';
import { EnvironmentService, LogService } from '../services'
import * as twilio from 'twilio';
const AccessToken = twilio.jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

var router = express.Router();
/* request custom auth code */
router.get('/request-twilio-token', async (req, res, next) => {
  const MAX_ALLOWED_SESSION_DURATION = 14400;
  const twilioAccountSid = EnvironmentService.get('TWILIO_ACCOUNT_SID');
  const twilioApiKeySID = EnvironmentService.get('TWILIO_API_KEY_SID');
  const twilioApiKeySecret = EnvironmentService.get('TWILIO_API_KEY_SECRET');

  let { identity, roomName, password } = req.query;
  const allowedIdentity = [
    'user1',
    'user2',
    'user3',
    'user4'
  ]
  const allowedRooms = [
    'p2p',
    'smallgroup'
  ]
  
  // find uid from user request from body and also check password
  LogService.logDebug(identity, roomName, password)
  try{
    if(!allowedIdentity.includes(identity)){
      throw {'E_AUTH': 'Not allowed identity'}
    }
    if(!allowedRooms.includes(roomName)){
      throw {'E_AUTH': 'Not allowed room'}
    }
    if(password != EnvironmentService.get('TWILIO_SERVICE_PASSWORD')) {
      throw {'E_AUTH': 'Invalid password'}
    }

    const token = new AccessToken(twilioAccountSid, twilioApiKeySID, twilioApiKeySecret, {
      ttl: MAX_ALLOWED_SESSION_DURATION,
    });
    token.identity = identity;
    const videoGrant = new VideoGrant({ room: roomName });
    token.addGrant(videoGrant);
    res.send(token.toJwt());
    console.log(`issued token for ${identity} in room ${roomName}`);
  }catch(err){      
    res.status(500).json(err)
  } 	
});

export default router;