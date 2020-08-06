import express from "express";
const app = express();
const port = 9000;
import { listings } from "./listings";
import bodyParser from "body-parser";

app.use(bodyParser.json());


app.get('/', (req,res) => {
    res.send('hello world');
})
 app.get('/listings', (req, res) => {
     res.send(listings);
 })

 app.post('/delete-listing', (req, res) => {
    const id: string = req.body.id;
    console.log("iddd", id);
    for (let i = 0; i < listings.length; i++){
        if (listings[i].id === id){
            return res.send(listings.splice(i, 1)[0]);
        }
    }
    return res.send('Failed to delete listing');
})

app.listen(port);

console.log(`[app]: http://localhost:${port}`);