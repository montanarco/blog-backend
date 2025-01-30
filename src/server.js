import express, { response } from 'express';
import { MongoClient } from 'mongodb';

const app = express();
app.use(express.json());

const PORT = 8000;

app.get('/api/articles/:name', async (req,res)=>{   
    const { name } = req.params;

    const client = new MongoClient('mongodb://localhost:27017')
    await client.connect();

    const db = client.db('react-blog-db'); // use react-blog-db
    const article = await db.collection('articles').findOne({ name });

    res.json(article);
})

app.put('/api/articles/:name/upvote',
    (req,res)=>{
        const { name } = req.params;
        const article = articlesInfo.find(article => article.name === name);
        if(article){
            article.upvotes ++;
            res.send(`the ${name} article has: ${article.upvotes} !!!`);
        }else{
            res.send("article not found!");
        }
        
});

app.post('/api/articles/:name/comments',
    (req,res)=>{
        const { name } = req.params;
        const { postedBy, text } = req.body;
        const article = articlesInfo.find(article => article.name === name);
        if(article){
            article.comments.push({ postedBy, text });
            res.status(200).send(article.comments);
        }else{
            res.sendStatus(404).send("article not found!");
        }
        
}); 

app.get('/api/articles/:name/comments',
    (req,res)=>{
        const { name } = req.params;
        const article = articlesInfo.find(article => article.name === name);
        if(article){
            res.send(article);
        }else{
            res.send("article not found!");
        }
        
});


app.listen(PORT, () =>{
    console.log(`server is listening on port ${PORT}`);
});