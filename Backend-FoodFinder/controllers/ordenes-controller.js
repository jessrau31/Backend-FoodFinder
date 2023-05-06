const orden = require('../models/orden');

//Agregar orden
module.exports.postOrden = (req, res) => {
    let o = new orden(req.body);
    o.save()
        .then(data => {
            res.send({codigo: 1, mensaje: 'Tu orden será tomada en breve.'});
            res.end();
        })
        .catch(error => {
            res.send({codigo: 0, mensaje: 'Error al procesar la orden.'});
            res.end();
        })
}

//Leer ordenes
module.exports.getOrdenes = (req, res) => {
    res.send('Leyendo ordenes.');
    res.end();
}

//Leer orden
module.exports.getOrden = (req, res) => {
    orden.find({_id: req.params.id})
        .then(data => {
            res.send(data[0]);
            res.end();
        })
        .catch(error => {
            res.send(error);
            res.end();
        });
}

//Actualizar orden
module.exports.putOrden = (req, res) => {
    orden.find({_id: req.params.id})
    .then(data => {
        let o = data[0];
        o.motorista = req.body._id;
        o.estado = 'sinEntregar';
        o.envio.estado = 'tomada';
        orden.updateOne({_id: req.params.id}, o)
            .then(data => {
                res.send({ codigo: 1, mensaje: '¡Orden tomada con éxito!' });
                res.end();
            })
            .catch(error => {
                res.send({ codigo: 0, mensaje: 'La orden no ha sido tomada.' });
                res.end();
            });
    })
}

//Actualizar orden tomada
module.exports.putOrdenTomada = (req, res) => {
    orden.updateOne({_id: req.params.id}, req.body)
        .then(data => {
            res.send('Orden tomada actualizada.');
            res.end();
        })
        .catch(error => {
            res.send(error);
            res.end();
        });
}

//Eliminar orden
module.exports.deleteOrden = (req, res) => {
    res.send('Eliminando orden ' + req.params.id);
    res.end();
}


//Leer ordenes disponibles
module.exports.getOrdenesDisponibles = (req, res) => {
    orden.find({estado: 'disponible'})
    .then(data => {
        res.send(data);
        res.end();
    })
    .catch(error => {
        res.send(error);
        res.end();
    });
}

//Leer ordenes sin entregar
module.exports.getOrdenesSinEntregar = (req, res) => {
    orden.find({estado: 'sinEntregar', motorista: req.params.id})
    .then(data => {
        res.send(data);
        res.end();
    })
    .catch(error => {
        res.send(error);
        res.end();
    });
}

//Leer ordenes entregadas
module.exports.getOrdenesEntregadas = (req, res) => {
    orden.find({estado: 'entregada', motorista: req.params.id})
    .then(data => {
        res.send(data);
        res.end();
    })
    .catch(error => {
        res.send(error);
        res.end();
    });
}

//Leer ordenes pendientes de los usuarios
module.exports.getOrdenesPendientes = (req, res) => {
    orden.find({idCliente: req.params.id, $or: [{estado: 'disponible'}, {estado: 'sinEntregar'}]})
        .then(data => {
            res.send(data);
            res.end();
        })
        .catch(error => {
            res.send(error);
            res.end();
        });
}