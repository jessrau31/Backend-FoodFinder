const mongoose = require('mongoose');

const bd = 'delivery';
const port = '27017';
const host = 'localhost';

class DataBase {
    constructor() {
        this.conectar();
    }

    conectar() {
        //mongoose.connect(`mongodb://${host}:${port}/${bd}`)
        mongoose.connect('mongodb+srv://chris_caph:i3kyawHUqMynL2WI@cluster0.xrdtm.mongodb.net/?retryWrites=true&w=majority')
        .then(result => {
            console.log('Se conectó a MongoDB.');
        })
        .catch(error => {
            console.log('Error al conectarse a MongoDB.');
        });
    }
}

module.exports = new DataBase();