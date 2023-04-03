const path = require("path");
const fs = require("fs");

class Ticket {
  constructor(numero, escritorio) {
    this.numero = numero;
    this.escritorio = escritorio;
  }
}

class TicketController {
  constructor() {
    this.ultimo = 0;
    this.hoy = new Date().getDate();
    this.ticketList = [];
    this.ultimoCuatro = [];

    this.init();
  }

  get toJson() {
    return {
      ultimo: this.ultimo,
      hoy: this.hoy,
      ticketList: this.ticketList,
      ultimoCuatro: this.ultimoCuatro,
    };
  }

  init() {
    const {
      ultimo,
      hoy,
      ticketList,
      ultimoCuatro,
    } = require("../db/data.json");
    if (hoy === this.hoy) {
      this.ultimo = ultimo;
      this.ticketList = ticketList;
      this.ultimoCuatro = ultimoCuatro;
    } else {
      //es otro dia
      this.guardarDB();
    }
  }

  guardarDB() {
    //armar ruta de archivo para almacenamiento de dato
    const dbPath = path.join(__dirname, "../db/data.json");
    fs.writeFileSync(dbPath, JSON.stringify(this.toJson));
  }

  siguiente() {
    this.ultimo +=1;
    const ticket = new Ticket(this.ultimo, null);
    this.ticketList.push(ticket);

    this.guardarDB();

    return 'Ticket ' + ticket.numero;
  }

  atenderTicket( escritorio ) {

    //no hay ticket
    if (this.ticketList.length === 0) {
      return null;
    }

    //obtener primer ticket y sacar de la lista
    const ticket = this.ticketList.shift(); // this.ticketList[0]
    // console.log(ticket)
    ticket.escritorio = escritorio;

    //agregar a ultimos4
    this.ultimoCuatro.unshift(ticket);

    if (this.ultimoCuatro.length > 4) {
      console.log(this.ultimoCuatro)
        this.ultimoCuatro.splice(-1, 1); //remover del array el ultimo elemento
    }

    this.guardarDB();

    return ticket;
  }
}

module.exports = TicketController;
