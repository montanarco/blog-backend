import { db } from '../db-utils.js';

const ARTICLE_COLLECTION = 'articles';

async function addCommentByName(name, comment){
    await db.collection(ARTICLE_COLLECTION).updateOne({ name }, {
        $push: { comments: comment}
    });
}

async function findArticleByName(name) {
    return await db.collection(ARTICLE_COLLECTION).findOne({ name });
}

async function upvoteArticleByName(name){
    await db.collection(ARTICLE_COLLECTION).updateOne({ name }, {
        $inc: {upvotes: 1}
    });
}

export { addCommentByName, findArticleByName, upvoteArticleByName };