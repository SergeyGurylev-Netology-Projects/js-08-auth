initialize();

function initialize() {
    const welcomeElement = document.getElementById('welcome');
    const signinElement = document.getElementById('signin');

    const user_id = localStorage.user_id;
    if (user_id) {
        welcomeElement.classList.add('welcome_active');
        signinElement.classList.remove('signin_active');

        document.getElementById('user_id').innerText = user_id;
        document.getElementById('signout__btn').addEventListener('click', onClickSignoutBtn);
    } else {
        welcomeElement.classList.remove('welcome_active');
        signinElement.classList.add('signin_active');

        document.getElementById('signin__btn').addEventListener('click', onClickSigninBtn);
    }
}

function onClickSigninBtn(e) {
    e.preventDefault();

    const formSignin = document.forms['signin__form'];
    if (!formSignin.login.value.trim() || !formSignin.password.value.trim()) {
        alert('Не введен логин/пароль');
        return
    };

    const xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', e => {
        if (xhr.readyState === xhr.DONE) {
            const response = JSON.parse(xhr.responseText);
            if (response.success) {
                localStorage.user_id = response.user_id;
                initialize();
            } else {
                alert('Неверный логин/пароль');
            }
        }
    })

    xhr.open('POST', formSignin.getAttribute('action'), true);
    xhr.send(new FormData(formSignin));
}

function onClickSignoutBtn(e) {
    delete localStorage.user_id;
    document.forms['signin__form'].reset();
    initialize();
}