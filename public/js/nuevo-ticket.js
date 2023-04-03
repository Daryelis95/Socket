//Referencia html
const lblNuevoTicket = document.querySelector("#lblNuevoTicket");
const btnCrearTicket = document.querySelector("button");

//inciar socket
const socket = io();

//listen para saber si el usuario esta conectado

socket.on("connect", () => {
  btnCrearTicket.disabled = false;
});

//listen usuario desconectado
socket.on("disconnect", () => {
  btnCrearTicket.disabled = true;
});

//escuchar mensaje desde el servidor
socket.on('ultimo-ticket', ( ultimoTicket ) => {
    lblNuevoTicket.innerText = 'Ticket ' + ultimoTicket;
});


//emitir msj al servidor
btnCrearTicket.addEventListener("click", () => {
  socket.emit("siguiente-ticket", null, (ticket) => {
    lblNuevoTicket.innerText = ticket;
  });
});
