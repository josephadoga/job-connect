'use strict';

function listen(event, selector, callback) {
  return selector.addEventListener(event, callback);
}
  
function select(selector) {
  return document.querySelector(selector);
}

const login = select('.login');
const signup = select('.signup');
const userEmail = select('.email');
const userPassword = select('.password');


signup.disabled = true;


const loginCredentials = [{ email: 'user@email.com', password: 'userpass' }];
localStorage.setItem('loginCredentials', JSON.stringify(loginCredentials));
const loginValues = JSON.parse(localStorage.getItem('loginCredentials'));

function userInput() {
  const email = userEmail.value.trim();
  const password = userPassword.value.trim();
  return { email, password };
}

function validateInput(email, password, loginValues) {
  let message = '';
  let valid = true;

  loginValues.some(values => {
    const validEmail = values.email;
    const validPassword = values.password;

    message +=
      email.length === 0 && password.length === 0 ? 'Email and password are required' : 
      email.length === 0 ? 'Email is required' : 
      password.length === 0 ? 'Password is required' : 
      email !== validEmail ? 'Your username is incorrect' : 
      password !== validPassword ? 'Your password is incorrect' :
      '';

    valid =
      email.length === 0 || password.length === 0 || email !== validEmail || password !== validPassword
        ? false : true;
    return valid;
  });
  return { valid, message };
}

function displayMessage(message) {
  const invalid = select('.invalid');
  invalid.innerHTML = `*${message}`;
  invalid.classList.add('visible');
}

function validate() {
  const { email, password } = userInput();
  const loginValues = JSON.parse(localStorage.getItem('loginCredentials'));
  const { valid, message } = validateInput(email, password, loginValues);

  if (!valid) {
    displayMessage(message);
  } else {
    userEmail.value = '';
    userPassword.value = '';
    window.location.replace("home.html");
  }
}

listen('click', login, () => {
  validate();
});

listen('reload', window, () => {
  userEmail.value = '';
  userPassword.value = '';
});

listen('focus', userEmail, () => {
  userEmail.classList.add('focus');
});

listen('blur', userEmail, () => {
  userEmail.classList.remove('focus');
});

listen('focus', userPassword, () => {
  userPassword.classList.add('focus');
});

listen('blur', userPassword, () => {
  userPassword.classList.remove('focus');
});