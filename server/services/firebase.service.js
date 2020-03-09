// firebase-admin
import * as admin from 'firebase-admin';
import { EnvironmentService, LogService } from './index';

class FireBaseService {
	// app
	constructor() {
		
		// this.app = admin.initializeApp({
  	// 	credential: admin.credential.applicationDefault(),
		//   databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
		// });
	}

	static initializeApp() {
		// const serviceAccount = require("path/to/serviceAccountKey.json");
		const GAC_TYPE = EnvironmentService.get('GAC_TYPE') ? EnvironmentService.get('GAC_TYPE') : 'file'
		const opts = {
			credential: EnvironmentService.get('GOOGLE_APPLICATION_CREDENTIALS'),
			databaseURL: EnvironmentService.get('FIREBASE_DATABASE_NAME')
		}
		if(GAC_TYPE == 'file'){
			opts = { ...opts, ...admin.credential.applicationDefault() }
		}else{ // string
			
			const credential = JSON.parse(new Buffer.from(opts.credential, 'base64').toString())			
			opts.credential = admin.credential.cert(credential)
		}

		admin.initializeApp(opts)
		return admin;		
	}

	static listAllUsers() {
		const fetchUser = ({nextPageToken, limit = 1000, payload = [], resolver = null}) => {
			return new Promise((resolve, reject) => {
				admin.auth().listUsers(limit, nextPageToken)
				.then( res => {
					const users = res.users
					const updatedPayload = [...payload, ...users]					
					if(res.pageToken) {
						fetchUser({
							nextPageToken: res.pageToken,
							limit: limit,
							payload: updatedPayload,
							resolver: resolver || resolve
						})
					}else {
						if(resolver) resolver(updatedPayload);
						resolve(updatedPayload)
					}
				})	
			}).catch(error => {
				reject(error)
			})
		};
		return new Promise((resolve, reject) => {
			fetchUser({limit: 100})
			.then(users => resolve(users))
			.catch(err => reject(err))
		})
	}

	static requestAuth(uid) {
		return new Promise((resolve, reject) => {
			admin.auth().createCustomToken(uid)
		  .then(token => resolve(token))
		  .catch(error => reject(error));
		})
	}
}

export default FireBaseService