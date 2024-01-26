// variáveis/const do HTML
const validCadastro = document.querySelector('#valid-cadastro');

const btnValidar = document.getElementById('cadastrar');
const togglePasswordButton = document.getElementById('togglePassword');
const eyeIcon = togglePasswordButton.querySelector("i");

// expressão regular para validar o e-mail
let emailStandard = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// função para exibir e esconder a senha
togglePasswordButton.addEventListener('click', function () {
    password.type = password.type === 'password' ? 'text' : 'password';

    // remove as classes
    eyeIcon.classList.remove("fas", "fa-eye", "fa-eye-slash");

    if (password.type === 'password') {
        eyeIcon.classList.add("fas", "fa-eye"); // senha oculta
    } else {
        eyeIcon.classList.add("fas", "fa-eye-slash"); // senha visível
    }
});

// POST
const form = document.getElementById('form-api');
const url = 'http://localhost:3000/add'; // fake para teste

form.addEventListener('submit', evento => {
    evento.preventDefault();

    var name = document.getElementById('name').value;
    var lastname = document.getElementById('lastname').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    if (emailStandard.test(email) && password.length >= 8) {
        validCadastro.style.display = "flex";
    }
    else if (!emailStandard.test(email) || password.length < 8 || name === '' || lastname === '') {
        const icon = validCadastro.querySelector('i');
        const message = validCadastro.querySelector('p');

        validCadastro.style.display = "flex";
        validCadastro.style.backgroundColor = '#ee483ca5';
        icon.style.display = 'none';
        message.innerText = 'Revise os campos e tente novamente.';
        message.style.color = '#222244';


        // aguarda 1s para recarregar a página
        setTimeout(function () {
            location.reload();
        }, 1000); // 1s
        return false; // não envia o form
    }

    const valuesInputs = {
        firstName: name,
        lastName: lastname,
        email: email,
        password: password
    }

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(valuesInputs)
    }).then(res => res.json()).then(data => console.log(data))

})


