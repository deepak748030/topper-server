"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateWallet = exports.getAllWallets = exports.getWalletByUserId = exports.createWallet = void 0;
// src/api/v1/services/wallet.service.ts
const wallet_model_1 = require("../models/wallet.model");
const createWallet = async (userId) => wallet_model_1.Wallet.create({ userId });
exports.createWallet = createWallet;
const getWalletByUserId = async (userId) => wallet_model_1.Wallet.findOne({ userId });
exports.getWalletByUserId = getWalletByUserId;
const getAllWallets = async () => wallet_model_1.Wallet.find().populate('userId', 'mobileNo');
exports.getAllWallets = getAllWallets;
const updateWallet = async (userId, data) => wallet_model_1.Wallet.findOneAndUpdate({ userId }, data, { new: true });
exports.updateWallet = updateWallet;
