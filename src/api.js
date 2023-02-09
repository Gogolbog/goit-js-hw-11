import axios from 'axios';


export default class SearchFormApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  axiosSearchForm() {
    const URL = 'https://pixabay.com/api/';
    const API_KEY = '?key=33457250-a9616b28919c0d18acf47fde1';
    const PARAMS = `&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`;

    return axios
      .get(`${URL}${API_KEY}${PARAMS}`)
      .then(res => res.data)
      .then(data => {
        this.page += 1;
        return data.hits;
      });
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}