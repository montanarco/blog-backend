import express from 'express';
const router = express.Router();

import * as ArticlesService from '../services/articlesService.js'

// Route to get an article by name
router.get('/:name', async (req, res) => {
    const { name } = req.params;

    const article = await ArticlesService.findArticleByName(name);

    if (article) {
        res.json(article);
    } else {
        res.status(404).send('Article not found');
    }
});

router.put('/:name/upvote',
    async (req,res)=>{
        const { name } = req.params;    

        ArticlesService.upvoteArticleByName(name)
        const article = await ArticlesService.findArticleByName(name);

        if(article){
            console.log('article votes: ', article.upvotes);
            res.send(`the ${name} article has: ${article.upvotes} !!!`);
        }else{
            res.send("article not found!");
        }
        
});

router.post('/:name/comments',
    async (req,res)=>{
        const { name } = req.params;
        const { postedBy, text } = req.body;

        ArticlesService.addCommentByName(name, { postedBy, text });
        const article = await ArticlesService.findArticleByName(name);

        if(article){
            res.status(200).send(article.comments);
        }else{
            res.sendStatus(404).send("article not found!");
        }
        
}); 

router.get('/:name/comments',
    async (req,res)=>{
        const { name } = req.params;

        const article = await ArticlesService.findArticleByName(name);
        if(article){
            res.send(article.comments);
        }else{
            res.send("article not found!");
        }
        
});

// Export the router
export default router;