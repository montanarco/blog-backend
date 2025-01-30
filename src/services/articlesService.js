import { db } from '../db-utils.js';

async function addCommentByName(name, comment){
    await db.collection('articles').updateOne({ name }, {
        $push: { comments: comment}
    });
}

async function findArticleByName(name) {
    return await db.collection('articles').findOne({ name });
}

async function upvoteArticleByName(name){
    await db.collection('articles').updateOne({ name }, {
        $inc: {upvotes: 1}
    });
}

export { addCommentByName, findArticleByName, upvoteArticleByName };