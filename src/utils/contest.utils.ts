// src/api/v1/utils/contest.utils.ts

// 👇 Get current IST time
export const getISTTime = () => {
    return new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
};

// 👇 Convert Mongoose Map to plain JS object
export const convertMapToObject = (map: any): Record<string, number> => {
    if (!map) return {};
    const obj: Record<string, number> = {};
    for (const [key, value] of map.entries()) {
        obj[key] = value;
    }
    return obj;
};

// 👇 Get prize by rank from map
export const getPrizeForRank = (rank: number, prizeMap: Record<string, number>): number => {
    for (const key in prizeMap) {
        if (key.includes('-')) {
            const [start, end] = key.split('-').map(Number);
            if (rank >= start && rank <= end) return prizeMap[key];
        } else if (Number(key) === rank) {
            return prizeMap[key];
        }
    }
    return 0;
};
