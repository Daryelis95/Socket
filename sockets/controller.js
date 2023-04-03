const TicketController = require("../models/ticketController");

const ticketController = new TicketController();

const socketController = (socket) => {
  // console.log('Cliente conectado', socket.id );

  // socket.on('disconnect', () => {
  //     console.log('Cliente desconectado', socket.id );
  // });

  //emitir evento al cliente (enviar ultimo ticket)
  socket.emit("ultimo-ticket", ticketController.ultimo);
  socket.emit("estado-actual", ticketController.ultimoCuatro);

  //tikect pendientes
  socket.emit('ticket-pendientes', ticketController.ticketList.length);
  socket.broadcast.emit('ticket-pendientes', ticketController.ticketList.length);
  
  socket.on("siguiente-ticket", (payload, callback) => {
    const siguiente = ticketController.siguiente();
    callback(siguiente);
    socket.broadcast.emit('ticket-pendientes', ticketController.ticketList.length);
  });

  //escuchar evento del cliente (atender ticket)
  socket.on("atender-ticket", ({ escritorio }, callback) => {
    if (!escritorio) {
      return callback({
        ok: false,
        msg: "El escritorio es obligatorio.",
      });
    }
    
    const ticket = ticketController.atenderTicket( escritorio );
    socket.broadcast.emit( 'estado-actual', ticketController.ultimoCuatro );
    socket.emit('ticket-pendientes', ticketController.ticketList.length);
    socket.broadcast.emit('ticket-pendientes', ticketController.ticketList.length);

    if (!ticket) {
        callback({
            ok: false,
            msg: 'Ya no hay tickets pendientes.'
        })
    } else {
        callback({
            ok: true,
            ticket
        })
    }
  });
};

module.exports = {
  socketController,
};
