import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';
const CarouselImage=({text,img})=>{
    return (
        <Image alt={text} src={img} width={"100%"}  rounded />
        // <img src={img} width="100%" alt={text} />
    )
}
CarouselImage.propTypes={
    text:PropTypes.string.isRequired,
    img:PropTypes.string.isRequired
}
export default CarouselImage;