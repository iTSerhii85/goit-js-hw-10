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
    fetchCountries(name)
    .then(obj => {
    if (obj.length > 10) {
        Notiflix.Notify.warning('Too many matches found. Please enter a more specific name.');
    } else {createMarkup(obj)}
    })
    .catch(error => Notiflix.Notify.failure('Oops, there is no country with that name'));
}

function addMarkup(markupList, markup) {
    if (markupList) {
        countryList.innerHTML = markupList.join('');
    } else {
        countryInfo.innerHTML = markup.join('');
    }
}

function createMarkup(obj) {

    if(obj.length > 1 ){
        const markupList = obj.map(obj => 
            `<li>
              <p><img src="${obj.flags.svg}" alt="${obj.name.common}" width = "15">${obj.name.official}</p>
            </li>`
            );
        addMarkup(markupList)
        
    } else {
        const markup = obj.map(({ flags, name, capital, population, languages }) => 
            `<h2>
              <img src="${flags.svg}" alt="${name.common}" width = "35">
              ${name.official}
            </h2>
            <div>
              <p><b>Capital:&nbsp</b><span>${capital}</span></p>
              <p><b>Population:&nbsp</b><span>${population}</span></p>
              <p><b>Languages:&nbsp</b><span>${Object.values(languages).join(", ")}</span></p>
            </div>`
            );
        addMarkup(markup)
    }
}
