const request = require("sync-request");

// game list

function gameList() {
  const options = {
    method: "GET",
    url: "https://opencritic-api.p.rapidapi.com/game",
    qs: {
      platforms: "all",
      //   skip: "20",  this is for paging
    },
    headers: {
      "X-RapidAPI-Key": "c4a75d9930msh9a64489fdec6eddp1ecc48jsnf0c05560708b",
      "X-RapidAPI-Host": "opencritic-api.p.rapidapi.com",
    },
  };

  const response = request(options.method, options.url, options);
  if (response.statusCode === 200) {
    const responseBody= response.body.toString('utf8');
    const jsonData = JSON.parse(responseBody)
    return jsonData
  } else {
    throw new Error(`Failed to fetch game list. Status code: ${response.statusCode}`);
  }
}

//game by id
function gameById(id) {
    const options = {
      method: "GET",
      url: `https://opencritic-api.p.rapidapi.com/game/${id}`,
      
      headers: {
        "X-RapidAPI-Key": "c4a75d9930msh9a64489fdec6eddp1ecc48jsnf0c05560708b",
        "X-RapidAPI-Host": "opencritic-api.p.rapidapi.com",
      },
    };
  
    const response = request(options.method, options.url, options);
    if (response.statusCode === 200) {
      const responseBody= response.body.toString('utf8');
      const jsonData = JSON.parse(responseBody)
      return jsonData
    } else {
      throw new Error(`Failed to fetch game list. Status code: ${response.statusCode}`);
    }
  }


//search by game

function gameTitle(title) {
    const options = {
      method: "GET",
      url: `https://opencritic-api.p.rapidapi.com/game/search`,
      qs: {
        criteria: title
      },
      headers: {
        "X-RapidAPI-Key": "c4a75d9930msh9a64489fdec6eddp1ecc48jsnf0c05560708b",
        "X-RapidAPI-Host": "opencritic-api.p.rapidapi.com",
      },
    };
  
    const response = request(options.method, options.url, options);
    if (response.statusCode === 200) {
      const responseBody= response.body.toString('utf8');
      const jsonData = JSON.parse(responseBody)
      return jsonData
    } else {
      throw new Error(`Failed to fetch game list. Status code: ${response.statusCode}`);
    }
  }
  // const result = gameTitle("cooking mama")
  // console.log(result)

