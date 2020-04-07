import axios from 'axios';

export default {
    getCountries: () => {
        return axios.get('https://covid19.mathdro.id/api/countries');
    },
    getCountryResults(countryCode = 'IND') {
        return axios.get(`https://covid19.mathdro.id/api/countries/${countryCode}`);
    }
}