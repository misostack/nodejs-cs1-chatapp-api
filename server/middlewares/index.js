const AuthorizedMiddleware = (req, res, next) => {
	// next();
	const authorization_str = req.header('Authorization') ? req.header('Authorization') : '';
	const pattern = /^Bearer\s(.*)/;	
	const reg = authorization_str.match( pattern );	
	if(reg && reg[1]){
		next();
	}else{
		return res.sendStatus(401);
  }
}

export {
  AuthorizedMiddleware,
}