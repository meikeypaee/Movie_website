// Selecting elements from DOM
const search_icon = document.querySelector('#search');
const input_box = document.querySelector('#input');
const movie_searchable = document.querySelector('#movie_search');
const movies_container = document.querySelector('#movie_container');

    //getting movie poster
function movieSection(movies){
    const section = document.createElement('section');
    section.classList = 'section';
     
    movies.map((movie) =>{
        if(movie.poster_path){
           const img = document.createElement('img');
           img.src = IMAGE_URL + movie.poster_path
           img['data-movie-id'] = IMAGE_URL + movie.poster_path;
           img.setAttribute('data-movie-id', movie.id);

           section.appendChild(img);
        }     
    })
    return section
}

function createMovieContainer(movies, title = ''){
     const movieElement = document.createElement('div');
     movieElement.setAttribute('class', 'movie');

     const header =  document.createElement('h2');
     header.innerHTML = title;

     const content = document.createElement('div');
     content.classList = 'content';

     const contentClose = `<p id ="content_close">X</p>`;
     content.innerHTML =  contentClose;
     
      
     const section = movieSection(movies);

    movieElement.appendChild(header);
    movieElement.appendChild(section);
    movieElement.appendChild(content);
    return movieElement;
}

    function renderSearchMovies(data){
        movie_searchable.innerHTML = '';
        const movies = data.results;    
        const movieBlock = createMovieContainer(movies);
        movie_searchable.appendChild(movieBlock);
        console.log('Data', data);

    }

    
     function renderMovies(data){
        const movies = data.results;    
        const movieBlock = createMovieContainer(movies, this.title);
        movies_container.appendChild(movieBlock);
        


    }
 
    function handleError(error){
        console.log('Error: ', error);
    }

  function process_input(){
      //searching with icon
    search_icon.onclick = function(event){
        event.preventDefault();
        const value = input_box.value;
        searchMovie(value);
             input_box.value='';
             console.log('Value', value);  
    }
    //searching with enter key
    var input = document.getElementById("input");
    input.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("search").click();
        }
    });
  }

  process_input();

    //getting avaialable movies on youtube
    function createIframe(video){
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${video.key}`;
        iframe.height = 310;
        iframe.width = 360;
        iframe.allowFullscreen = true;

        return iframe;
    }

    function videoTemplate(data,content,){
        content.innerHTML = '<p id ="content_close">X</p>';
        console.log('Videos: ', data);
            const videos = data.results;
            const length = videos.length > 4 ? 4 : videos.length;
            const iframeContainer = document.createElement('div');

            for(let v = 0; v < length; v++){
              const video = videos[v]; //video 
              const iframe = createIframe(video);
              iframeContainer.appendChild(iframe);
              content.appendChild(iframeContainer);   
                
            }        

    }

//displaying contents
document.onclick = function(event){
    const target = event.target;
    if(target.tagName.toLowerCase() === 'img'){
        const movieId = target.dataset.movieId;
        console.log('Movie ID', movieId);
        const section = event.target.parentElement;
        const content = section.nextElementSibling;
        content.classList.add('content_display');

        const path = `/movie/${movieId}/videos`;
        const url = generateUrl(path);
        // fetch videos
        fetch(url)
        .then((res) => res.json())
        .then((data) => videoTemplate(data,content))
        .catch((error) => {
        console.log('Error' , error);
         });
    }
     if(target.id === 'content_close'){
         const content = target.parentElement;
         content.classList.remove('content_display');
     }
}

getUpcomingMovies();
getTopRatedMovies();
getPopularMovies();