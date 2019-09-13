var City = require('../models/mongo/cities'); 

const getRandomCity = (req, res) => {
  City.find({}, (err, cities) => {
    if (err) return res.send(err);
    const cityIndex = Math.round(Math.random() * (cities.length - 1));
    return res.send(cities[cityIndex]);
  });
};

const getAllCities = (req, res) => {
  City.find({}, (err, cities) => {
    if (err) return res.send(err);
    return res.send(cities);
  });
};

const createCity = (req, res) => {
  const { name, country, capital, location } = req.body;
  City.create({
    name,
    country,
    capital,
    location: {
      lat: location.lat,
      long: location.long,
    },
  }, (err, city) => {
    if (err) return res.send(err);
    return res.send(city);
  });
};

const updateCity = (req, res) => {
  const { id: _id } = req.params;
  const options = { new: true };
  City.findOneAndUpdate({ _id }, req.body, options, (err, city) => {
    if (err) return res.send(err);
    return res.send(city);
  });
};

const deleteCity = (req, res) => {
  const { id: _id } = req.params;
  City.remove({ _id }, (err) => {
    if (err) return res.send(err);
    return res.send('Successfully deleted city.');
  });
};

module.exports = { getRandomCity, getAllCities, createCity, updateCity, deleteCity };
