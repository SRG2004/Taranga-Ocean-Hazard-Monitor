
const checkRole = (roles) => (req, res, next) => {
    // This assumes the user's role is fetched from DB and attached to req.user
    // For now, we will mock it. In a real scenario, authMiddleware would do this.
    const userRole = req.user.role || 'citizen'; 

    if (roles.includes(userRole)) {
        next();
    } else {
        res.status(403).send({ error: 'Forbidden: Insufficient permissions.' });
    }
};

module.exports = { checkRole };
