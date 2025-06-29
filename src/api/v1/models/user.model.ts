import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    name?: string;
    email?: string;
    mobileNo: string;
    avatarImg?: string;
    referredBy?: mongoose.Types.ObjectId;
    role: 'user' | 'admin';
}

const userSchema = new Schema<IUser>(
    {
        name: { type: String },
        email: { type: String, lowercase: true },
        mobileNo: { type: String, required: true, unique: true },
        avatarImg: { type: String },
        referredBy: { type: Schema.Types.ObjectId, ref: 'User' },
        role: { type: String, enum: ['user', 'admin'], default: 'user' },
    },
    { timestamps: true }
);

export const User = mongoose.model<IUser>('User', userSchema);
