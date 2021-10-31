import { Badge } from "@material-ui/core";
import { img_300, unavailable} from "../../config/config";
//Traemos las tendencias mas todo lo que traen, la img "notfound"
import "./SingleContent.css";
import ContentModal from "../ContentModal/contentModal";

const SingleContent = ({
      id,
      poster,
      title,
      date,
      media_type,
      vote_average,
    }) => {
        return <ContentModal media_type={media_type} id={id}>
            <Badge 
            badgeContent={vote_average}//importamos el puntaje de M-UI"Badge", si es menor a 6 se pinta de secondary sino de primary
            color={vote_average > 6 ? "primary" : "secondary"}
            /> 
            <img className="poster" 
            src={poster ? `${img_300}/${poster}` : unavailable} 
            alt={title} 
            />
            <b className="title">{title}</b>
            <span className="subTitle">
                {media_type === "tv" ? "TV series" : "Movie"}
            <span className="subTitle">{date}</span>
            </span> 
        </ContentModal>
    };//"span" diferenciamos el tipo de los poster, si es tv, tvSeries o movies

export default SingleContent;
