/**
 * Función para realizar los cálculos de la quincena y sus impuestos
 */
const calcular = function(){

    //Obtener los datos
    let cedula = document.getElementById("txtCedula").value;
    let nombre = document.getElementById("txtNombre").value;
    let apellido = document.getElementById("txtApellido").value;
    let horario = document.getElementById("cmbHorario");
    let dias = document.getElementById("txtDias").value;
    let horas = document.getElementById("txtHoras").value;


    //Validar los campos
    if(validarCampos(cedula, nombre, apellido, horario.value, dias, horas)){


        //========== CALCULOS ==========
        //Comprobar el tipo de horario y retornar su pago por hora
        // Diurno (1) -> 675 Bs/h
        // Vespertino (2) -> 700 Bs/h
        // Nocturno (3) -> 956.23 Bs/h
        let pagoHora = (horario.value == 1) ? 675 : ((horario.value == 2)? 700: 956.23);

        //Obtener las ganancias totales al mes
        let gananciaMes = pagoHora * dias * horas * 4;

        //Impuestos aplicar
        let descuentoAhorro;
        let seguroSocial;

        //Aplicar los impuestos más bajos
        if(gananciaMes < 85000){
            descuentoAhorro = 0.01;
            seguroSocial = 0.15;

        //Aplicar los impuestos medios
        } else if (gananciaMes <= 150000){
            descuentoAhorro = 0.15;
            seguroSocial = 0.20;

        //Aplicar los impuestos más altos
        } else if (gananciaMes > 150000){
            descuentoAhorro = 0.3;
            seguroSocial = 0.25;
        }

        //Obtener el sueldo mensual con los impuestos aplicados
        let sueldoMes = gananciaMes - (gananciaMes * descuentoAhorro * seguroSocial);



        //========== MOSTRAR EN PANTALLA LOS RESULTADOS ==========     
        //Obtener el div contenedor de los resultados
        const box = document.getElementById('sueldo-box');  
        //Vaciarlo siempre antes de mostrar los resultados
        box.innerText = "";

        //Barra separadora <hr> 
        const barra = document.createElement('hr');

        //Subtitulos <h3> para la inforamción, trabajo y sueldo 
        const informacion = document.createElement('h3');
        const trabajo = document.createElement('h3');
        const sueldo = document.createElement('h3');

        //Elementos <p> para la información del empleado    
        const pcedula = document.createElement('p');
        const pNombre = document.createElement('p');
        const pApellido = document.createElement('p');

        //Elementos <p> para la información del trabajo 
        const pTipoHorario = document.createElement('p');
        const pPagoHora = document.createElement('p');
        const pDiasSemanal = document.createElement('p');
        const pHorasDiarias = document.createElement('p');

        //Elementos <p> para el sueldo quincenal e impuestos    
        const pGananciasQuincenales = document.createElement('p');
        const pDescuentoAhorro = document.createElement('p');
        const pSeguroSocial = document.createElement('p');
        const pSueldoQuincenal = document.createElement('p');
        
        //VALORES EN LOS ELEMENTOS  
        informacion.innerText=`Información del empleado`;
        trabajo.innerText=`Información del trabajo`;
        sueldo.innerText=`Sueldo del empleado`;

        pcedula.innerText=`Cedula: ${cedula}`;
        pNombre.innerText=`Nombre: ${nombre}`;
        pApellido.innerText=`Apellido: ${apellido}`;

        pTipoHorario.innerText=`Tipo de horario: ${horario.options[horario.selectedIndex].text}`;
        pPagoHora.innerText=`Pago por hora: ${pagoHora} Bs`;
        pDiasSemanal.innerText=`Dias a la semana: ${dias} d`;
        pHorasDiarias.innerText=`Horas diarias: ${horas} h`;

        pGananciasQuincenales.innerText=`Ganancias quincenales: ${gananciaMes/2} Bs`;
        pDescuentoAhorro.innerText=`Descuentos del ahorro habitual: ${descuentoAhorro*100}%`;
        pSeguroSocial.innerText=`Descuentos del seguro social: ${seguroSocial*100}%`;
        pSueldoQuincenal.innerText=`Sueldo quincenal: ${sueldoMes/2} Bs`;
        
        //CLASES DE LOS ELEMENTOS   
        barra.className = "mv-40";
        pApellido.className = "mb-20";
        pHorasDiarias.className = "mb-20";

        //AGREGAR LOS ELEMENTOS 
        box.appendChild(barra);

        box.appendChild(informacion);
        box.appendChild(pcedula);
        box.appendChild(pNombre);
        box.appendChild(pApellido);

        box.appendChild(trabajo);
        box.appendChild(pTipoHorario);
        box.appendChild(pPagoHora);
        box.appendChild(pDiasSemanal);
        box.appendChild(pHorasDiarias);

        box.appendChild(sueldo);
        box.appendChild(pGananciasQuincenales);
        box.appendChild(pDescuentoAhorro);
        box.appendChild(pSeguroSocial);
        box.appendChild(pSueldoQuincenal);
    }

}

/**
 * Función para validar que los campos de texto NO estén vacíos
 * 
 * @param {Number} cedula 
 * @param {String} nombre 
 * @param {String} apellido 
 * @param {String} horario 
 * @param {number} dias 
 * @param {number} horas 
 * 
 * @returns TRUE si los campos no están vacíos
 */
const validarCampos = (cedula, nombre, apellido, horario, dias, horas) => {

    //========== VALIDAR LOS NÚMEROS ==========
    //Validar que la cédula esté dentro del rango correcto
    if(cedula < 1 || cedula > 99999999){
        //Si no está en el rango correcto, mandar mensaje de error
        alert(`La cédula ingresada es inválida.\nPor favor, vuelva a ingresarla`)
        //Enfocar el campo de la cédula
        document.getElementById("txtCedula").focus()
        //Retornar falso
        return false;
    }
    //Validar que los días de trabajo a la semana esté dentro de un rango correcto
    if(dias < 1 || dias > 7){
        alert(`Los días de trabajos a la semana son inválidos.\nPor favor, vuelva a ingresarla`)
        document.getElementById("txtDias").focus()
        return false;
    }

    //Validar que las horas de trabajo diarias estén dentro de un rango correcto
    if(horas < 1 || horas > 24){
        alert(`Las horas de trabajo diarias son inválidas.\nPor favor, vuelva a ingresarla`)
        document.getElementById("txtHoras").focus()
        return false;
    }

    //========== VALIDAR EL SELECT ==========
    if(horario == -1){
        alert(`Debe seleccionar un tipo de horario de trabajo.`)
        document.getElementById("cmbHorario").focus()
        return false;
    }


    //========== VALIDAR LOS NOMBRES ==========
    //Expresión regular que evalúa una cadena con el siguiente formato:
    // - Debe empezar con 1 letra mayúscula.
    // - Debe seguir con 1, o más letras, en minuscula, luego de la primera en mayuscula.
    // - Puede tener, o no, un espacio
    // - Lo anterior se puede hacer 1 o 2 veces
    let expresion = /^([A-Z]{1}[a-z]+){1,2}$/;

    //Validar que el nombre cumpla con la expresión regular
    if(!expresion.test(nombre)){
        //Si no está en el rango correcto, mandar mensaje de error
        alert(`El nombre no cumple con el formato de un nombre.\nPor favor, verifique su formato (Ex: Maria).`)
        //Enfocar el campo de la cédula
        document.getElementById("txtCedula").focus()
        //Retornar falso
        return false;
    }

    //Validar que el apellido cumpla con la expresión regular
    if(!expresion.test(apellido)){
        alert(`El apellido no cumple con el formato de un nombre.\nPor favor, verifique su formato (Ex: García).`)
        document.getElementById("txtApellido").focus()
        return false;
    }

    return true;
}