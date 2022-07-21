//TMDB

const API_KEY = 'api_key=5ee3e8edde556adc097693874e210f73&language=es-MX';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?'+API_KEY;

const main = document.getElementById('main');
const detailsbox = document.getElementById('detailsbox');
const search = document.getElementById('search');
const form =  document.getElementById('form');

const prev = document.getElementById('prev');
const next = document.getElementById('next');
const current = document.getElementById('current');
const details = document.getElementById('detalles');

const Nuevas = document.getElementById('Nuevas');
const Cartelera = document.getElementById('Cartelera');
const Populares = document.getElementById('Populares');
const CarteleraMovil = document.getElementById('CarteleraMovil');
const NuevasMovil = document.getElementById('NuevasMovil');
let side = document.getElementById('side');
const imageNotFound	= 'img/not_found.png'; 

const genres = [
  {
    "id": 28,
    "name": "Action"
  },
  {
    "id": 12,
    "name": "Adventure"
  },
  {
    "id": 16,
    "name": "Animation"
  },
  {
    "id": 35,
    "name": "Comedy"
  },
  {
    "id": 80,
    "name": "Crime"
  },
  {
    "id": 99,
    "name": "Documentary"
  },
  {
    "id": 18,
    "name": "Drama"
  },
  {
    "id": 10751,
    "name": "Family"
  },
  {
    "id": 14,
    "name": "Fantasy"
  },
  {
    "id": 36,
    "name": "History"
  },
  {
    "id": 27,
    "name": "Horror"
  },
  {
    "id": 10402,
    "name": "Music"
  },
  {
    "id": 9648,
    "name": "Mystery"
  },
  {
    "id": 10749,
    "name": "Romance"
  },
  {
    "id": 878,
    "name": "Science Fiction"
  },
  {
    "id": 10770,
    "name": "TV Movie"
  },
  {
    "id": 53,
    "name": "Thriller"
  },
  {
    "id": 10752,
    "name": "War"
  },
  {
    "id": 37,
    "name": "Western"
  }
]


var currentPage = 1;
var nextPage = 2;
var prevPage = 3;
var lastUrl = '';
var totalPages = 100;

getMovies(API_URL);

function getMovies(url) {

    side.classList.remove('d-none');
    lastUrl = url;
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results)
        if(data.results.length !== 0){
            showMovies(data.results);
            currentPage = data.page;
            nextPage = currentPage + 1;
            prevPage = currentPage - 1;
            totalPages = data.total_pages;

            current.innerText = currentPage;

            if(currentPage <= 1){
              prev.classList.add('disabled');
              next.classList.remove('disabled')
            }else if(currentPage>= totalPages){
              prev.classList.remove('aria-disabled');
              next.classList.add('disabled')
            }else{
              prev.classList.remove('disabled');
              next.classList.remove('disabled')
            }

           

        }else{
            main.innerHTML= `<h1 class="no-results">No Results Found</h1>`
        }
    })
    }


    function showMovies(data) {
       
        
        main.innerHTML = '';
       
          
          const movies = [];
        data.forEach(movie => {
            
            
            const movieEl = document.createElement('div');
            movieEl.classList.add('col-md-6'); 
            let genresTag 		= '';
						movie.genre_ids.forEach(function(genreItem){				
							genresTag  		+= `${genres.find(g=>g.id==genreItem).name},`;
						});
						genresTag 			= genresTag.slice(0,-1);
            const description 	= (movie.overview.length>0)?movie.overview.split(' ').slice(0,12).join(' ').concat('...'):'Sin descripcion.';
            const poster 	= (movie.poster_path!=null)?IMG_URL+movie.poster_path:imageNotFound;
            const idmovie = movie.id;
          
            
           
            detailsbox.innerHTML='';
            movieEl.innerHTML = `
           

            <div class="card mb-3 mt-4 shadow" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4 text-center shadow-lg" id="contenedor"> 
                        <img src="${poster}" class="img-fluid imgMovies rounded-start" alt="Sin imagen"> 
                    
                    </div> 
                    <div class="valoracion w-25"><span class="text-white bg-info rounded-circle fs-6 p-2">${movie.vote_average.toFixed(1)}</span></div>
                <div class="col-md-8">
                    
                    <div class="card-body">
                    <h5 class="card-title">${movie.title}</h5>
                    <p class="card-text text-muted">${genresTag}</p>
                    <p class="card-text"><small class="text-muted">${description}</small></p>   
                    <a class="" id="${idmovie}" onclick= "detalles(${movie.id})">Detalles</a>                 
                    </div>   
                
                    
                    <div class="text-end me-1 mb-2" >     
                        
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-download mx-2" viewBox="0 0 16 16">
                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                        </svg>              
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-star mx-2" viewBox="0 0 16 16">
                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                        </svg>      
                                        
                    </div>     
                    
                </div> 
             
            </div> 
            `
           
            
            
            
            
           
            movies.push(movieEl);

            
        
        })
        let rowlengs= movies.length/2;
        let indexmovies =0;
        for(let indexrow = 0; indexrow < rowlengs; indexrow++) {
            
            
            const rowDiv = document.createElement('div');
            rowDiv.classList.add('row'); 
            for (let index = 0; index < 2; index++) {
                
                
                const element = movies[indexmovies];
               
                if (indexmovies<movies.length) {
          
                  
                    rowDiv.appendChild(element);
                    indexmovies++;
                }
                
                
            }
            main.appendChild(rowDiv);

            
        }
        
        

    }
    Populares.addEventListener('click', () => {
        
            categorias("Populares");
        
      })
      Cartelera.addEventListener('click', () => {
        
        categorias("Cartelera");
    
  })
  Nuevas.addEventListener('click', () => {
        
    categorias("Nuevas");

})  

NuevasMovil.addEventListener('click', () => {
        
  categorias("Nuevas");

}) 

CarteleraMovil.addEventListener('click', () => {
        
  categorias("Cartelera");

})
    function categorias(key) {
        let url="";
            switch (key) {
                case "Populares":
                    console.log("Populares")
                     url = BASE_URL+"/movie/popular?"+API_KEY
                    getMovies(url);
                    break;
                    case "Cartelera":
                        console.log("Cartelera")
                         url = BASE_URL+"/trending/movie/day?"+API_KEY
                        getMovies(url);
                        break;
                        case "Nuevas":
                            console.log("Nuevas")
                             url = BASE_URL+"/movie/now_playing?"+API_KEY
                            getMovies(url);
                            break;
                default:
                    break;
            }
        
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const searchTerm = search.value;
      /*selectedGenre=[];*/
      /*setGenre();*/
      if(searchTerm) {
          getMovies(searchURL+'&query='+searchTerm)
      }else{
          getMovies(API_URL);
      }
  
  })




    prev.addEventListener('click', () => {
        if(prevPage > 0){
          pageCall(prevPage);
        }
      })
      
      next.addEventListener('click', () => {
        if(nextPage <= totalPages){
          pageCall(nextPage);
        }
      })
      
      function pageCall(page){
        let urlSplit = lastUrl.split('?');
        let queryParams = urlSplit[1].split('&');
        let key = queryParams[queryParams.length -1].split('=');
        if(key[0] != 'page'){
          let url = lastUrl + '&page='+page
          getMovies(url);
        }else{
          key[1] = page.toString();
          let a = key.join('=');
          queryParams[queryParams.length -1] = a;
          let b = queryParams.join('&');
          let url = urlSplit[0] +'?'+ b
          getMovies(url);
        }
      } 

      function detalles (id){ 

        console.log(id)
        fetch(BASE_URL+'/movie/'+id+'?'+API_KEY).then(res => res.json()).then(data => {
          
          
          console.log(data);
         
          showData(data);



        }); 

       
    



      }

      function showData(data){ 
        
        const posterback = (data.backdrop_path!=null)?IMG_URL+data.backdrop_path:imageNotFound;
        const poster = (data.poster_path!=null)?IMG_URL+data.poster_path:imageNotFound;
       let genresTag 		= '';
         for (let index = 0; index < data.genres.length; index++) {
          genresTag += `${data.genres[index].name}, ` 
          
          
         }
       main.innerHTML = '';
       detailsbox.innerHTML='';
       const detalles = document.createElement('div');
       detalles.innerHTML = `

      <div class="overlap-box">
         <div class="overlap-item" style="min-width:100%;">
           <img src="${posterback}" class="img-bannerDetails img-fluid" alt="...">  
         </div> 
   
          <div class="overlap-item ">
              <div class="container-sm d-flex justify-content-around margintop">
               <div class="col-md-2 z-index container-sm d-flex"> 
                   <img src="${poster}" class="img-fluid" alt="...">    
               </div>                    
                <div class="container-sm"></div>
   
                <a type="button" id="play" href="" class="z-index">
                   <svg xmlns="http://www.w3.org/2000/svg" width="150" height="100" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
                       <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                   </svg>
                </a>
           </div>
        </div> 

        
     </div> 
       
     
     <div class="border border-secondary container-sm text-center mb-5 bg-white p-3">
         <div class="mb-3 d-flex justify-content-center">
           <h3 class="pe-3">${data.title}</h3> 
           <p class="card-text"><span class="text-white bg-danger rounded-pill fs-5 p-2">${data.vote_average}</span></p>
         </div>
         <p class="card-text text-muted">${genresTag}</p>
         <p class="card-text"><span class="text-white bg-warning rounded-pill fs-6 p-1"><small>${data.runtime} minutos</small></span></p>
         <p>${data.overview}</p>
     </div>     

        `
        side.classList.toggle('d-none');
        detailsbox.appendChild(detalles);
        videoMovie(data.id)

      } 

      
 function videoMovie(id){ 

  fetch(BASE_URL + '/movie/'+id+'/videos?'+API_KEY).then(res => res.json()).then(data => {
    if(data.results[0] != null){
      if(data.results[0].site == 'YouTube'){ 
        $("#play").attr("href",`https://www.youtube.com/embed/${data.results[0].key}?autoplay=1` )      
      console.log(data);
      }
      
    }     
   
   
  

  }); 


 }
     