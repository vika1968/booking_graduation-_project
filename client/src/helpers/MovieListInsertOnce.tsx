
import axios from "axios";
import MovieScheme from './MovieScheme';

interface MovieSchemeOneTime {
 // movieID: number;
  title: string;
  description: string;
  actors: string;
  releaseDate: string;
  posterUrl: string;
  featured: boolean; 
}


const MovieListInsertOnce = () => {   

    const movies: MovieSchemeOneTime[] = [   
  {   
    title: "Midnight Express",
    description: "Billy Hayes, an American college student, is caught smuggling drugs out of Turkey and thrown into prison.",
    actors: "Brad Davis, Irene Miracle, Bo Hopkins, Paolo Bonacelli",
    releaseDate: "1978-01-01",  
    posterUrl:  "https://images-na.ssl-images-amazon.com/images/M/MV5BMTQyMDA5MzkyOF5BMl5BanBnXkFtZTgwOTYwNTcxMTE@._V1_SX300.jpg",
    featured: true, 
  },
    {   
      title: "The Cotton Club",
      description: "The Cotton Club was a famous night club in Harlem. The story follows the people that visited the club, those that ran it, and is peppered with the Jazz music that made it so famous.",
      actors: "Richard Gere, Gregory Hines, Diane Lane, Lonette McKee",
      releaseDate: "1984-01-01",
      posterUrl:"https://images-na.ssl-images-amazon.com/images/M/MV5BMTU5ODAyNzA4OV5BMl5BanBnXkFtZTcwNzYwNTIzNA@@._V1_SX300.jpg",
      featured: true,     
    },   
    {    
      title: "Crocodile Dundee",
      description: "An American reporter goes to the Australian outback to meet an eccentric crocodile poacher and invites him to New York City.",
      actors: "Paul Hogan, Linda Kozlowski, John Meillon, David Gulpilil",
      releaseDate: "1986-01-01",
      posterUrl: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTg0MTU1MTg4NF5BMl5BanBnXkFtZTgwMDgzNzYxMTE@._V1_SX300.jpg",
      featured: true,        
    },   
    {   
      title: "Ratatouille",
      description: "A rat who can cook makes an unusual alliance with a young kitchen worker at a famous restaurant.",
      actors: "Patton Oswalt, Ian Holm, Lou Romano, Brian Dennehy",
      releaseDate: "2007-01-01",
      posterUrl: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTMzODU0NTkxMF5BMl5BanBnXkFtZTcwMjQ4MzMzMw@@._V1_SX300.jpg",
      featured: true,       
      },
      {
        title: "Chasing Amy",
        description: "Holden and Banky are comic book artists. Everything's going good for them until they meet Alyssa, also a comic book artist. Holden falls for her, but his hopes are crushed when he finds out she's gay.",
        actors: "Ethan Suplee, Ben Affleck, Scott Mosier, Jason Lee",
        releaseDate: "1997-01-01",
        posterUrl: "https://images-na.ssl-images-amazon.com/images/M/MV5BZDM3MTg2MGUtZDM0MC00NzMwLWE5NjItOWFjNjA2M2I4YzgxXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
        featured: true,           
      },  
      {
     
        title: "The Silence of the Lambs",
        description: "A young F.B.I. cadet must confide in an incarcerated and manipulative killer to receive his help on catching another serial killer who skins his victims.",
        actors:  "Jodie Foster, Lawrence A. Bonney, Kasi Lemmons, Lawrence T. Wrentz",
        releaseDate: "1991-01-01",
        posterUrl:   "https://images-na.ssl-images-amazon.com/images/M/MV5BMTQ2NzkzMDI4OF5BMl5BanBnXkFtZTcwMDA0NzE1NA@@._V1_SX300.jpg",
        featured: true,
     },
  ];



function handleInsertMovieList() {
    movies.forEach((movie: MovieSchemeOneTime) => {    
     insertMoviesIntoDB(movie);
    });
  }

  async function insertMoviesIntoDB(movie: MovieSchemeOneTime) {   
    try {
    const { data } = await axios.post(
       //"http://localhost:3000/api/movie/insert-into-movies",
      "/api/movie",
      {   
        title:  movie.title,
        description:  movie.description,
        actors: movie.actors,
        releaseDate: movie.releaseDate,
        posterUrl: movie.posterUrl,
        featured: movie.featured,      
      }
    );
    console.log("All movies were inserted successfully!!!!!!");
} catch (error: any) {
    console.error(error.response.data.error);
  }
  }  

return (
<div>
    <button onClick={handleInsertMovieList}>To add movies to DataBase click here</button>   
</div>
)
};

export default MovieListInsertOnce;