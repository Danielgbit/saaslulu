/**
 * Combine date + time into a valid JavaScript Date.
 */
export const combineDateTime = (date: string, time: string): Date => {
    return new Date(`${date}T${time}`);
};
