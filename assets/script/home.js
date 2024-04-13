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
const logOut = select('.log-out');
const userList = select('.userList');
const peopleSection = select('.people-section');


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
      <p class="post-talk">${textArea.value}</p>
    ${imageSrc}
    <div class="actions flex">
      <p><i class="fa-regular fa-thumbs-up"></i>  Like</p>
      <p><i class="fa-solid fa-comment"></i>  Comment</p>
      <p><i class="fa-solid fa-share-from-square"></i>  Share</p>
    </div>
    `
  }
}

listen('click', postButton, () => {
  makePost();
  clearInputs();
});

listen('click', postButton, () => {
  makePost();
  clearInputs();
});

const options = {
  method: 'GET',
  headers: { 'Content-Type': 'application/JSON; charset=UTF-8' },
  mode: 'cors'
}


const Link = `https://randomuser.me/api/?nat=CA&results=10`;

async function getUsers(endpoint) {
  try {
    const response = await fetch(endpoint, options);

    if(!response.ok) {
      throw new Error(`${response.statusText} (${response.status})`);
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(error.message);
  }
}

async function setRandomUsers() {

  const users = await getUsers(Link);

  users.forEach(user => {
    console.log(user.name.last);
    const newDiv = document.createElement('div');
    newDiv.className = `user-list flex space-between`;
    peopleSection.appendChild(newDiv);
    newDiv.innerHTML = `
    <div class="flex gap-10">
      <figure>
        <img src="${user.picture.medium}" class="profile" id="profile">
      </figure>
      <div>
        <p>${user.name.first} ${user.name.last}</p>
        <span>${user.location.city}</span>
      </div>
    </div>
    <div class="user-icon">
      <i class="fas fa-user-plus"></i>
    </div>
    `
  });
}

listen('load', window, () => {
  setRandomUsers();
});

listen('click', logOut, () => {
  window.location.replace('index.html');
});
