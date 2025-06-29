"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransactionsByUserId = exports.createTransaction = void 0;
// src/api/v1/services/transaction.service.ts
const transaction_model_1 = require("../models/transaction.model");
const createTransaction = async (data) => transaction_model_1.Transaction.create(data);
exports.createTransaction = createTransaction;
const getTransactionsByUserId = async (userId) => transaction_model_1.Transaction.find({ userId }).sort({ createdAt: -1 });
exports.getTransactionsByUserId = getTransactionsByUserId;
