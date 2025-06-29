// src/api/v1/services/wallet.service.ts
import { Wallet, IWallet } from '../models/wallet.model';

export const createWallet = async (userId: string): Promise<IWallet> =>
    Wallet.create({ userId });

export const getWalletByUserId = async (userId: string) =>
    Wallet.findOne({ userId });

export const getAllWallets = async () =>
    Wallet.find().populate('userId', 'mobileNo');

export const updateWallet = async (userId: string, data: Partial<IWallet>) =>
    Wallet.findOneAndUpdate({ userId }, data, { new: true });
