function logging (req, res, next) {
    console.log("Logging here");
    next();
}

module.exports = logging;