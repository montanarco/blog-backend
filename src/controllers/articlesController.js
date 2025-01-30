import express from 'express';
const router = express.Router();

import * as ArticlesService from '../services/articlesService.js'

const ARTICLE_404 = 'Article not found';

// Route to get an article by name
router.get('/:name', async (req, res) => {
    const { name } = req.params;

    const article = await ArticlesService.findArticleByName(name);

    if (article) {
        res.json(article);
    } else {
        res.sendStatus(404).send(ARTICLE_404);
    }
});

router.put('/:name/upvote',
    async (req,res)=>{
        const { name } = req.params;    

        await ArticlesService.upvoteArticleByName(name)
        const article = await ArticlesService.findArticleByName(name);

        if(article){
            res.send(`the ${name} article has: ${article.upvotes} !!!`);
        }else{
            res.sendStatus(404).send(ARTICLE_404);
        }
        
});

router.post('/:name/comments',
    async (req,res)=>{
        const { name } = req.params;
        const { postedBy, text } = req.body;

        await ArticlesService.addCommentByName(name, { postedBy, text });
        const article = await ArticlesService.findArticleByName(name);

        if(article){
            res.status(200).send(article.comments);
        }else{
            res.sendStatus(404).send(ARTICLE_404);
        }
        
}); 

router.get('/:name/comments',
    async (req,res)=>{
        const { name } = req.params;

        const article = await ArticlesService.findArticleByName(name);
        if(article){
            res.send(article.comments);
        }else{
            res.sendStatus(404).send(ARTICLE_404);
        }
        
});

// Export the router
export default router;