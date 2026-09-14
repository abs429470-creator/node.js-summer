// The authentication key — now loaded from the environment (.env), no hardcoded secret in code
const VALID_AUTH_KEY = process.env.AUTH_KEY;

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
