const url =
  'https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=';

var results = document.getElementById('results');
const val = document.getElementById('box');
var searchip = document.getElementById('search');
var error = document.getElementById('error'); // Added variable for error

const forbiddenKeywords = ["violence", "drug", "sexual", "murder", "sex", "fuck"]; // Example keywords

const validateSearch = (e) => {
  e.preventDefault();
  const searchValue = val.value;
  if(searchValue == ''){
    results.innerHTML = '<div id="error">Please enter a query to search</div>';
  }else{
    fetchpage(searchValue);
  }
};

const isContentPG13 = (content) => {
  return !forbiddenKeywords.some(keyword => content.toLowerCase().includes(keyword));
};

const fetchpage = async (searchValue) => {
  results.innerHTML = '<div class="loading"></div>';
  try {
    const response = await fetch(`${url}${searchValue}`);
    const data = await response.json();
    const results = data.query.search.filter(result => isContentPG13(result.snippet));
    if(results.length < 1){      
      error.innerHTML = '<div>No matching results. Please try again</div>';
    }else{
      error.innerHTML ='<div> </div>';
      renderResults(results);
    }
  } catch (error) {
    results.innerHTML='<div>Error</div>';
  }
};

const renderResults = (list) => {
  const List = list.map((item) => {
    const {title, snippet, pageid} = item;
    return `<div class = 'cards'><a href=http://en.wikipedia.org/?curid=${pageid} target="_blank">
    <h4>${title}</h4>
    <p>${snippet}</p>
    </a></div>`;
  }).join('');
  results.innerHTML = `<div class="articles">${List}</div>`;
};

searchip.addEventListener('click', validateSearch);
