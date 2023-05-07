const mongoose = require('mongoose');

const bd = 'FoodFinder';
const port = '27017';
const host = '127.0.0.1';

class DataBase {
    constructor() {
        this.conectar();
    }

    conectar() {
        mongoose.connect(`mongodb://${host}:${port}/${bd}`) 
        .then(result => {
            console.log('Se conectó a MongoDB.');
        })
        .catch(error => {
            console.log('Error al conectarse a MongoDB.');
        });
    }
}

module.exports = new DataBase();