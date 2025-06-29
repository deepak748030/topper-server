import { Quiz } from '../models/quiz.model';
import { ApiError } from '../../../utils/apiError';

export const createQuiz = async (data: any, imagePath?: string) => {
    const payload = {
        ...data,
        image: imagePath || undefined,
    };
    return await Quiz.create(payload);
};

export const getQuizzesByContestId = async (contestId: string) => {
    return await Quiz.find({ contestId });
};

export const updateQuiz = async (id: string, data: any, imagePath?: string) => {
    const quiz = await Quiz.findById(id);
    if (!quiz) throw new ApiError(404, 'Quiz not found');

    if (imagePath) data.image = imagePath;

    Object.assign(quiz, data);
    return await quiz.save();
};

export const deleteQuiz = async (id: string) => {
    const quiz = await Quiz.findById(id);
    if (!quiz) throw new ApiError(404, 'Quiz not found');
    return await quiz.deleteOne();
};
