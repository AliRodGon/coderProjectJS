
const selectYear = document.querySelector('#year');
const selectMonth = document.querySelector('#month');
const nombreTitular = document.querySelector('.card-holder-input');
const numeroTarjeta = document.querySelector('.card-number-input');

const mesVencimiento = document.querySelector('.month-input');
const anioVencimiento = document.querySelector('.year-input');
const cvv = document.querySelector('.cvv-input');
const btnEnviar = document.querySelector('#btnEnviar');
const years = [2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];
const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
let tarjetaGuardada;

years.forEach(element => {
    let option = `<option>${element}</option>`
    selectYear.innerHTML += option;
});

months.forEach(element => {
    let option = `<option>${element}</option>`
    selectMonth.innerHTML += option;
});
numeroTarjeta.addEventListener('input', () => {
    document.querySelector('.card-number-box').innerText = numeroTarjeta.value;
});

cvv.oninput = () => {
    document.querySelector('.cvv-box').innerText = cvv.value;
}

cvv.onmouseenter = () => {
    document.getElementById("front").style.transform = 'perspective(1000px) rotateY(-180deg)';
    document.getElementById("back").style.transform = 'perspective(1000px) rotateY(0deg)';
}

cvv.onmouseleave = () => {
    document.getElementById("front").style.transform = 'perspective(1000px) rotateY(0deg)';
    document.getElementById("back").style.transform = 'perspective(1000px) rotateY(180deg)';
}

//En getInfo guardo la información de la tarjeta en el localStorage como objeto
//Llamo a esta función en el caso del sweet alert en el que el usuario
//da el ok a guardar sus datos.

function getInfo (){
    tarjetaGuardada={
        titular:nombreTitular.value,
        numeroTarjeta:numeroTarjeta.value, 
        mesVencimiento:mesVencimiento.value,
        anioVencimiento:anioVencimiento.value,
        cosigoSeguridad:cvv.value
    }    
console.log(tarjetaGuardada)
localStorage.setItem("tarjeta", JSON.stringify(tarjetaGuardada));
}


let submitButton=document.getElementById("btnEnviar")
btnEnviar.addEventListener("click",(e)=>{
    Swal.fire({
        title: "¿Quieres guardar los datos de tu tarjeta?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Ok, quiero que se guarden mis datos",
        denyButtonText: `Esta vez no`,
        customClass: {
            actions: 'my-actions',
            cancelButton: 'order-1 right-gap',
            denyButtonText: 'order-2'
        }
    }).then((result) =>{
        if (result.isConfirmed) {
            getInfo();
            Swal.fire('¡Tarjeta guardada!', '', 'success')
        } else if (result.isDenied) {
            Swal.fire('Los datos no han sido guardados', '', 'success')
        }
    })           
    e.preventDefault
});
