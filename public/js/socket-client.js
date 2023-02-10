//Cliente

//Referencias del html
const lbOnline   = document.querySelector('#lbOnline'); 
const lbOffline  = document.querySelector('#lbOffline');
const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar  = document.querySelector('#btnEnviar');

//Mantiene estado de la comunicacion con el servidor
// on (escuchar eventos)
//emit (emitir eventos)

const socket = io();

//listen para saber si el usuario esta conectado
socket.on('connect', () => {
    // console.log('Conectado');

    lbOffline.style.display = 'none'
    lbOnline.style.display = ''
});

//listen usuario desconectado
socket.on('disconnect', () => {
    console.log('Desconectado del servidor');
    lbOnline.style.display = 'none'
    lbOffline.style.display = ''
});


//escuchar mensaje desde el servidor
socket.on('enviar-mensaje', ( payload ) => {
    console.log(payload);
});


//emitir msj al servidor
btnEnviar.addEventListener('click', () => {
    const mensaje = txtMensaje.value;
    const payload = {
        nombre: 'Daryelis',
        apellido: 'Pinate',
        mensaje: mensaje
    }
    socket.emit( 'enviar-mensaje', payload, (id) => {
        console.log('desde el servidor', id);
    });
});