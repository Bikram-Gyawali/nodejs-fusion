import { Model } from 'mongoose';

/**
 * Count documents from a collection.
 */
const estimatedDocumentCount = (collection: Model<any>, query?: object) => {
    if (query) {
        return collection.countDocuments(query);
    }
    return collection.estimatedDocumentCount();
};

export { estimatedDocumentCount };
