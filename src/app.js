function createElement(anime){
  const list = document.createElement('ul');
  list.classList.add('list');
  list.classList.add('list__random');
  list.innerHTML = `<li class="list__item"><img src="${anime.image}"></li>
  <li class="list__item">${anime.title}</li>
  <li class="list__item">${anime.titleJapanese}</li>
  <li class="list__item">${anime.synopsis}</li>
  <li class="list__item"><a class="link" href="${anime.url}" target="_blank">MyAnimeList</a></li>
  `
  const content = document.querySelector('.content');
  content.prepend(list);
}

const button = document.querySelector('.button');
button.addEventListener('click', () => {
  getRandomAnime();
  clear();
  createHistory();
  showButton.classList.remove('hidden');
});

const historyData = [];
function animeObject (json) {
  const title = json.title;
  const image = json.images.jpg.image_url
  const titleJapanese = json.title_japanese
  const synopsis = json.synopsis
  const url = json.url
  const anime = {title, image, titleJapanese, synopsis, url};
  console.log(anime);
  historyData.push(anime);
  console.log(historyData)
  createElement(anime);
  
}


function createHistory (){
  const list = document.createElement('ul');
  list.classList.add('list');
  list.classList.add('list_history');
  let data = historyData[historyData.length - 1];
  list.innerHTML = `
  <li class="list__item history_item">${data.title}</li>
  <li class="list__item history_item"><a class="link" href="${data.url}" target="_blank">MyAnimeList</a></li>
  `;
  const history = document.querySelector('.history');
  history.prepend(list);
 
}


const showButton = document.querySelector('.show_history');
const history = document.querySelector('.history')
showButton.addEventListener('click', () => {
  history.classList.toggle('hidden');
  const arrow = document.getElementById('Capa_1');
  arrow.classList.toggle('capa_1')
});

async function getRandomAnime() {
  try{
    const data = await fetch("https://api.jikan.moe/v4/random/anime");
    const json = await data.json();
    animeObject(json.data);
  }catch(error){
    console.log(error.message);
  }
};





function clear () {
  const delet = document.querySelectorAll('.content')[0];  
  delet.innerHTML = '';
}