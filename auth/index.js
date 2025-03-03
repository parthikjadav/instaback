import jsonwebtoken from 'jsonwebtoken';

export const createToken = (data)=>{
    const token = jsonwebtoken.sign({data}, process.env.SECRET_KEY);
    return token;
} 

export const verifyToken = (token)=>{
    try{
        // verify token and return data
        const data = jsonwebtoken.verify(token, process.env.SECRET_KEY);
        return data;
    }catch(err){
        return false;
    }
}

export const authenticate = (req, res, next)=>{
    try {        
        const token = req.cookies["token"]; 
        
        if(!token){
            return res.status(401).json({message: 'Unauthorized'});
        }
        const user = verifyToken(token);
        if(!user){
            return res.status(401).json({message: 'Unauthorized'});
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({message: 'Unauthorized from authenticate middelware',Error: error.message});
    }
}

export const authorize = (roles)=>{
    return (req, res, next)=>{
        try {            
            if(!req.user.data.role || !roles.includes(req.user.data.role)){
              return res.status(403).json({message: 'Forbidden you have no access to use this admin route'});
            }
            next();
        } catch (error) {
            res.status(401).json({message: 'Unauthorized from authorize middelware',Error: error.message});
        }
    }
}