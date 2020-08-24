const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const authRoutes = require('./routes');

app.use('/auth', authRoutes);

app.use('/', (req, res) => {
    return res.status(200).sendFile(path.resolve(__dirname,'../src/home.html'))
})

app.use('*', (req, res) => {
    return res.sendStatus(404);
})

app.use((req, res, next, err) =>{
    const deafultErr = {
        log: 'Express error handler caught error in middleware',
        status: 400,
        msg: {
            err: 'An error occurred'
        }
    }
    const errorObj = Object.assign({}, defaultErr,err);
    console.log(errorObj);
})

app.listen(PORT, () => {
    console.log(`App listening on Port ${PORT}`);
})