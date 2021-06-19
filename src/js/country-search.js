import fetchCountries from '../js/fetch-countries.js';
import debounce from 'lodash.debounce';
import { refs } from '../js/refs';
import { error } from '@pnotify/core';

import countryCard from '../partials/country-card.hbs'
import countryList from '../partials/country-list.hbs'

refs.inputCountry.addEventListener('input', debounce(onSearch, 500))

function onSearch(event) {
    const searchQuery = event.target.value.trim();
    
    refs.countrySearchResult.innerHTML = '';

    if (searchQuery.length > 0) {
        fetchCountries(searchQuery).then(countryRender)
    }
}

function countryRender(resolvedCountries) {
    let markup = '';

    if (resolvedCountries.length === 1) {
        markup = countryCard(...resolvedCountries)
    }
    if (resolvedCountries.length > 1 && resolvedCountries.length <= 10) {
        markup = countryList(resolvedCountries)
        
    }
    if (resolvedCountries.length > 10) {
        error({
            title: false,
            text: 'Уточните ваш поиск, начните вводить название страны',
            sticker: false,
            maxTextHeight: null,
            closerHover: false,
            animation: 'fade',
            mouseReset: false,
            delay: 5000,
    });
    }
    refs.countrySearchResult.innerHTML = markup
}