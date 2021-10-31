import {
    Button,
    createMuiTheme,
    Tab,
    Tabs,
    TextField,
    ThemeProvider,
  } from "@material-ui/core";
  import "./Search.css";
  import SearchIcon from "@material-ui/icons/Search";
  import { useEffect, useState } from "react";
  import axios from "axios";
  import CustomPagination from "../../component/Pagination/CustomPagination";
  import SingleContent from "../../component/SingleContent/SingleContent";
  
  const Search = () => {
    const [type, setType] = useState(0);
    const [searchText, setSearchText] = useState("");
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [numOfPages, setNumOfPages] = useState();
  
    const darkTheme = createMuiTheme({
      palette: {
        type: "dark",
        primary: {
          main: "#fff",
        },
      },
    });
  
    const fetchSearch = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=0bab13500ff0c68f0c6db91a5753d954&language=en-ES&query=${searchText}&page=${page}1&include_adult=false`
        );
        setContent(data.results);
        setNumOfPages(data.total_pages);
        // console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
      window.scroll(0, 0);
      fetchSearch();
      // eslint-disable-next-line
    }, [type, page]);
  
    return (
      <div>
        <ThemeProvider theme={darkTheme}>
          <div className="search">
            <TextField
              style={{ flex: 1 }}
              className="searchBox"
              label="Search"
              variant="filled"
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Button
              onClick={fetchSearch}
              variant="contained"
              style={{ marginLeft: 10 }}
            >
              <SearchIcon fontSize="large" />
            </Button>
          </div>
          <Tabs
            value={type}
            indicatorColor="primary"
            textColor="primary"
            onChange={(event, newValue) => {
              setType(newValue);
              setPage(1);
            }}
            style={{ paddingBottom: 5 }}
            aria-label="disabled tabs example"
          >
            <Tab style={{ width: "50%" }} label="Search Movies" />
            <Tab style={{ width: "50%" }} label="Search TV Series" />
          </Tabs>
        </ThemeProvider>
        <div className="trending">
             {content && content.map((e) => (
                 <SingleContent 
                 key={e.id}
                 id={e.id}
                 poster={e.poster_path}
                 title={e.title || e.nam}
                 date={e.first_air_date || e.release_date}
                 media_type={type ? "tv" : "movie"}
                 vote_average={e.vote_average}
                 />
            ))}
          {searchText &&
            !content &&
            (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
        </div>
        {numOfPages > 1 && (
          <CustomPagination setPage={setPage} numOfPages={numOfPages} />
        )}
      </div>
    );
  };
  
  export default Search;
