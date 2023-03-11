function createElement(anime){
  const list = document.createElement('ul');
  list.classList.add('list');
  list.innerHTML = `<li class="list__item"><img src="${anime.image}"></li>
  <li class="list__item">${anime.title}</li>
  <li class="list__item">${anime.titleJapanese}</li>
  <li class="list__item">${anime.synopsis}</li>
  <li class="list__item"><a class="link" href="${anime.url}" target="_blank">MyAnimeList</a></li>
  <li class="list__item list_button"></li>
  `
  const content = document.querySelector('.content');
  content.prepend(list);
}

const button = document.querySelector('.button');
button.addEventListener('click', () => {
  getRandomAnime();
});


function animeObject (json) {
  const title = json.title;
  const image = json.images.jpg.image_url
  const titleJapanese = json.title_japanese
  const synopsis = json.synopsis
  const url = json.url
  const anime = {title, image, titleJapanese, synopsis, url};
  createElement(anime);
}

async function getRandomAnime() {
  try{
    const data = await fetch("https://api.jikan.moe/v4/random/anime");
    const json = await data.json();
    animeObject(json.data);
  }catch(error){
    console.log(error.message);
  }
}
getRandomAnime();

//const getRandomThen = () => {
  //fetch("https://api.jikan.moe/v4/random/anime")
   // .then((data) => data.json())
  //  .then((result) => createElement(result.data))
  //  .catch((error) => console.log(error.message))
//};
//getRandomThen();