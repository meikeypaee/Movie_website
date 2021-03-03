// Initial Values
const api_key = '685ef3a4b7beaf1893d69281b8b1c354'
const url = 'https://api.themoviedb.org/3/search/movie?api_key=685ef3a4b7beaf1893d69281b8b1c354';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';


function generateUrl(path){
    const url = `https://api.themoviedb.org/3${path}?api_key=685ef3a4b7beaf1893d69281b8b1c354`;
    return url;
}

function requestMovies(url, oncomplete, onError){  
    fetch(url)
        .then((res) => res.json())
        .then(oncomplete) 
        .catch(onError);
}
//displaying sections
function searchMovie(value){
    const path = '/search/movie';
    const url = generateUrl(path) + '&query=' + value;
    
    requestMovies(url, renderSearchMovies, handleError);
}

function getUpcomingMovies(){
    const path = '/movie/upcoming';
    const url = generateUrl(path);

   const render = renderMovies.bind({title: 'Upcoming movies'});
    requestMovies(url, render , handleError);
    
}


function getTopRatedMovies(){
    const path = '/movie/top_rated';
    const url = generateUrl(path);
    const render = renderMovies.bind({title: 'Top Rated movies'});
    requestMovies(url, render , handleError);
    
}


function getPopularMovies(){
    const path = '/movie/popular';
    const url = generateUrl(path);
    const render = renderMovies.bind({title: 'Popular Movies'});
    requestMovies(url, render , handleError);
    
}


