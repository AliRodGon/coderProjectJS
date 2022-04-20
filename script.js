const platos = [
    {
      id: 0,
      nombre: "Berenjena/Eggplant",
      clave: "Berenjena",
      precio: 4.5,
      categoria: "entrantes",
      imagen: "./img/BERENJENAS.jpg",
      cantidad: 0,
    },
    {
      id: 1,
      nombre: "Tortilla/Omelette",
      clave: "Pincho de tortilla",
      precio: 2.5,
      categoria: "entrantes",
      imagen: "./img/TORTILLA.jpg",
      cantidad: 0,
    },
    {
      id: 2,
      nombre: "Arroz blanco/White rice",
      clave: "Arroz",
      precio: 7.0,
      categoria: "principal",
      imagen: "./img/ARROZ.jpg",
      cantidad: 0,
    },
    {
      id: 3,
      nombre: "Boquerones/Anchovies",
      clave: "Boquerones",
      precio: 6.0,
      categoria: "principal",
      imagen: "./img/BOQUERONES.jpg",
      cantidad: 0,
    },
    {
      id: 4,
      nombre: "Ensalada de tomate y atun/Tomato and tuna salad",
      clave: "Ensalada",
      precio: 6.0,
      categoria: "principal",
      imagen: "./img/ENSALADA.jpg",
      cantidad: 0,
    },
    {
      id: 5,
      nombre: "Entrecot/Steak",
      clave: "Escalope",
      precio: 6.5,
      categoria: "principal",
      imagen: "./img/ENTRECOT.jpg",
      cantidad: 0,
    },
    {
      id: 6,
      nombre: "Fruta/Fruit",
      clave: "Fruta",
      precio: 1.0,
      categoria: "postre",
      imagen: "./img/FRUTA.jpg",
      cantidad: 0,
    },
    {
      id: 7,
      nombre: "Helado/Ice cream",
      clave: "Helado",
      precio: 2.0,
      categoria: "postre",
      imagen: "./img/HELADO.jpg",
      cantidad: 0,
    },
    {
      id: 8,
      nombre: "Cerveza/Beer",
      clave: "Cerveza",
      precio: 2.5,
      categoria: "bebida",
      imagen: "./img/CERVEZA.jpg",
      cantidad: 0,
    },
    {
      id: 9,
      nombre: "Café/Coffee",
      clave: "Agua con gas",
      precio: 1.5,
      categoria: "bebida",
      imagen: "./img/CAFE.jpg",
      cantidad: 0,
    },
  ];
  
  let platosPedidos = [];
  const idsPedidos = [];
  const ultimoPedido = [];
  let totalAPagar = [];
  let precioAcumulado = [];
  let nuevaCantidad;
  let menosCantidad;
  let nuevoPrecio=0;
  let precioRecalculado=0;
  let platoEliminado;
  let pedidoRecuperado;
  let usuario;
  let userName;
  let userValue;
  let passwordValue;

  function login() {
    (userName = document.getElementById("user").value),
    (userValue = document.getElementById("email").value),
    (passwordValue = document.getElementById("password").value);
  if (userValue == "") {
    Event.preventDefault();
  }
  if (passwordValue == "") {
    Event.preventDefault();
  }
  usuario = {
    nombre: userName,
    email: userValue,
    contrasena: passwordValue,
    ultimoPedido: [],
  };
  //Esto sólo se ejecuta la primera vez
  let datosUsuarios = JSON.parse(localStorage.getItem("datosUsuarios"));
  if (datosUsuarios == null) {
    datosUsuarios = [];
    datosUsuarios.push(usuario);
    localStorage.setItem("datosUsuarios", JSON.stringify(datosUsuarios));
    currentUser = localStorage.setItem("currentUser", JSON.stringify(usuario));
  }
}


//Esta funcion la utilizo para hacer aparecer y desaparecer varios botones a 
//lo largo del proceso(botón de pagar, botón de ver ultimo pedido...)
function cambiarEstadoVisibilidad(id){
  let elementoCambiante=document.getElementById(id)
  let estado=elementoCambiante.style.display=="block"  
  estado ?
  elementoCambiante.style.display="none"
  :
  elementoCambiante.style.display="block"
}


let divOcultarBoton=document.getElementById("cambiarVisibilidadBoton")
divOcultarBoton.style.display="none"
let divOcultarNutriInfo=document.getElementById("nutriInfo")
divOcultarNutriInfo.style.display="none"


  //Esta función hace desaparecer el formulario
function logged() {
     const wellcomeForm = document.getElementById("form1");
     wellcomeForm.remove();
}
  

function autenticar() {
    datosUsuarios = JSON.parse(localStorage.getItem("datosUsuarios"));
    currentUser = localStorage.setItem("currentUser", JSON.stringify(usuario));
    currentUser = JSON.parse(localStorage.getItem("currentUser"));
  
    for (let user of datosUsuarios) {
      if (
        user.email == currentUser.email &&
        user.contrasena == currentUser.contrasena
      ) {
        logged();
        hola();
        pintarPorDefectTodoElMenu();
        recalcularUltimoPedido();
      }
      if (
        user.email !== currentUser.email &&
        user.contrasena !== currentUser.contrasena
      ) {
        alert("Usuario o contraseña incorrectos");
        break;
      }
    }
  }
  
//Esta función introduce una bienvenida y un botón para ver el último pedido
function hola(e) {
    let saludo = document.getElementById("saludo-user");
    saludo.innerHTML = `<p class="saludo"> Hola ${userName}, repite un pedido anterior o elige platos nuevos</p>
      <button id="ultimo-pedido" type="button" class="btn btn-dark btn-lg w-60" name="ultimo-pedido">Ver último pedido</button>`;
  }
  let quitarBotonVerUltimo=document.getElementById("saludo-user")
  quitarBotonVerUltimo.style.display="block"
  //Este es el onclick que desencadena todo lo anterior y ejecuta pintarPorDefectTodoElMenu
  const submit = document.getElementById("submitClass");
  submit.addEventListener("click", () => {
    login();
    autenticar();
    cambiarEstadoVisibilidad("cambiarVisibilidadBoton")
    cambiarEstadoVisibilidad("nutriInfo")
  });
  
  //PINTAR PLATOS
  //Aquí pinto dinámicamente todos los platos del menú
  //utilizo su id para dar un valor único al botón "agregar"
  
  function pintarPorDefectTodoElMenu() {
    const contenedor = document.getElementById("cardContainer");
    platos.forEach((plato, index) => {
      let card = document.createElement("div");
  
      card.innerHTML = `
            <div id="${plato.clave}" class="individual-card">
                    <img class="imageDishes" src="${plato.imagen}" alt="icono de plato">
                <div class="card-body p-4 py-0 h-xs-440p">
                    <h5 class="card-title font-weight-semi-bold mb-3 w-xl-220p mx-auto">${plato.nombre}</h5>
                        <div id="precioContainer">
                        <p class="price"> Precio: ${plato.precio} € </p>
                        <p class="price" id="cantidadContainer ${plato.id}">Has pedido: 0</p>
                      
                    <button id="agregar${plato.id}" type="button" class="btn btn-dark btn-lg w-100" name="add-button">Agregar</button>
                    
                    </div>
                </div>
            `;
  
      contenedor.appendChild(card);
      let agregar = document.getElementById(`agregar${plato.id}`);
      agregar.addEventListener("click", () => {
        agregarPlato(plato.id);
        pintarCantidad();
      });


  
      function pintarCantidad() {
        const cantidadContainer = document.getElementById(
          `cantidadContainer ${plato.id}`
        );
        cantidadContainer.innerHTML = `<p class="price">Has pedido: ${nuevaCantidad}</p>`;
      }
    });
  }
  
  //AGREGAR PLATOS
  //Esta es la función que se dispara cuando el usuario clica el botón agregar y hace varias cosas:
  //1- comprueba si el array idsPedidos está ya el id únio ocido al botón agregar y:
  
  //a) si no lo encuentra entre los idsPedidos:
  //1- Pushea el id del plato a idsPedidos
  //2- Crea un nuevo objeto (newObject) que tiene las mismas carácteríscas que el objeto plato original
  //y lo pushea a "platosPedidos" para que esté disponible nivel global.
  //3- Pushea el precio del plato como valor numérico precioAcumulado.
  
  //b) si sí lo encuentra entre los idsPedidos:
  //1-lo reconoce como repetido, lo busca en platosPedidos y le agrega 1 a la cantidad.
  //con esto el array de platos pedidos no aumenta pero la cantidad sí
  
  function agregarPlato(platoId) {
    let repetido = idsPedidos.find((elemento) => elemento == platoId);
     console.log(platosPedidos);
    if (repetido !== undefined) {
      for (let i = 0; i < platosPedidos.length; i++) {
        if (platosPedidos[i].id == repetido) {
          platosPedidos[i].cantidad++;
          nuevaCantidad = platosPedidos[i].cantidad;
          totalAPagar.push(platosPedidos[i].precio);
        }
      }
    }
    if (repetido == undefined) {
      idsPedidos.push(platoId);
  
      for (let i = 0; i < platos.length; i++) {
        let newObject = {
          id: platos[i].id,
          nombre: platos[i].nombre,
          clave: platos[i].clave,
          precio: platos[i].precio,
          categoria: platos[i].categoria,
          imagen: platos[i].imagen,
          cantidad: 1,
        };
        if (platoId == platos[i].id) {
          // alert ("Has agregado " + newObject.clave + "\nPara ver el total y pagar, clica \"Pagar\" ");
          platosPedidos.push(newObject);
          totalAPagar.push(newObject.precio);
          nuevaCantidad = newObject.cantidad;
        }
      }
    }
  }
  //BOTÓN PAGAR
  //Aquí creo el botón "pagar" y le añado un event listener que dispara la función "pagar" cuando detecta el click del usuario
  let botonPagar = document.getElementById("pagar");
  botonPagar.addEventListener("click", () => pagar());
  


  //PAGAR
  //Esta función hace varias cosas:
  //1- Hace un "reduce" con todos los precios de totalAPagar y lo guarda en precioAcumulado como valor numérico
  //2- Llama a ejecutar cuatro fuciones:
  //a- quitarDiv1
  //b- quitarBotonPago
  //c- pintarPedido
  //d- pintarPrecioYConfirmar: crea un botón que muestra el precio total del pedido
  function pagar() {
    let precioAcumulado = totalAPagar.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
    nuevoPrecio = precioAcumulado //- nuevoPrecio;
    quitarBotonPago();
    pintarPedido(platosPedidos);
    cambiarEstadoVisibilidad("saludo-user")
  }
  //  quitarDiv1: Elimina el div que contiene todos los platos
  function quitardiv1() {
    let element = document.getElementById("cardContainer");
    element.style.display = "none";
  }
  //quitarBotonPago: elimina el botón de pago
  function quitarBotonPago() {
    let element2 = document.getElementById("pagar");
    element2.style.display = "none";
  }
  
  //pintarPedido: crea un div que pinta dinámicamente sólo los platos pedidos por el usuario. Además
  //cambia la funcionalidad el botón agregar, y lo convierte en botón "quitar", que lleva asociada la funcion quitarPlato
  function pintarPedido(platosAPintar) {
    quitardiv1();
    const pedidoContainer = document.getElementById("cardContainer2");
    console.log(platosPedidos);
    platosAPintar.forEach((plato, index) => {
      let card = document.createElement("div");
  
      card.innerHTML = `
              <div id="plato-pedido ${plato.id}" class="individual-card">
                  <img class="imageDishes" src="${plato.imagen}" alt="icono de plato">
              <div class="card-body p-4 py-0 h-xs-440p">
                  <h5 class="card-title font-weight-semi-bold mb-3 w-xl-220p mx-auto">${plato.nombre}</h5>
                  <p class="price"> Precio: ${plato.precio} </p>
                  <p class="price" id="cantidadResta ${plato.id}">Raciones pedidas: ${plato.cantidad} </p>
        
                  <button id="quitar${plato.id}" type="button" class="btn btn-dark btn-lg w-100" name="add-button">Quitar</button>
                  
              </div>
              </div>
              `;
      pedidoContainer.appendChild(card);
      pintarPrecioYConfirmar(nuevoPrecio);
          let botonQuitar = document.getElementById(`quitar${plato.id}`);
          
          botonQuitar.addEventListener("click", () => {  
            quitarPlato(plato.id);
            restaCantidad();
          });

     
        function restaCantidad() {

            console.log("restoCantidad")
        const cantidadContainer = document.getElementById(
          `cantidadResta ${plato.id}`
        );
        cantidadContainer.innerHTML = `<p class="price">Raciones pedidas: ${menosCantidad}</p>`;
  
        if (` ${menosCantidad}` == 0) {
          let eliminarCard = document.getElementById(`plato-pedido ${plato.id}`);
          eliminarCard.remove();
        }
  
        if (platosPedidos == 0) {
          const precioTotal = document.getElementById("precio_final");
          precioTotal.innerHTML = `
                <button type="button" class="btn btn-dark btn-lg w-100"> ¡Tu pedido esctá vacío!
                </button>
                `;
        }
      }
    });
  }

  //pintarPrecioYConfirmar: crea un botón que muestra el precio total del pedido.
  //también tiene un addEventListener que hace que que el pedido se guarde en Local Storage
  
  function pintarPrecioYConfirmar(param) {
    console.log(nuevoPrecio);
    console.log(param);
  
    const precioTotal = document.getElementById("precio_final");
    precioTotal.innerHTML = `
    <button id="confirmarPago"   class="btn btn-dark btn-lg w-100"> Confirmar pago: ${param} €</button>
    `;
    precioTotal.addEventListener("click", (e) => {
      actualizarUltimoPEdidoEnLocalStorage();
      Swal.fire({ 
          
          confirmButtonColor: '#8CD4F5',       
          title: "GRACIAS",
          type: "success",
          text: "Te redirigiremos a la pasarela de pago",
          button: "¡¡Vamos!!",    
     }).then (function() {
        window.location.href = "./card.html";
      })
      e.preventDefault;
    });
  }

  //Aquí es dónde guardo el ultimo pedido en el campo del objeto guardado en localStorage
  //primero en el current user y luego en el array de datosUsuarios
  
  function actualizarUltimoPEdidoEnLocalStorage() {
    let ultimoPedido = platosPedidos;
    localStorage.setItem("ultimoPedido", JSON.stringify(ultimoPedido));
    let pedidoAPushear = platosPedidos;
    currentUser = JSON.parse(localStorage.getItem("currentUser"));
    currentUser.ultimoPedido = pedidoAPushear;
    datosUsuarios = JSON.parse(localStorage.getItem("datosUsuarios"));

    console.log(currentUser.ultimoPedido) 
    for (let i = 0; i < datosUsuarios.length; i++) {
      if (datosUsuarios[i].email == currentUser.email) {
        console.log(datosUsuarios[i].email);
        datosUsuarios[i].ultimoPedido = currentUser.ultimoPedido;
        localStorage.setItem("datosUsuarios", JSON.stringify(datosUsuarios));
        ultimoPedido=currentUser.ultimoPedido 
      }
    }
 
  }
  
  //REVISAR Y CORREGIR PEDIDO
  //función quitarPlato hace varias cosas:
  //1- recorre los id de platosPedidos encuentra el asociado al botón "quitar" y:
  
  //a) Si la cantidad es mayor que 0:
  // - resta 1 ud. a cantidad.
  // - Ejecuta las funciones "restarImporte" y "pintarPrecioYConfirmar"
  
  //b) Cuando la cantdad llega a 0:
  // - vuelve a recorrer platosPedidos y averigua el índice del Id cuya cantidad se ha quedado a 0
  //    (aquí el indexOf no me funcionaba, pero con findIndex, sí va)
  // - guarda ese índice en eliminarObjetoDelArray y usa como primer parámetro en un splice.
  //el objeto se elimina del array.
  //También se elimina el id de idsPedidos usando el mimo procedimiento (pero aquí si me funcionaba el indexOf)
  
  function quitarPlato(platoId) {
    for (let i = 0; i < platosPedidos.length; i++) {
      if (platoId == platosPedidos[i].id) {
        if (platosPedidos[i].cantidad > 0) {
          platosPedidos[i].cantidad--;
          menosCantidad = platosPedidos[i].cantidad;
          restarImporte();
          pintarPrecioYConfirmar(nuevoPrecio);
        }
        if (platosPedidos[i].cantidad == 0) {
          for (let i = 0; i < platosPedidos.length; i++) {
            console.log(platosPedidos);
            if (platosPedidos[i].id == platoId) {
              console.log(idsPedidos);
              let eliminarObjetoDelArray = platosPedidos.findIndex(
                (itemPlatosPedidos) => itemPlatosPedidos.id == platoId
              );
              platosPedidos.splice(eliminarObjetoDelArray, 1);
              let eliminarIdDelArray = idsPedidos.indexOf(platoId);
              idsPedidos.splice(eliminarIdDelArray, 1);
              console.log(idsPedidos);
              console.log(eliminarObjetoDelArray);
              console.log(platosPedidos);
            }
          }
        }
      }
    }
  
    //Aquí resto el importe del plato eliminado al precio total y lo guardo como nuevoPrecio en string
    //(lo convierto en string porque sino, el 0 no me lo pintaba, no sé por qué)
    //ese nuevoPrecio es el parámetro que usa la función "pintarPrecioYConfirmar"
    function restarImporte(a, b) {
      for (let i = 0; i < platosPedidos.length; i++) {
        if (platoId == platosPedidos[i].id) {
          let precioADescontar = platosPedidos[i].precio;
          nuevoPrecio = nuevoPrecio - precioADescontar;
          return nuevoPrecio.toString();
        }
      }
    }
  }

  //Aquí recupero el ultimo pedido del usuario
  //recalculo su precio y se lo doy a nuevoPrecio para que el
   //botón de confirmar pago lo tenga disponible


  function recalcularUltimoPedido() {
    datosUsuarios = JSON.parse(localStorage.getItem("datosUsuarios"));
    currentUser = JSON.parse(localStorage.getItem("currentUser"));
    pedidoUsuarioRecuperado = datosUsuarios.find(
      (user) => user.email == currentUser.email
    );
    pedidoRecuperado = pedidoUsuarioRecuperado.ultimoPedido;
    console.log(pedidoRecuperado);
  let totalPrecioRecuperado = [];
  pedidoRecuperado.forEach((element) => {
    let recalcular = element.cantidad * element.precio;
    totalPrecioRecuperado.push(recalcular);
  });
  console.log(totalPrecioRecuperado);
  let precioUltimoPedidoRecalculado = totalPrecioRecuperado.reduce(
    (accumulator, currentValue) => {
      return accumulator + currentValue;
    },
    0
  );
  console.log(precioUltimoPedidoRecalculado)
  precioRecalculado = precioUltimoPedidoRecalculado;

  const visualizarUltimo = document.getElementById("saludo-user");
  visualizarUltimo.addEventListener("click", () => { 
     platosPedidos=pedidoRecuperado;
     recalcularUltimoPedido();
     pintarPedido(pedidoRecuperado);
     quitarBotonPago();
     pintarPrecioYConfirmar(precioRecalculado);
    //limpiarInfo("cardContainer2")
  });

}





  