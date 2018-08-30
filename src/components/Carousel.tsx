import * as React from "react";
import Slider from "react-slick";

import styles from "../styles/Carousel.module.scss";

interface CarouselProps {
  images: string[];
}

interface CarouselState {
  readonly main: any;
  readonly nav: any;
}

const initialState = {
  main: null,
  nav: null
};

const responsiveSettings = [
  {
    breakpoint: 768,
    settings: {
      autoplay: true,
      autoplaySpeed: 4000,
      dots: true,
      fade: false,
      speed: 1000,
      swipeToSlide: true
    }
  }
];

class Carousel extends React.Component<CarouselProps, CarouselState> {
  private mainSlider: Slider | null;
  private navSlider: Slider | null;

  constructor(props: CarouselProps) {
    super(props);

    this.mainSlider = null;
    this.navSlider = null;

    this.state = initialState;
  }

  public componentDidMount() {
    this.setState(prev => ({
      ...prev,
      main: this.mainSlider,
      nav: this.navSlider
    }));
  }

  public render() {
    return (
      <div className={styles.Container}>
        <Slider
          fade={true}
          arrows={false}
          asNavFor={this.state.nav}
          ref={slider => (this.mainSlider = slider)}
          className={styles.MainSlider}
          slidesToShow={1}
          responsive={responsiveSettings}
        >
          {this.renderImageTiles(styles.MainImages)}
        </Slider>
        <Slider
          arrows={false}
          asNavFor={this.state.main}
          ref={slider => (this.navSlider = slider)}
          slidesToShow={this.props.images.length - 1}
          className={styles.NavSlider}
          swipeToSlide={true}
          focusOnSelect={true}
        >
          {this.renderImageTiles(styles.ThumbnailImages)}
        </Slider>
      </div>
    );
  }

  private renderImageTiles = (className: string) => {
    const { images } = this.props;
    return images.map((url, index) => {
      const imageUrl: string = `url(${url})`;
      return (
        <div key={index}>
          <div className={className} style={{ backgroundImage: imageUrl }} />
        </div>
      );
    });
  };
}

export default Carousel;
