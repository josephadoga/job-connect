'use strict';

// import { listen, select } from "./utils.js";

function listen(event, selector, callback) {
  return selector.addEventListener(event, callback);
}
  
function select(selector) {
  return document.querySelector(selector);
}
  
const fileDetail = select('.file-detail');
const postImage  = select('.post-image');
const profileImg = select('.profile');
const postButton = select('.post');
const postSection = select('.display-post')
const textArea = select('textarea');

const now = new Date();
let isVisible = false;
let imageSrc;

listen('change', postImage, () => {
  let fileName = postImage.files[0].name;
  fileDetail.textContent = fileName;
});

function clearInputs() {
  textArea.value = '';
  postImage.value = '';
  fileDetail.textContent = '';
}

function makeImage() {

  (postImage.files[0]) ? imageSrc = 
  `
  <figure>
    <img src="${URL.createObjectURL(postImage.files[0])}" class="posted-image">
  </figure>
  `: imageSrc = '';
}

function makePost() {
  makeImage()

  if (textArea.value === '' && imageSrc === '') {
    return;
  } else {
    const newPost = document.createElement('div');
    postSection.appendChild(newPost);
    newPost.className = `the-post data`;
    newPost.innerHTML += `
    <header class="post-header flex space-between">
      <div class="flex gap-15">
        <figure>
          <img src="./assets/img/profile.jpg" class="profile">
        </figure>
        <h3>John Doe</h3>
      </div>
      <p>${now.toDateString().split(' ').slice(1).join(' ')}</p>
    </header>
    <p>${textArea.value}</p>
    ${imageSrc}
    `
  }
}

listen('click', postButton, () => {
  makePost();
  clearInputs();
});

const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/JSON; charset=UTF-8' },
    mode: 'cors'
}


const URL = `https://randomuser.me/api/?nat=CA&results=10&seed=same`;

async function getUsers(endpoint) {
    try {
        const result = await fetch(endpoint, options);

        if(!result.ok) {
            throw new Error(`${result.statusText} (${result.status})`);
        }

        const data = await result.json();
        console.log(data.results);
    } catch(error) {
        console.log(error.message);
    }
}

getUsers(URL);