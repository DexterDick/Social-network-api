const { User, Thought } = require("../models");

module.exports = {
    getAllUsers(req, res) {
        User.find()
            .then(async (users) => {
                const userObj = {
                    users,
                };
                return res.json(userObj);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    getSingleUserById(req, res) {
        User.findOne({ _id: req.params.id })
            .then((user) => {
                !user
                    ? res.status(404).json({ message: "No user with that ID" })
                    : res.status(200).json(user);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    createNewUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user with this id!" })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    deleteUser(req, res) {
        // Remove a user's associated thoughts when deleted.
        User.findByIdAndRemove({ _id: req.params.id })
            .then((user) => {
                !user
                    ? res.status(404).json({
                          message: "No user with id found to delete",
                      })
                    : Thought.findOneAndUpdate(
                          { thoughts: req.params.id },
                          { $pull: { thoughts: req.params.id } },
                          { new: true }
                      );
            })
            .then((thought) =>
                !thought
                    ? res.status(404).json({
                          message: "User deleted but no thoughts found",
                      })
                    : res.json({ message: "Thoughts successfully deleted" })
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    addFriend(req, res) {
        // /:userId/friends/:friendId
        User.findByIdAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((user) => {
                !user
                    ? res.status(404).json({ message: "no user with this id!" })
                    : res.json(user);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    deleteFriend(req, res) {
        // /:userId/friends/:friendId
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((user) => {
                !user
                    ? res
                          .status(404)
                          .json({ message: "no user found with that Id!" })
                    : res.json(user);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
};
