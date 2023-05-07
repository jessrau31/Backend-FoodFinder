const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const database = require('./modules/database');
const mongoStore = require('connect-mongo');

const usuariosRouter = require('./routes/usuarios-router');
const categoriasRouter = require('./routes/categorias-router');
const empresasRouter = require('./routes/empresas-router');
const productosRouter = require('./routes/productos-router');
const ordenesRouter = require('./routes/ordenes-router');
const sesionesRouter = require('./routes/sesiones-router');
const MongoStore = require('connect-mongo');
const MONGO_URL = "mongodb://127.0.0.1:27017"
app.use(session({
    secret : 'abcde',
    saveUninitialized : true,
    resave : true,
    store: database.conectar()
}));

app.use('/public', express.static(`storage/imgs`));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/usuarios', usuariosRouter);
app.use('/categorias', categoriasRouter);
app.use('/empresas', empresasRouter);
app.use('/productos', productosRouter);
app.use('/ordenes', ordenesRouter);
app.use('/sesiones', sesionesRouter);

app.get('/', (req, res) => {
    res.send('Petición recibida.');
});

app.listen(4201, () => {
    console.log('Servidor iniciado.');
});