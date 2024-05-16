import jwt from 'jsonwebtoken'

export const authMiddleware = async function (req,res,next){
try{
    // get the token from cookies
    const token = req.cookies.UserAuth || req.headers['authorization'].split('=')[1]
    // Check if token exists
		if (!token) {
			return res.status(401).json({
				success: false,
				message: "Please login to access user information",
			});
		}

        // Extract public key from environment variables
		const publicKey = process.env.SECRET_TOKEN;

		// Check if public key exists
		if (!publicKey) {
			return res.status(500).json({
				success: false,
				message: "Server error: Public key not provided",
			});
		}

        // Verify token using the public key
		const decodedToken = jwt.verify(token, publicKey);

        // Extract email, userId from the decoded token and add it to request body
		req.body.email = decodedToken.email;
		req.userId = decodedToken.userId;
		
        // Proceed to the next middleware
		next();
} catch (error) {
		console.log("Verification Token Error: " + error.message);
		// Return an error response if token verification fails
		return res.status(401).json({
			success: false,
			message: "Unauthorized: Invalid or expired token",
		});
	}
}