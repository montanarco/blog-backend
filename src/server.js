import express, { response } from 'express';
import {db, connectMongo} from './db-utils.js';

import articlesRouter from './controllers/articlesController.js'

const app = express();
app.use(express.json());

const PORT = 8000;

// Use the articles router for the '/api/articles' path
app.use('/api/articles', articlesRouter);

connectMongo(()=>{
    console.log('conected to the data base');
    app.listen(PORT, () =>{
        console.log(`server is listening on port ${PORT}`);
    });
});
