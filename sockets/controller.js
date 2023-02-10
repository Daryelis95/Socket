
const socketController = (socket) => {

    console.log('Cliente conectado', socket.id);

    // evento al desconectar
    socket.on('disconnet', () => {
        console.log('Cliente desconectado', socket.id);
    })

    //escuchar msj del cliente
    socket.on('enviar-mensaje', (payload, callback) => {
        // console.log(`mensaje del cliente recibido en el servidor: ${payload.mensaje}`);

        const id = 1234;
        callback(id);

        //emitir evento a todos los clientes
        socket.broadcast.emit('enviar-mensaje', payload); 
    })
}

module.exports = {
    socketController
}