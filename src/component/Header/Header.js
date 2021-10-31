import './Header.css';

function header() {
    //Cuando hagamos click en el Header, nos va a llevar al sub 0,0 osea al principio de la app
    return <span onClick={()=> window.scroll(0, 0)} className="header">
        Peliculas y Series 🎬
        </span>
    
}

export default header
