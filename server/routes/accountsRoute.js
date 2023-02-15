const express = require('express')
const router = express.Router()
const { model } = require('mongoose')
const Transaction = model('Transaction')
const User = model('User')

const authenticate = require('../middlewares/authenticate')
const isBanker = require('../middlewares/isBanker')
const isCustomer = require('../middlewares/isCustomer')

const UserType = {
    CUSTOMER: "customer",
    BANKER: "banker"
}
const TransactionType = {
    DIPOSIT: "deposit",
    WITHDRAW: "withdraw"
}

router.get("/get-user-data", authenticate, async (req, res) => {
    const { _id, email, userType, balance } = req.user

    if (userType === UserType.BANKER) {
        try {
            const accounts = await User.find({ userType: { $ne: UserType.BANKER } })
            const responseData = {
                _id,
                email,
                userType,
                accounts
            }
            return res.status(200).json(responseData)
        } catch (err) {
            return res.status(422).json({
                error: "Unable to find accounts"
            })
        }
    } else {
        try {
            const transactions = await Transaction.find({ userId: _id }).sort({ createdAt: -1 })
            const responseData = {
                _id,
                email,
                userType,
                balance,
                transactions
            }
            return res.status(200).json(responseData)
        } catch (err) {
            return res.status(422).json({
                error: "Unable to find transactions"
            })
        }
    }
})

router.get("/get-account-data/:userId", authenticate, isBanker, async (req, res) => {
    const { userId } = req.params

    try {
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({
                error: "User does not exist"
            })
        }
        const transactions = await Transaction.find({ userId }).sort({ createdAt: -1 })
        let {
            _id,
            email,
            userType,
            balance
        } = user
        return res.status(200).json({
            _id,
            email,
            userType,
            balance,
            transactions
        })
    } catch (err) {
        return res.status(422).json({
            error: "Something went wrong in getting account"
        })
    }
})

router.post("/transaction", authenticate, isCustomer, async (req, res) => {
    const { _id, balance } = req.user
    let { amount, transactionType } = req.body
    amount = Number(amount)

    if (isNaN(amount) || amount < 0) {
        return res.status(422).json({
            error: "Invalid amount"
        })
    }
    if (amount === 0) {
        return res.status(422).json({
            error: "Transaction amount must be greater than 0"
        })
    }
    if (amount > 1000000) {
        return res.status(422).json({
            error: "Transaction amount must not be greater than 10,000,00"
        })
    }
    var updatedBalance = balance;
    if (transactionType === TransactionType.DIPOSIT) {
        updatedBalance = balance + amount
    }
    else if (transactionType === TransactionType.WITHDRAW) {
        if (balance < amount) {
            return res.status(422).json({
                error: "Insufficient balance"
            })
        }
        updatedBalance = balance - amount
    }
    else {
        return res.status(422).json({
            error: "Invalid transaction type"
        })
    }
    try {
        await Transaction.create({
            userId: _id,
            amount,
            transactionType,
            balance: updatedBalance
        })
        await User.updateOne({ _id }, {
            $set: {
                balance: updatedBalance
            }
        })
        return res.status(201).json({})
    } catch (err) {
        return res.status(422).json({
            error: "Transaction failed"
        })
    }
})

module.exports = router