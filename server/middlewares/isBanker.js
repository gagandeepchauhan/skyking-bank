
const UserType = {
    CUSTOMER: "customer",
    BANKER: "banker"
}

module.exports = (req, res, next) => {
    const { userType } = req.user

    if (userType !== UserType.BANKER) {
        return res.status(403).json({
            error: "Unauthorized access"
        })
    }

    return next()
}