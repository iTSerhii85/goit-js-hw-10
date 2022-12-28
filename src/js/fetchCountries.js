function fetchCountries(country) {
    const options = 'name,capital,population,flags,languages';
    const BASE_URL = 'https://restcountries.com/v3.1/name';
    return fetch(`${BASE_URL}/${country}?fields=${options}`)
    .then(resp => {
        console.log(resp);
        if(!resp.ok){
            throw new Error(resp.statusText);
        }
        return resp.json();
    });
    
    // return response.then(resp => resp.json()).then(data => console.log(data));
}

export {fetchCountries};