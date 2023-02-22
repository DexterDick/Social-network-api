const { Schema, Types, model } = require("mongoose");
const moment = require("moment");

// -----Reaction Schema to use in thought no model
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (date) => moment(date).format("MMM DD, YYYY [at] hh:mm a"),
    },
});
// -----End of reaction Schema

// create thought schema
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },

        createdAt: {
            type: Date,
            default: Date.now(),
            get: (date) => moment(date).format("MMM DD, YYYY [at] hh:mm a"),
        },

        username: {
            type: String,
            required: true,
        },

        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
});

// create model using thoughtSchema
const Thought = model("thought", thoughtSchema);

// export Thought model

module.exports = Thought;
