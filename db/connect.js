const mongoose = require('mongoose');

const { DB_USER, DB_SECRET } = process.env;

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_SECRET}@cluster0.wo2wf2x.mongodb.net/Company?retryWrites=true&w=majority`)
    .then(() => {
        console.log('connected to employe db');
    }).catch((e) => {
        console.log('error!!!!', e);
    })