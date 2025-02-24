const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const protect = (req, res, next) => {
  let token;

  // Check if there's a token in the Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract the token from the header
      token = req.headers.authorization.split(' ')[1];

      console.log('Token received:', token); // Log the token

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      console.log('Decoded user info:', decoded); // Log the decoded user info

      // Attach both decoded and userId to the request object
      req.user = decoded;
      req.user.userId = decoded.userId; // Ensure userId is available at req.user.userId

      next();
      return; // Add return to prevent further execution
    } catch (error) {
      console.error('Token verification failed:', error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  // If no token found
  res.status(401).json({ message: 'Not authorized, no token' });
};

module.exports = protect;
