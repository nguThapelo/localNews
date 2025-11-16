// === Replace these with your actual API keys ===
const NEWS_API_KEY = 'ebfe10e6398d4085ad3e99b5f46c4f70';
const WEATHER_API_KEY = '3690341324df4b6d7c0c5152f40a8bc7';
const STOCK_API_KEY = 'ZBO2GJPIDNM71Z7Z';

// Elements
const contentArea = document.getElementById('content-area');

// Tab UI handling
function setActiveTab(activeId) {
  ['tab-news', 'tab-weather', 'tab-stocks'].forEach(id => {
    document.getElementById(id).classList.toggle('active', id === activeId);
  });
}

// Load news tab with sub-tabs and content
function loadNewsTab() {
  setActiveTab('tab-news');
  contentArea.innerHTML = `
    <ul class="nav nav-tabs" id="newsSubTab" role="tablist">
      <li class="nav-item" role="presentation">
        <button class="nav-link active" id="general-tab" data-bs-toggle="tab" data-bs-target="#general" type="button" role="tab" aria-controls="general" aria-selected="true">General</button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link" id="sports-tab" data-bs-toggle="tab" data-bs-target="#sports" type="button" role="tab" aria-controls="sports" aria-selected="false">Sports</button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link" id="business-tab" data-bs-toggle="tab" data-bs-target="#business" type="button" role="tab" aria-controls="business" aria-selected="false">Business</button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link" id="entertainment-tab" data-bs-toggle="tab" data-bs-target="#entertainment" type="button" role="tab" aria-controls="entertainment" aria-selected="false">Entertainment</button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link" id="technology-tab" data-bs-toggle="tab" data-bs-target="#technology" type="button" role="tab" aria-controls="technology" aria-selected="false">Technology</button>
      </li>
    </ul>
    <div class="tab-content mt-3" id="newsTabContent">
      <div class="tab-pane fade show active" id="general" role="tabpanel" aria-labelledby="general-tab">Loading...</div>
      <div class="tab-pane fade" id="sports" role="tabpanel" aria-labelledby="sports-tab">Loading...</div>
      <div class="tab-pane fade" id="business" role="tabpanel" aria-labelledby="business-tab">Loading...</div>
      <div class="tab-pane fade" id="entertainment" role="tabpanel" aria-labelledby="entertainment-tab">Loading...</div>
      <div class="tab-pane fade" id="technology" role="tabpanel" aria-labelledby="technology-tab">Loading...</div>
    </div>
  `;
  ['general', 'sports', 'business', 'entertainment', 'technology'].forEach(fetchNewsByCategory);
}

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
  return await res.json();
}

// News fetching
async function fetchNewsByCategory(category) {
  const container = document.getElementById(category);
  container.innerHTML = 'Loading news...';
  try {
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${NEWS_API_KEY}`;
    const data = await fetchJson(url);
    if (!data.articles.length) {
      container.innerHTML = '<p>No news found.</p>';
      return;
    }
    container.innerHTML = '';
    data.articles.forEach(article => {
      const card = document.createElement('div');
      card.className = 'card mb-3';
      card.innerHTML = `
        <img src="${article.urlToImage || 'https://via.placeholder.com/600x180?text=No+Image'}" alt="News Image" />
        <div class="card-body">
          <h6 class="card-title">${article.title}</h6>
          <p class="card-text">${article.description || ''}</p>
          <a href="${article.url}" target="_blank" class="btn btn-primary btn-sm">Read More</a>
        </div>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    container.innerHTML = `<p>Error loading news: ${err.message}</p>`;
  }
}

// Weather tab
function loadWeatherTab() {
  setActiveTab('tab-weather');
  contentArea.innerHTML = `
    <h6>Check Weather</h6>
    <form id="weatherForm" class="mb-3">
      <div class="input-group">
        <input type="text" class="form-control" id="cityInput" placeholder="Enter city name" required />
        <button class="btn btn-primary" type="submit">Get Weather</button>
      </div>
    </form>
    <div id="weatherResult"></div>
  `;
  const form = document.getElementById('weatherForm');
  const weatherResult = document.getElementById('weatherResult');
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const city = document.getElementById('cityInput').value.trim();
    if (!city) return;
    weatherResult.innerHTML = 'Loading weather...';
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${WEATHER_API_KEY}`;
      const data = await fetchJson(url);
      const icon = data.weather[0].icon ? `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png` : '';
      weatherResult.innerHTML = `
        <div class="card p-3">
          <h6>${data.name}, ${data.sys.country}</h6>
          <p><img src="${icon}" alt="Weather icon" /> ${data.weather[0].description}</p>
          <p>Temperature: ${data.main.temp} °C</p>
          <p>Humidity: ${data.main.humidity}%</p>
          <p>Wind Speed: ${data.wind.speed} m/s</p>
        </div>`;
    } catch (err) {
      weatherResult.innerHTML = `<p>Error fetching weather: ${err.message}</p>`;
    }
  });
}

// Stocks tab
function loadStocksTab() {
  setActiveTab('tab-stocks');
  contentArea.innerHTML = `
    <h6>Stock Quote</h6>
    <form id="stockForm" class="mb-3">
      <div class="input-group">
        <input type="text" class="form-control" id="stockSymbol" placeholder="Enter stock symbol (e.g. AAPL)" required />
        <button class="btn btn-primary" type="submit">Get Quote</button>
      </div>
    </form>
    <div id="stockResult"></div>
  `;
  const form = document.getElementById('stockForm');
  const stockResult = document.getElementById('stockResult');
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const symbol = document.getElementById('stockSymbol').value.trim().toUpperCase();
    if (!symbol) return;
    stockResult.innerHTML = 'Loading stock data...';
    try {
      const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${STOCK_API_KEY}`;
      const data = await fetchJson(url);
      const quote = data['Global Quote'];
      if (!quote || Object.keys(quote).length === 0) {
        stockResult.innerHTML = '<p>No data found for symbol.</p>';
        return;
      }
      stockResult.innerHTML = `
        <div class="card p-3">
          <h6>${symbol} - ${quote['01. symbol']}</h6>
          <p>Price: $${parseFloat(quote['05. price']).toFixed(2)}</p>
          <p>Change: ${quote['09. change']} (${quote['10. change percent']})</p>
          <p>Volume: ${parseInt(quote['06. volume']).toLocaleString()}</p>
          <p>Latest Trading Day: ${quote['07. latest trading day']}</p>
        </div>
      `;
    } catch (err) {
      stockResult.innerHTML = `<p>Error fetching stock data: ${err.message}</p>`;
    }
  });
}

// Initial load
loadNewsTab();

// Navbar event listeners
document.getElementById('tab-news').addEventListener('click', e => {
  e.preventDefault();
  loadNewsTab();
});
document.getElementById('tab-weather').addEventListener('click', e => {
  e.preventDefault();
  loadWeatherTab();
});
document.getElementById('tab-stocks').addEventListener('click', e => {
  e.preventDefault();
  loadStocksTab();
});
