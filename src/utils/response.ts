import { Response } from 'express';

export const sendResponse = (
    res: Response,
    success: boolean,
    message: string,
    data?: any
) => res.json({ success, message, data });
