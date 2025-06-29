"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = (res, success, message, data) => res.json({ success, message, data });
exports.sendResponse = sendResponse;
