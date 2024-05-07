async function callApi() {
    const url = 'https://opencritic-api.p.rapidapi.com/game/search?criteria=the%20withcer%203';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '8cc4ae3fd1mshff9d441fd9e76ecp15ab36jsn71cf595c4419',
            'X-RapidAPI-Host': 'opencritic-api.p.rapidapi.com'
        }
    };
   
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}




// callApi();


async function hallOfFame() {
    const url = 'https://opencritic-api.p.rapidapi.com/game/hall-of-fame';
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '8cc4ae3fd1mshff9d441fd9e76ecp15ab36jsn71cf595c4419',
        'X-RapidAPI-Host': 'opencritic-api.p.rapidapi.com'
    }
};


try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
} catch (error) {
    console.error(error);
}
}


hallOfFame();
