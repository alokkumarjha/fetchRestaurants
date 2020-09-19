const fetch = require('node-fetch')
require('dotenv').config()

/**
 * @param {place} req 
 * @param {*listOfRestaurants} res 
 * This api will list the restaurants located nearby in your area, you just have to pass a key named
 * place in param,and you will get the list of restaurants
 * I have displayed only some fields like name, rating, address and reviews of restaurants,as you
 * can see on line umber 27
 * 
 * In Response Status code 200 signifies the api works well
 * Status Code 503 means there is some error in fetching data from google place api
 * Status code 500 shows Internal server error ,which means there is something wrong in the code
 */

const restaurants = async (req, res) => {
  try {
    const {place} = req.query
    const API_KEY = process.env.API_KEY
    let response = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+${place}&key=${API_KEY}`)
    if (response.ok) { 
        let json = await response.json();
        let {results} = json 
        let restaurantArray = []
        results.forEach(element => {
          let {name,formatted_address,rating,user_ratings_total} = element
          let obj = {name,address:formatted_address,rating,totalReviews:user_ratings_total}
          restaurantArray.push(obj)
        });
        return res.status(200).send({listOfRestaurants:restaurantArray})
    } else {
        return res.status(503).send({error:'fetching restaurant data not working'})
    }
  } catch(e) {
    console.log(e.message)
    return res.status(500).send('Internal Server Error')
  }
}

module.exports = {
  restaurants
}