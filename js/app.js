document.addEventListener('DOMContentLoaded', function () {

    const email = {
        email: '',
        cc: '',
        asunto: '',
        mensaje: ''
    }
    //seleccionar los elementos de la interfaz
    const inputEmail = document.querySelector('#email');
    const inputCc = document.querySelector('#cc');
    const inputAsusnto = document.querySelector('#asunto');
    const inputMsg = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');

    //limpiar los campos de previos ingresos de texto
    reiniciarObjMail();

    //Registrar los eventos
    inputCc.addEventListener('blur', validar);
    inputEmail.addEventListener('blur', validar);//se puede poner input en vez de blur
    inputAsusnto.addEventListener('blur', validar);
    inputMsg.addEventListener('blur', validar);
    btnReset.addEventListener('click', function (e) {
        e.preventDefault();
        //reiniciar el obj email
        reiniciarObjMail();
    })
    formulario.addEventListener('submit', enviarEmail);

    function validar(e) {

        if (e.target.id === 'cc' && !validarEmail(e.target.value) && e.target.value.trim() !== '') {
            mostrarAlerta('El email no es válido', e.target.parentElement);
            console.log(email);
            return;
        }
        if (e.target.id === 'cc' && e.target.value.trim() === '') {
            email[e.target.name] = '';
            console.log(email);
        }
        if (e.target.id === 'cc' && validarEmail(e.target.value) && e.target.value.trim() !== '') {
            email[e.target.name] = e.target.value.trim().toLowerCase();
            comprobarEmail();
            console.log(email);
        }
        //detectar campo vacio
        if (e.target.value.trim() === '' && e.target.id !== 'cc') {

            mostrarAlerta(`El Campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        //comprobar datos de email
        if (e.target.id === 'email' && !validarEmail(e.target.value)) {
            mostrarAlerta('El email no es válido', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        limpiarAlerta(e.target.parentElement);

        //Asignar los valores de los campos
        email[e.target.name] = e.target.value.trim().toLowerCase();
        comprobarEmail();

    }

    function mostrarAlerta(mensaje, reference) {
        limpiarAlerta(reference);
        const error = document.createElement('P');
        error.classList.add('font-bold', 'text-red-600');
        error.textContent = mensaje;
        reference.appendChild(error);
    }
    function limpiarAlerta(ref) {
        const alerta = ref.querySelector('.text-red-600');
        if (alerta) {
            alerta.remove();
        }
    }

    function validarEmail(mail) {
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(mail);
        return resultado;
    }

    function comprobarEmail() {
        if (email.email === '' || email.asunto === '' || email.mensaje === '') {
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
        } else {
            btnSubmit.classList.remove('opacity-50');
            btnSubmit.disabled = false;
        }
    }

    function enviarEmail(e) {
        e.preventDefault();
        spinner.classList.add('flex');
        spinner.classList.remove('hidden');
        setTimeout(() => {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');
            //reiniciar el obj email
            reiniciarObjMail();
            //crear alerta de envio
            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
            alertaExito.textContent = 'Mensaje enviado correctamente';
            formulario.appendChild(alertaExito);
            setTimeout(() => {
                console.log(email);
                alertaExito.remove();
            }, 3000);
        }, 3000);

    }

    function reiniciarObjMail() {
        email.email = '';
        email.cc = '';
        email.asunto = '';
        email.mensaje = '';
        formulario.reset();
        comprobarEmail();
    }

});

