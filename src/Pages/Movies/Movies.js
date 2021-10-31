import Genres from "../../component/Genres";
import SingleContent from "../../component/SingleContent/SingleContent";
import CustomPagination from "../../component/Pagination/CustomPagination";
import { useEffect, useState } from "react";
import axios from "axios";
import useGenre from "../../hooks/useGenre";



const Movies = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const genreforURL = useGenre(selectedGenres);//Nuestro propio Hooks



    const fetchMovies = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=0bab13500ff0c68f0c6db91a5753d954&language=en-ES&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
        );

        setContent(data.results)
        setNumOfPages(data.total_pages);
    };

    useEffect(() => {
        window.scroll(0, 0);
      fetchMovies();
      // eslint-disable-next-line
    }, [page, genreforURL]);
    return (
        <div>
            <span className="pageTitle">Movies</span>
            <Genres 
            type="movie" 
            selectedGenres={selectedGenres} 
            setSelectedGenres={setSelectedGenres} 
            genres={genres} 
            setGenres={setGenres}
            setPage={setPage}
            /> 
            <div className="trending">
             {content && content.map((e) => (
                 <SingleContent 
                 key={e.id}
                 id={e.id}
                 poster={e.poster_path}
                 title={e.title || e.nam}
                 date={e.first_air_date || e.release_date}
                 media_type="movie"
                 vote_average={e.vote_average}
                 />
             ))}
        </div>
        {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages}/>
        )}
        </div>
    );
};

export default Movies
