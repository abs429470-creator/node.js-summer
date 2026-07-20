// The valid authentication key — in a real project, this would come from an environment variable
const VALID_AUTH_KEY = 'my-secret-auth-key-2024';

// Middleware for authentication — checks that the client sent a valid auth-key header
function checkAuthKey(req, res, next) {
    const authKey = req.headers['auth-key'];

    // Check 1: Is the header present?
    if (!authKey) {
        return res.status(401).json({
            error: 'Unauthorized',
            message: 'Missing auth-key header. Please include the authentication key in the request header.'
        });
    }

    // Check 2: Does the value match the valid key?
    if (authKey !== VALID_AUTH_KEY) {
        return res.status(401).json({
            error: 'Unauthorized',
            message: 'Invalid authentication key. Access denied.'
        });
    }

    // Everything is fine — proceed to the next route or middleware
    next();
}

export default checkAuthKey;
