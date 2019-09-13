import Cities from '../models/mongo/cities';

// Get all cities

export const getAllCities = (req, res) => {
    Cities.find({}, (err, cities) => {
      if (err){ 
          return res.send(err);
      }
      return res.send(cities);
    });
};

// Add new city

export const addNewCity = (req, res) => {
    const { name, country, capital, location } = req.body;
    const cityData ={
        name,
        country,
        capital,
        location
    }
    const  newCity = new Cities(generateLastModifiedDate(cityData));

    newCity.save((err, city) => {
        if (err) { 
            return res.send(err);
        }
        generateLastModifiedDate(city)
        res.status(200).json(city)
    })
};

// Update city Details

export const updateCity = (req, res) => {
    const { id: _id } = req.params;
    const options = { new: true };
    Cities.findOneAndUpdate({ _id }, req.body, options, (err, city) => {
      if (err){
          return res.send(err);
      }
      generateLastModifiedDate(city)
      return res.send(city);
    });
};

// Delete city Details

export const deleteCity = (req, res) => {
    const { id: _id } = req.params;
    Cities.remove({ _id }, (err, city) => {
      if (err){
          return res.send(err);
      }
      return res.send("City data deleted successfully!");
    });
};

const generateLastModifiedDate = (data) =>{
    return data["lastModifiedDate"] = new Date()
}
  