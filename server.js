import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Enable CORS so your frontend can call this server

// Proxy route for NewsAPI
app.get('/api/news', async (req, res) => {
  // Extract query params for flexibility
  const { category = 'general', country = 'us' } = req.query;
  const NEWS_API_KEY = process.env.NEWS_API_KEY;

  const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${NEWS_API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(response.status).json({ error: `NewsAPI error: ${response.statusText}` });
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Proxy route for OpenWeatherMap
app.get('/api/weather', async (req, res) => {
  const { q } = req.query; // city name
  const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

  if (!q) return res.status(400).json({ error: 'City name (q) is required' });

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(q)}&units=metric&appid=${WEATHER_API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(response.status).json({ error: `OpenWeatherMap error: ${response.statusText}` });
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Proxy route for Alpha Vantage Stocks
app.get('/api/stocks', async (req, res) => {
  const { symbol } = req.query;
  const STOCK_API_KEY = process.env.STOCK_API_KEY;

  if (!symbol) return res.status(400).json({ error: 'Stock symbol is required' });

  const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${STOCK_API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(response.status).json({ error: `Alpha Vantage error: ${response.statusText}` });
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});
