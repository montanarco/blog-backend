import express from 'express';
const router = express.Router();

import * as ArticlesService from '../services/articlesService.js'

const ARTICLE_404 = 'Article not found';

// Route to get an article by name
router.get('/:name', async (req, res) => {
    const { name } = req.params;
    const { uid } = req.user;

    const article = await ArticlesService.findArticleByName(name);

    if (article) {
        const upvoteIds = article.upvotesIds || [];
        article.canUpvote = uid && !upvoteIds.includes(uid);
        res.json(article);
    } else {
        res.status(404).send(ARTICLE_404);
    }
});

router.use((req,res,next)=>{
    if(req.user){
        next();
    } else {
        res.sendStatus(401);
    }
});

router.put('/:name/upvote',
    async (req,res)=>{
        const { name } = req.params;   
        const { uid } = req.user;
        
        const article = await ArticlesService.findArticleByName(name);

        if(article){
            const upvoteIds = article.upvotesIds || [];
            const canUpvote = uid && !upvoteIds.includes(uid);
            if(canUpvote){
                await ArticlesService.upvoteArticleByName(name, uid);
            }

            const updatedArticle = await ArticlesService.findArticleByName(name);
            res.send(updatedArticle);
        }else{
            res.status(404).send(ARTICLE_404);
        }
        
});

router.post('/:name/comments',
    async (req,res)=>{
        const { name } = req.params;
        const { text } = req.body;
        const { email } = req.user;

        await ArticlesService.addCommentByName(name, { postedBy: email , text });
        const article = await ArticlesService.findArticleByName(name);

        if(article){
            res.status(200).send(article);
        }else{
            res.status(404).send(ARTICLE_404);
        }
        
}); 

router.get('/:name/comments',
    async (req,res)=>{
        const { name } = req.params;

        const article = await ArticlesService.findArticleByName(name);
        if(article){
            res.send(article.comments);
        }else{
            res.status(404).send(ARTICLE_404);
        }
        
});

// Export the router
export default router;