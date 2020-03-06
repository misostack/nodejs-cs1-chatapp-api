#!/usr/bin/env node
import fs from 'fs';
console.log('---------------------')
console.info('SETUP...............')
console.info('SETUP DONE!.........')
console.info(`You can start server with this command 'node ./dist-server/bin/www.js'`)
const firebaseServiceAccountKey = `${__dirname}/../../firebaseServiceAccountKey.json`
if(fs.existsSync(firebaseServiceAccountKey)){
	console.log('Parsing config from firebaseServiceAccountKey.json to string')
	const buffer = fs.readFileSync(firebaseServiceAccountKey)
	const str = buffer.toString('base64')
	console.log(str)

	let revBuff = new Buffer.from(str, 'base64')	
	console.log(revBuff.toString())
}
console.log('---------------------')