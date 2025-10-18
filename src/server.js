import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

 
const appid = ""; // Replace with your actual OpenWeatherMap API key

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", { city: null, weatherOverview: null, error: null });
});

app.post("/weather", async (req, res) => {
  const city = req.body.city;

  try {
     
    const geoResponse = await axios.get(`https://api.openweathermap.org/geo/1.0/direct`, {
      params: {
        q: city,
        limit: 1,
        appid: appid
      }
    });

    if (!geoResponse.data.length) {
      throw new Error("City not found");
    }

    const { lat, lon } = geoResponse.data[0];

     
    const weatherResponse = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat,
        lon,
        appid,
        units: "metric"
      }
    });

    const weatherData = weatherResponse.data;
    const weatherOverview = {
      description: weatherData.weather[0].description,
      temperature: weatherData.main.temp,
      feels_like: weatherData.main.feels_like,
      humidity: weatherData.main.humidity,
      wind_speed: weatherData.wind.speed
    };

    res.render("index", { city, weatherOverview, error: null });
  } catch (error) {
    console.error(error.message);
    res.render("index", {
      city: null,
      weatherOverview: null,
      error: "Unable to get weather data. Please check the city name and try again."
    });
  }
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
