"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Ensure the uploads folder exists
const uploadPath = path_1.default.join(__dirname, '../../uploads');
if (!fs_1.default.existsSync(uploadPath)) {
    fs_1.default.mkdirSync(uploadPath);
}
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadPath),
    filename: (_req, file, cb) => cb(null, Date.now() + path_1.default.extname(file.originalname)),
});
exports.upload = (0, multer_1.default)({ storage });
