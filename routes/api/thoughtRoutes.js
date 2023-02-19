const router = require("express").Router();
const {
    getAllThoughts,
    getSingleThoughtById,
    createThought,
    updateThoughtById,
    deleteThoughtById,
} = require("../../controllers/thoughtController.js");

// api/thought
router.route("/").get(getAllThoughts).post(createThought);
// api/thought/:userId
router
    .route("/:id")
    .get(getSingleThoughtById)
    .delete(deleteThoughtById)
    .put(updateThoughtById);

module.exports = router;
