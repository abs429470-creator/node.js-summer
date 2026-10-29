// Sends a 500 response for unexpected errors (e.g. a JSON file failed to load).
// Kept in one place so every controller's .catch() returns the same shape.
export function sendServerError(res, err) {
    console.error(err);
    res.status(500).json({
        error: 'Internal Server Error',
        message: err.message
    });
}
