 const jwt= require("jsonwebtoken") 
 const env= require('dotenv')
 env.config()
 
 const resumeAuthenticationMiddleware=(req, res, next)=>{
    const authHeader = req.headers.authorization; 
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({ message: "Authorization token not found" });
    }  
    
    const token = authHeader.split(" ")[1]; 
    try {
        // If you want to verify the token, use jwt.verify
        const decodedToken = jwt.verify(token, process.env.JWT_TOKEN); // Replace with your secret key
        // You can also attach the decoded token or any other info to the req object
        req.user = decodedToken; 
        req.email= decodedToken.email
        next(); // Proceed to the next middleware or route handler
      } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token" ,error:error.message});
      }
}

module.exports={resumeAuthenticationMiddleware}