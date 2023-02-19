const router = require("express").Router();
const {
    getAllUsers,
    getSingleUserById,
    createNewUser,
    updateUser,
    deleteUser,
} = require("../../controllers/userController.js");

// route to get all user and post /api/users
router.route("/").get(getAllUsers).post(createNewUser);

// route to get, update and delete one user by id
// /api/users/:id
router.route("/:id").get(getSingleUserById).put(updateUser).delete(deleteUser);

module.exports = router;
