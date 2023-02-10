const express = require('express');
const cors = require('cors');
const { socketController } = require('../sockets/controller');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //socket io
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);

        //configuracion de socket
        this.sockets();

        this.path = {};

        //middleware
        this.middleware();
    }

    middleware () {

        //cors
        this.app.use(cors());
        //public static
        this.app.use(express.static('public'));
    }

    routes () {
        //this.app.use(this.paths.auth, require('../routes/auth'));
    }

    sockets() {
        this.io.on('connection', socketController)
    }

    listen () {
        this.server.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        })
    }
}

module.exports = Server;
