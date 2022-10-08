

let deck = [];
const tipos = ['C', 'D', 'H','5'];
const especiales = ['A', 'J', 'Q','K'];

let puntosJugador = 0,
    puntosComputadora = 0;

const divCartasJugador = document.querySelector('#jugador-cartas')
const divCartasComputadora = document.querySelector('#computadora-cartas')
const persona = document.querySelectorAll('small');
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');


//Esta funcion crea una nueva baraja
const crearDeck = () =>{

    for (let i = 2; i <=10; i++) {
       for(let tipo of tipos)
        deck.push(i+ tipo);
    }
    
    for (const tipo of tipos) {
        for(let esp of especiales){
            deck.push(esp + tipo);
        }
    }
    deck = _.shuffle(deck);
    return deck;
}

crearDeck();

//esta funcion me permite tomar una carta
const pedirCarta = () => {
    if(deck.length === 0){
        throw 'No hay cartas en el deck';
    }
    const carta = deck.pop();
    return carta;
}

//Pedir carta();
const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return (isNaN ( valor )) ?
            (valor === 'A') ? 11 : 10
            : valor * 1;
}

//turno de la computadora
const turnoComputadora = (puntosMinimos) => {
    do{
        const carta = pedirCarta();
        puntosComputadora = puntosComputadora + valorCarta(carta);
        persona[1].innerText = puntosComputadora;
        const imagen = document.createElement('img');
        imagen.src = `assets/img/${carta}.png`;
        imagen.classList.add('carta');
        divCartasComputadora.append(imagen);
        if(puntosMinimos > 21){
            break;
        }
    }while((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

    setTimeout(() => {
        if(puntosComputadora === puntosMinimos){
            alert('Nadie gana');
        }else if(puntosMinimos > 21 ){
            alert('Computadora gana');
        }else if (puntosComputadora > 21){
            alert('Jugador gana');
        }else{
            alert('Computadora gana!');
        }
    }, 100);
}

//evento para pedir carta y mostrar el resultado
btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);
    persona[0].innerText = puntosJugador;
    const imagen = document.createElement('img');
    imagen.src = `assets/img/${carta}.png`;
    imagen.classList.add('carta');
    divCartasJugador.append(imagen);
    if( puntosJugador > 21){
        alert('Lo siento mucho, perdiste.')
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador);
    }else if (puntosJugador === 21){
        alert('Llegaste a 21 puntos, genial!')
    }
});
btnDetener.addEventListener('click', () => {
        btnDetener.disabled = true;
        btnPedir.disabled = true;
        turnoComputadora( puntosJugador);
});
btnNuevo.addEventListener('click', () => {
        deck = [];
        deck = crearDeck();

        puntosJugador = 0;
        puntosComputadora = 0;

        persona[0] = 0;
        persona[1] = 0;

        divCartasJugador.innerHTML = '';
        divCartasComputadora.innerHTML = '';

        btnDetener.disabled = false;
        btnPedir.disabled = false;
       
        
});

