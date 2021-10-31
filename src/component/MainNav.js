import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import MovieIcon from '@material-ui/icons/Movie';
import SearchIcon from '@material-ui/icons/Search';
import TvIcon from '@material-ui/icons/Tv';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    backgroundColor: "#2d313a",
    zIndex: 100,
  },
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const history = useHistory();//gancho se envía con React Router y nos permite acceder al estado del enrutador para navegar desde el interior de nuestros componentes

     useEffect(() => {  //Para que cuando hagan click en algun icono se rediriga a esa ruta, ejemple click 
                        //en movies se va /movies, por default el Onchange esta en 0 en "/", osea que si el
        if(value === 0) history.push('/'); //valor es igual a 0 (primerIcons) va a pushear "rederigir" ese estado en "/"
        else if(value === 1) history.push('/movies');// si es igual a 1 va a pushear a "/movies" y asi ...
        else if(value === 2) history.push('/series');
        else if(value === 3) history.push('/search');

    }, [value, history]);


  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
       style={{color : "white" }}
       label="Trending" 
       icon={<WhatshotIcon />} 
       />
      <BottomNavigationAction
       style={{color : "white" }}
       label="Peliculas" 
       icon={<MovieIcon />} 
       />
      <BottomNavigationAction
       style={{color : "white" }}
       label=" TV Series" 
       icon={<TvIcon />} 
       />
         <BottomNavigationAction
       style={{color : "white" }}
       label="Search" 
       icon={<SearchIcon />} 
       />
    </BottomNavigation>
    
  );
}