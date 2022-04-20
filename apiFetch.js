const apiKey = "yAn2NMM1wxSv8YsVgjs2BQb78qVqC4VgdIuYLTMc";
let userQuery;
let informacionPlatos = [];
let datosNutricionales = [];
let firstInUpperCase;
console.log(datosNutricionales);

//getInfo llama a la API de calorieNinjas y le pasa el valor de
//búsqueda obtenido del formulario. La API devuelve todos los elementos del
//userQuery (si son varios,trae varios)
//Por cada elemeto que recibe monta un objeto nuevo con la información que
//necesito y lo pushea a datosNutricionales para que esté disponible a
//nivel global
//luego llama a pintarInfoNutricional
//y resetea datosNutricionales a un array vacío

async function getInfo() {
  const response = await fetch(
    `https://api.calorieninjas.com/v1/nutrition?query=${userQuery}`,
    {
      method: "GET",
      headers: {
        "X-Api-Key": "yAn2NMM1wxSv8YsVgjs2BQb78qVqC4VgdIuYLTMc",
      },
    }
  );
  const data = await response.json();
  informacionPlatos = data.items;

  informacionPlatos.forEach((item, i) => {
    let newInfoObject = {
      nombre: data.items[i].name,
      calorias: data.items[i].calories,
      hidratos: data.items[i].carbohydrates_total_g,
      proteina: data.items[i].protein_g,
      grasas: data.items[i].fat_total_g,
      fibra: data.items[i].fiber_g,
      potasio: data.items[i].potassium_mg,
      sodio: data.items[i].sodium_mg,
      azucar: data.items[i].sugar_g,
    };
    
    datosNutricionales.push(newInfoObject);
    
  });
  pintarInfoNutricional(datosNutricionales);
  datosNutricionales = [];
}




//Este addEventListener está puesto en el botón de buscar y
//captura el input y lo almacena en userQuery
//invoca a getInfo
//resetea input de búsqueda a un string vacío

const getNutriInfo = document.getElementById("infoNutricional");
getNutriInfo.addEventListener("click", () => {
  userQuery = document.getElementById("platoInfo").value;
  getInfo();
  document.getElementById("platoInfo").value = "";
});


//limpiarInfo vacía el div de los alimentos que se han buscado
//y resetea datos datosNutricionales a un array vacío
function limpiarInfo(id) {
  console.log("limpio limpio")
  const antiguasTarjetas = document.getElementById(id);
  while (antiguasTarjetas.firstChild) {
    antiguasTarjetas.removeChild(antiguasTarjetas.firstChild);
  }
  console.log(datosNutricionales);
  datosNutricionales = [];
}

//Aquí pongo un addEventListener que escucha del botón "Limpiar" y
//invoca a limpiarInfo()
//y resetea el input de búasqueda a un string vacío
const clearNutriInfo = document.getElementById("limpiarInfo");
clearNutriInfo.addEventListener("click", () => {
  limpiarInfo("tarjetaContainer");
  document.getElementById("platoInfo").value = "";
});


function toUpper(word){
    console.log("hey".charAt(0).toUpperCase())
    let firstUpper=word.charAt(0).toUpperCase()
    let restOfWord=word.substr(1,[word.length])
    word=firstUpper+restOfWord
    console.log(firstUpper)
    console.log(restOfWord)
    firstInUpperCase=word
}

//función recibe un array y por cada elemento de ese array crea
//un div con la información del elemento y lo pinta en el DOM
function pintarInfoNutricional(element) {
    const datosAlmentarios = document.getElementById("tarjetaContainer");
    console.log(datosNutricionales);
    element.forEach((item, i) => {
        let newName=item.nombre
        toUpper(newName)
    let tarjetaContainer = document.createElement("div");
    tarjetaContainer.innerHTML = `
        <div id="tarjetaIndividual" class="tarjetaIndividual" >
            <div id="titleTarjeta" class="titleTarjeta"
                <h5 class="card-title">${firstInUpperCase}, 
                por 100 gramos:</h5>
            </div>
            <div id="bodyTarjeta" class="bodyTarjeta">
                <p class="info"> Calorías: ${item.calorias} </p>
                <p class="info"> Hidratos de carbono: ${item.hidratos} g</p>
                <p class="info"> Proteinas: ${item.proteina} g</p>
                <p class="info"> Grasas: ${item.grasas} g</p>
                <p class="info"> Fibra alimentaria: ${item.fibra} </p>
                <p class="info"> Potasio: ${item.potasio} mg </p>
                <p class="info"> Sodio: ${item.sodio} mg</p>
                <p class="info"> Azúcar: ${item.azucar} g</p> 
            </div>
            </div>
        `;
    datosAlmentarios.appendChild(tarjetaContainer);
  });
}
