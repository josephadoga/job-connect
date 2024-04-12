'use strict';

import { listen, select } from './utils.js';

const login = select('.login');
const signup = select('.signup');
const userEmail = select('.email');
const userPassword = select('.password');
let invalid = select('.invalid');

signup.disabled = true;


const loginCredentials = [{ email: 'user@email.com', password: 'userpass' }];
localStorage.setItem('loginCredentials', JSON.stringify(loginCredentials));
const loginValues = JSON.parse(localStorage.getItem('loginCredentials'));