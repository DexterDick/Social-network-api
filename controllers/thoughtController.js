const { User, Thought } = require("../models");

module.exports = {
    getAllThoughts(req, res) {
        Thought.find({})
            .then((thoughtData) => res.status(200).json(thoughtData))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    getSingleThoughtById(req, res) {
        Thought.findOne({ _id: req.params.id })
            .then((thoughtData) => {
                res.status(200).json(thoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    createThought(req, res) {
        Thought.create(req.body)
            .then(({ _id }) => {
                console.log(_id);
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then((thoughtData) => {
                if (!thoughtData) {
                    res.status(404).json({ message: "no user found with id" });
                }
                res.json(thoughtData);
            })
            .catch((err) => {
                return res.status(500).json(err);
            });
    },
    updateThoughtById(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thoughtData) => {
                !thoughtData
                    ? res
                          .status(404)
                          .json({ message: "No Thought with this id!" })
                    : res.status(200).json(thoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    deleteThoughtById(req, res) {
        console.log(req.body);
        // still has some issues contine here
        Thought.findOneAndDelete({ _id: req.params.id })
            .then((thoughtData) => {
                !thoughtData
                    ? res
                          .status(404)
                          .json({ message: "no thoughts with that ID" })
                    : User.findOneAndUpdate(
                          { thoughts: req.params.id },
                          { $pull: { thoughts: req.params.id } },
                          { new: true }
                      );
            })
            .then(() => res.json({ message: "Thought deleted from user" }))
            .catch((err) => res.status(500).json(err));

        // still has some issues contine here
    },
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body } },
            { new: true }
        )
            .then((thoughtData) => {
                !thoughtData
                    ? res
                          .status(404)
                          .json({ mesaage: "no thoughts with that id" })
                    : res.json(thoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    deleteReactionById(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        )
            .then((reaction) => {
                !reaction
                    ? res.status(404).json({
                          message: "reaction deleted, but no courses found",
                      })
                    : res.json({ message: "reacton successfully deleted" });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
};
