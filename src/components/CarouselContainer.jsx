import Carousel from "react-bootstrap/Carousel";
import CarouselImage from "./CarouselImage";
import img1 from "../assets/carousel/04e380c1e6fccbf096bf52ef882d0569.jpg.webp";
import img2 from "../assets/carousel/124004c196024590514b609343f27228.jpg.webp";
import img3 from "../assets/carousel/3301bdfc591a8fe28cd0b09d2cc6b3a1.jpg.webp";
import img4 from "../assets/carousel/5656d6ad2e4f04ee071b2ad1d96e7448.jpg.webp";
import img5 from "../assets/carousel/6f4a4db36b342ef3990f17b533b180be.jpg.webp";
import img6 from "../assets/carousel/9e1ac2c2bb7c1beb9bd698cb4bd2bc8c.jpg.webp";
import { useState } from "react";
function CarouselContainer() {
  const [img, ] = useState([
    [img1, img2],
    [img3, img4],
    [img5, img6],
  ]);
  return (
    <Carousel className=" p-2">
      {img.map((item, index) => {
        return (
          <Carousel.Item interval={1000} key={index}>
          <div className="row">
            {item.map((image, index) => {
              return (
                <div className="col-6" key={index}>
                  <CarouselImage text="First slide" img={image} />
                </div>
              );
            })}
          </div>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}

export default CarouselContainer;
