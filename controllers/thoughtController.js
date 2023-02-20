const { User, Thought } = require("../models");

module.exports = {
    getAllThoughts(req, res) {},
    getSingleThoughtById(req, res) {},
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
    updateThoughtById(req, res) {},
    deleteThoughtById(req, res) {},
    createReaction(req, res) {},
    deleteReactionById(req, res) {},
};
