//Referencia html
const lblEscritorio = document.querySelector("h1");
const lblTicket = document.querySelector("small");
const btnAtenderTicket = document.querySelector("button");
const divAlert = document.querySelector(".alert");
const lblPendientes = document.querySelector("#lblPendientes");
// solo funciona UTLSEARCH para navegador chrome
const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has("escritorio")) {
  window.location = "index.html";
  throw new Error("El escritorio es obligatorio");
}

const escritorio = searchParams.get("escritorio");
lblEscritorio.innerText = escritorio;

divAlert.style.display = "none";
//inciar socket
const socket = io();

//listen para saber si el usuario esta conectado

socket.on("connect", () => {
  btnAtenderTicket.disabled = false;
});

//listen usuario desconectado
socket.on("disconnect", () => {
  btnAtenderTicket.disabled = true;
});

//escuchar mensaje desde el servidor
socket.on('ticket-pendientes', (payload) => {
  lblPendientes.innerText = payload;
})

//emitir msj al servidor
btnAtenderTicket.addEventListener("click", () => {
  socket.emit("atender-ticket", { escritorio }, ({ ok, msg, ticket }) => {
    if (!ok) {
      lblTicket.innerText = 'Nadie.';

      return (divAlert.style.display = "");
    }

    lblTicket.innerText = `Ticket ${ticket.numero}`;
  });
});
