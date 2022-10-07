

let deck = [];
const tipos = ['C', 'D', 'H','5'];
const especiales = ['A', 'J', 'Q','K'];


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
    const carta = deck.pop;
    return carta;
}

//Pedir carta();
const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return (isNaN ( valor )) ?
            (valor === 'A') ? 11 : 10
            : valor * 1;
}

//evenetos
 
btnPedir.addEventListener('click', () => {

    const carta = pedirCarta();
    console.log(carta);

})