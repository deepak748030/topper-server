"use strict";
// src/api/v1/services/user.service.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.findByMobile = exports.updateUser = exports.getAllUsers = exports.createUser = void 0;
const user_model_1 = require("../models/user.model");
const createUser = async (data) => user_model_1.User.create(data);
exports.createUser = createUser;
const getAllUsers = async () => user_model_1.User.find().sort('-createdAt');
exports.getAllUsers = getAllUsers;
const updateUser = async (id, data) => user_model_1.User.findByIdAndUpdate(id, data, { new: true });
exports.updateUser = updateUser;
const findByMobile = async (mobileNo) => user_model_1.User.findOne({ mobileNo });
exports.findByMobile = findByMobile;
