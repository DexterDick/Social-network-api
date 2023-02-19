const router = require("express").Router();
const {
    getAllThoughts,
    getSingleThoughtById,
    createThought,
    updateThoughtById,
    deleteThoughtById,
    createReaction,
    deleteReactionById,
} = require("../../controllers/thoughtController.js");

// api/thoughts
router.route("/").get(getAllThoughts).post(createThought);
// api/thoughts/:userId
router
    .route("/:id")
    .get(getSingleThoughtById)
    .delete(deleteThoughtById)
    .put(updateThoughtById);

///api/thoughts/reactions
router.route("/:thoughtId/reactions").post(createReaction);

///api/thoughts/:thoughtId/reactionId
router.route("/:thoughtId/reactions/reactionId").delete(deleteReactionById);

module.exports = router;
