// variáveis/const do HTML
const btnValidar = document.getElementById('cadastrar');
const email = document.getElementById('email');
const password = document.querySelector('#password');
const validCadastro = document.querySelector('#valid-cadastro');
const togglePasswordButton = document.getElementById('togglePassword');
const eyeIcon = togglePasswordButton.querySelector("i");

// expressão regular para validar o e-mail
let emailStandard = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//função que exibe a mensagem de sucesso - deve enviar o formulário
btnValidar.addEventListener('click', function () {
    let emailValue = email.value;

    if (emailStandard.test(emailValue) && password.value.length >= 8) {
        validCadastro.style.display = "flex";
    } else {
        validCadastro.style.display = "none";
    }
});

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


