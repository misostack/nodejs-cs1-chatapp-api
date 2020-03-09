import { EnvironmentService } from './index'

// push to slack or send email to admin later

class LogService {
	static logError(...messages){
		console.error(`[ERROR]:${messages}`)
	}

	static logDebug(...messages){
		if(EnvironmentService.get('DEBUG') === true){
			console.debug(`[DEBUG]:${messages}`)
		}
	}	
}

export default LogService