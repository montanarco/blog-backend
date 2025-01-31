import express, { response } from 'express';
import fs from 'fs';
import admin from 'firebase-admin';

import {db, connectMongo} from './db-utils.js';

import articlesRouter from './controllers/articlesController.js'



const credentials = JSON.parse(
    fs.readFileSync('./credentials.json')
);

admin.initializeApp({
    credential: admin.credential.cert(credentials)
});

const app = express();
app.use(express.json());

const PORT = 8000;

app.use( async (req,res,next)=>{
    const { authtoken } = req.headers;
    if(authtoken){
        try {
            req.user = await admin.auth().verifyIdToken(authtoken);
        } catch (error) {
            return res.sendStatus(400);
        }  
    }

    req.user = req.user || {};

    next();
});

// Use the articles router for the '/api/articles' path
app.use('/api/articles', articlesRouter);

connectMongo(()=>{
    console.log('conected to the data base');
    app.listen(PORT, () =>{
        console.log(`server is listening on port ${PORT}`);
    });
});
