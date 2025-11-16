// Express backend proxy server for API requests
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Allow calls from frontend

// Proxy endpoint for NewsAPI: hides API key securely
app.get('/api/news', async (req, res) => {
  const { category = 'general', country = 'rsa' } = req.query;
  const NEWS_API_KEY = process.env.NEWS_API_KEY;
  const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${NEWS_API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) return res.status(response.status).json({ error: response.statusText });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Proxy endpoint for OpenWeatherMap
app.get('/api/weather', async (req, res) => {
  const { q } = req.query; // city name
  const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
  if (!q) return res.status(400).json({ error: 'City name (q) required' });

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(q)}&units=metric&appid=${WEATHER_API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) return res.status(response.status).json({ error: response.statusText });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Proxy endpoint for Alpha Vantage stock quotes
app.get('/api/stocks', async (req, res) => {
  const { symbol } = req.query;
  const STOCK_API_KEY = process.env.STOCK_API_KEY;
  if (!symbol) return res.status(400).json({ error: 'Stock symbol required' });

  const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${STOCK_API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) return res.status(response.status).json({ error: response.statusText });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start backend server on PORT (usually 5000 locally)
app.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});
