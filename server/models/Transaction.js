const { Schema, model } = require('mongoose')

const TransactionSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'

        },
        transactionType: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        balance: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
)

model("Transaction", TransactionSchema)