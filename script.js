//get elements by IDs
const generalBtn = document.getElementById('generalnews');
const sportsBtn = document.getElementById('sports');
const businessBtn = document.getElementById('business');
const entertainmentBtn = document.getElementById('entertainment');
const technologyBtn = document.getElementById('technology');
const searchBtn = document.getElementById('searchBtn');

//input bar
const newsinput = document.getElementById('newsinput');

//news body
const newstype = document.getElementById('newstype');
const newsdetails = document.getElementById('newsdetails');
//store news data

var newsData = [];
//get API from https://newsapi.org 

const API_KEY = '83b5d4b0c05f4ab3a5317e86a49a6aac';

// API for each category
const HEADLINES = 'https://newsapi.org/v2/top-headlines?country=za&apiKey=';
const GENERAL_NEWS = 'https://newsapi.org/v2/top-headlines?country=za&category=general&apiKey=';
const SPORTS_NEWS = 'https://newsapi.org/v2/top-headlines?country=za&category=sports&apiKey=';
const BUSINESS_NEWS = 'https://newsapi.org/v2/top-headlines?country=za&category=business&apiKey=';
const ENTERTAINMENT_NEWS = 'https://newsapi.org/v2/top-headlines?country=za&category=entertainment&apiKey=';
const TECHNOLOGY_NEWS = 'https://newsapi.org/v2/top-headlines?country=za&category=technology&apiKey=';
const SEARCH_NEWS = 'https://newsapi.org/v2/everything?q=';

//event listeners

generalBtn.addEventListener('click', () => {
    fetchGeneralNews();
});

sportsBtn.addEventListener('click', () => {
    fetchSportsNews();
});

businessBtn.addEventListener('click', () => {
    fetchBusinessNews();
});

entertainmentBtn.addEventListener('click', () => {
    fetchEntertainmentNews();
});

technologyBtn.addEventListener('click', () => {
    fetchTechnologyNews();
});

searchBtn.addEventListener('click', () => {
    fetchNews();
});



const fetchGeneralNews = async () => {
    const res = await fetch(GENERAL_NEWS + API_KEY)
    newsData = [];
    if (res.status >= 200 && res.status < 300) {
        const data = await res.json();
        newsData = data.articles;

    } else {
        //handle error
        console.log(res.status, res.statusText);
    }
    displayNews();
}

const fetchSportsNews = async () => {
    const res = await fetch(SPORTS_NEWS + API_KEY);
    newsData = [];
    if (res.status >= 200 && res.status < 300) {
        const data = await res.json();
        newsData = data.articles;


    } else {
        //handle error
        console.log(res.status, res.statusText);
    }

    displayNews();
}

const fetchBusinessNews = async () => {
    const res = await fetch(BUSINESS_NEWS + API_KEY);
    newsData = [];
    if (res.status >= 200 && res.status < 300) {
        const data = await res.json();
        newsData = data.articles;


    } else {
        //handle error
        console.log(res.status, res.statusText);
    }

    displayNews();
}

const fetchEntertainmentNews = async () => {
    const res = await fetch(ENTERTAINMENT_NEWS + API_KEY);
    newsData = [];
    if (res.status >= 200 && res.status < 300) {
        const data = await res.json();
        console.log(data)
        newsData = data.articles;


    } else {
        //handle error
        console.log(res.status, res.statusText);
    }
    displayNews();
}

const fetchTechnologyNews = async () => {
    const res = await fetch(TECHNOLOGY_NEWS + API_KEY);
    newsData = [];
    if (res.status >= 200 && res.status < 300) {
        const data = await res.json();
        newsData = data.articles;


    } else {
        //handle error
        console.log(res.status, res.statusText);
    }
    displayNews();
}

const fetchNews = async () => {

    if (newsinput.valur === null) {
        return;
    }

    const res = await fetch(SEARCH_NEWS + encodeURIComponent(newsinput.value)  + '&apikey=' + API_KEY);
    newsData = [];
    if (res.status >= 200 && res.status < 300) {
        const data = await res.json();
        newsData = data.articles;


    } else {
        //handle error
        console.log(res.status, res.statusText);
    }
    displayNews();
};

const displayNews = () => {
    newsdetails.innerHTML = '';
if(newsData.length === 0) {
    newsdetails.innerHTML = '<h6>Error, no information found</h6>'
}

newsData.forEach(news => {
    var column = document.createElement('div');
    column.className='col-sm-12 col-md-4 col-lg-3 p-2 card';

    var card = document.createElement('div');
    card.className='p-2';

    var image = document.createElement('img');
    image.setAttribute('height', 'matchparnt');
    image.setAttribute('width', '100%');
    image.src = news.urlToImage;

    var cardBody = document.createElement('div');

    
})
}
