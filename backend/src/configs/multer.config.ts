import multer from 'multer';

const storage = multer.memoryStorage(); // Store files in memory TODO: Evaluate if this is the better than using disk storage.
export const upload = multer({ storage });