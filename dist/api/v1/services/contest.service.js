"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllContests = exports.deleteContest = exports.updateContest = exports.createContest = void 0;
// src/api/v1/services/contest.service.ts
const contest_model_1 = require("../models/contest.model");
const createContest = async (data) => contest_model_1.Contest.create(data);
exports.createContest = createContest;
const updateContest = async (id, data) => contest_model_1.Contest.findByIdAndUpdate(id, data, { new: true });
exports.updateContest = updateContest;
const deleteContest = async (id) => contest_model_1.Contest.findByIdAndDelete(id);
exports.deleteContest = deleteContest;
const getAllContests = async () => contest_model_1.Contest.find().sort('-createdAt');
exports.getAllContests = getAllContests;
