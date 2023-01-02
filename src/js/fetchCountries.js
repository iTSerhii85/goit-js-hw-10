function fetchCountries(country) {
    const options = 'name,capital,population,flags,languages';
    const BASE_URL = 'https://restcountries.com/v3.1/name';
    return fetch(`${BASE_URL}/${country}?fields=${options}`)
    .then(resp => {
        if(!resp.ok){
            throw new Error(resp.statusText);
        }
        return resp.json();
    });
}

function fetchSelectCountries(nameCountry) {
    const options = 'name,capital,population,flags,languages';
    const BASE_URL = 'https://restcountries.com/v3.1/name';
    return fetch(`${BASE_URL}/${nameCountry}?fields=${options}`)
    .then(resp => {
        if(!resp.ok){
            throw new Error(resp.statusText);
        }
        return resp.json();
    });
}

export {fetchCountries, fetchSelectCountries};