const miModulo =(() => {
  "use strict";

  let deck = [];
  const tipos = ["C", "D", "H", "S"],
   especiales = ["A", "J", "Q", "K"];

  let puntosJugadores = [];

  //referencias del HTML
  const divCartasJugadores = document.querySelectorAll(".divCartas"),
   persona = document.querySelectorAll("small");
   
   const btnPedir = document.querySelector("#btnPedir"),
   btnDetener = document.querySelector("#btnDetener"),
   btnNuevo = document.querySelector("#btnNuevo");
   
   //Esta funcion inicializa el juego
   const inicializarJuego = ( numJugadores = 2) =>{
       deck = crearDeck();

       puntosJugadores = [];
       for( let i = 0; i < numJugadores; i++){
        puntosJugadores.push(0);
       }

       persona.forEach(elem => elem.innerText = 0);
       divCartasJugadores.forEach(elem => elem.innerHTML = '');
   
       btnDetener.disabled = false;
       btnPedir.disabled = false;
   }
  //Esta funcion crea una nueva baraja
  const crearDeck = () => {
    deck = [];
    for (let i = 2; i <= 10; i++) {
      for (let tipo of tipos){
       deck.push(i + tipo);
      }
    }

    for (let tipo of tipos) {
      for (let esp of especiales) {
        deck.push(esp + tipo);
      }
    }
    return _.shuffle(deck);;
  };


  //esta funcion me permite tomar una carta
  const pedirCarta = () => {
    if (deck.length === 0) {
      throw "No hay cartas en el deck";
    }
     
    return deck.pop();
  }

  //Esta funcion sirve para obtener el valor de la carta
  const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
  }
  //turno 0 = primer jugador y el ultimo sera la computadora

  //acumular puntos
  const acumularPuntos = (carta, turno) =>{
    puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
    persona[turno].innerText = puntosJugadores[turno];
    return puntosJugadores[turno];
  }

  const crearCarta= (carta, turno) => {
    const imagen = document.createElement("img");
      imagen.src = `assets/cartas/${carta}.png`;
      imagen.classList.add("carta");
      divCartasJugadores[turno].append(imagen);
  }

  const determinarGanador = () =>{
    const  [puntosMinimos, puntosComputadora] = puntosJugadores;
    setTimeout(() => {
        if (puntosComputadora === puntosMinimos) {
          alert("Nadie gana");
        } else if (puntosMinimos > 21) {
          alert("Computadora gana");
        } else if (puntosComputadora > 21) {
          alert("Jugador gana");
        } else {
          alert("Computadora gana!");
        }
      }, 100);

  }
  //turno de la computadora
  const turnoComputadora = (puntosMinimos) => {
    let puntosComputadora = 0;
    do {
      const carta = pedirCarta();
      puntosComputadora = acumularPuntos(carta,puntosJugadores.length - 1);
      crearCarta(carta,puntosJugadores.length - 1);
    } while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );
    determinarGanador();
  }

  //evento para pedir carta y mostrar el resultado
  btnPedir.addEventListener("click", () => {

    const carta = pedirCarta();
    const puntosJugador = acumularPuntos( carta, 0 );

    crearCarta(carta,0);

    if (puntosJugador > 21) {
      alert("Lo siento mucho, perdiste.");
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);

    } else if (puntosJugador === 21) {
      alert("Llegaste a 21 puntos, genial!");
      btnPedir.disabled   = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);
    }

  });

  btnDetener.addEventListener("click", () => {
    btnDetener.disabled = true;
    btnPedir.disabled = true;
    turnoComputadora(puntosJugadores[0]);
  });

  return {
        nuevoJuego: inicializarJuego
  };
})();
