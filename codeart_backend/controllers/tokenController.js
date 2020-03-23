const jwt = require('jsonwebtoken');
const fs   = require('fs');


///TODO: in future look at permissions, if necessary?///
exports.assignToken = (dbData, res) => {
      const payload = {
        sub: dbData.user_name,
				iss: 'auth-service',
      };
      const privateKey = this.getPrivateKey();
      const token = this.getToken(payload, privateKey);
      res.json({token: token})
		
			
		///TODO: figure out error handling///
    // .catch((err) => {
    //   console.log(err);
    //   res.status(500);
    //   res.json({err: err});
    // });
  };

//test

// Returns secret only known to server at runtime
exports.getPrivateKey = () => {
  const privateKey = fs.readFileSync('./keys/private.key', 'utf8');
  return privateKey;
};


exports.getPublicKey = () => {
  const publicKey = fs.readFileSync('./keys/public.key', 'utf8');
  return publicKey;
};


// Returns token
exports.getToken = (payload, secretOrPrivateKey, options) => {
  // If no options object supplied, make token expire in 24h
  if (!options) {
		options = {
			expiresIn: '24h',
			algorithm: "RS256"
		};
  }
  return jwt.sign(payload, secretOrPrivateKey, options);
};

// Returns result of token validation
exports.validateToken = (token) => {
  try {
    return jwt.verify(token, this.getPublicKey(), { expiresIn:' 24h', algorithm: 'RS256'}); 
  } catch (err) {
		console.log(err);
		return false;
	}
};

// Returns validation result of token
exports.token_post = (req, res) => {
  res.send(this.validateToken(req.header.Authorization, this.getSecret()));
};


exports.hasPermission = (token, resource) => {
  const result = this.validateToken(token, this.getSecret());
  console.log(result);
  if (result.name === 'JsonWebTokenError') {
    return false;
  } else if (result.permissions) {
    let permissionSet = new Set(result.permissions);
    console.log('permissions in token', JSON.stringify(permissionSet));
    return permissionSet.has(resource);
  } else {
    return false;
  }
};
