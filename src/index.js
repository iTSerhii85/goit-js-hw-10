import './css/styles.css';
import debounce from "lodash.debounce";
import { fetchCountries } from "./js/fetchCountries";
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(evt) {
    const name = evt.target.value;
    if (!name) {
      countryInfo.innerHTML = '';
      countryList.innerHTML = '';
    } else {
        fetchCountries(name.trim())
        .then(obj => {
        if (obj.length >= 10) {
            Notiflix.Notify.warning('Too many matches found. Please enter a more specific name.');
            countryInfo.innerHTML = '';
            countryList.innerHTML = '';
        } else {createMarkup(obj)}
        })
        .catch(error => Notiflix.Notify.failure('Oops, there is no country with that name'));
    }
}

function createMarkup(obj) {
    if(obj.length >= 2){
        const markup = obj.map(obj => 
            `<li class="countries">
              <p>
              <img src="${obj.flags.svg}" alt="${obj.name.common}" width = "30"> &nbsp
              ${obj.name.official}
              </p>
            </li>`
            );
            countryList.innerHTML = markup.join('');
            countryInfo.innerHTML = '';
        
    } else {
        const markup = obj.map(({ flags, name, capital, population, languages }) => 
            `<div class="card">
              <h2>
                <img src="${flags.svg}" alt="${name.common}" width = "45"> &nbsp
                ${name.official}
              </h2>
              <div>
                <p><b>Capital:&nbsp</b><span>${capital}</span></p>
                <p><b>Population:&nbsp</b><span>${population}</span></p>
                <p><b>Languages:&nbsp</b><span>${Object.values(languages).join(", ")}</span></p>
              </div>
            </div>`
            );
            countryInfo.innerHTML = markup.join('');
            countryList.innerHTML = '';
        } 
}
