import React, { useEffect, useReducer} from 'react'
import Header from './components/Header';
import Search from './components/Search';
import Movie from './components/Movie';

import './App.css';

const MOVIE_API_URL = 'https://www.omdbapi.com/?t=tt3896198&s=&apikey=596e114c#';

const initialState = {
  isLoading: true,
  movies: [],
  errorMessage: null
}


const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_MOVIE_REQUEST":
      return {
        ...state,
        isLoading: true,
        errorMessage: null
      };
    case "SEARCH_MOVIE_SUCCESS":
      return {
        ...state,
        isLoading: false,
        movies: action.payload
      };
    case "SEARCH_MOVIE_FAILURE":
      return {
        ...state,
        isLoading: false,
        errorMessage: action.error
      };
  
    default:
      return state
  }
}



function App() {


  const [state, dispatch] = useReducer(reducer, initialState);


  
  useEffect(() => {
    fetch(MOVIE_API_URL)
    .then(response => response.json())
    .then(jsonResponse => {
      dispatch({
        type: "SEARCH_MOVIE_SUCCESS",
        payload: jsonResponse.Search
      });
    });
    
  }, [])

  const search = (searchValue) => {
    dispatch({
      type: "SEARCH_MOVIES_REQUEST"
    })

    fetch(`https://www.omdbapi.com/?t=${searchValue}&s=${searchValue}&apikey=596e114c`)
    .then(response => response.json())
    .then(jsonResponse =>{
      if(jsonResponse.Response === 'True') {
        dispatch({
          type: "SEARCH_MOVIE_SUCCESS",
          payload: jsonResponse.Search
          
        });
      }else{
        dispatch({
          type: "SEARCH_MOVIE_FAILURE",
          error: jsonResponse.Error
        });

      }
    });
  }

  const {movies, errorMessage, isLoading} = state;
  
  return (
    <div className="App">
      <Header text= "Movies World!"/>
      <Search search= {search}/>
      <p className='App-intro'>Sharing a few of our favourite movies</p>
      
      <div className='movies'>
        {isLoading && !errorMessage ? (
          <span>Loading...</span>
        ) : errorMessage ? (
          <div className='errorMessage'>{errorMessage}</div>

        ) : (
          movies && movies.map((movie, index) => (
            
            <Movie key={`${index}-${movie.Title}`} movie={movie} />
            
          ))
        )
        }

      </div>
    </div>
  );
}

export default App;
