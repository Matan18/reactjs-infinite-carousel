import React, { useCallback, useEffect, useRef, useState } from 'react';
import { IImageItem } from '../@types/IImageItem';
import Arrow from './Arrow';
// import Arrow from './Arrow';
import Slide from './Slide';
import SliderContent from './SliderContent';

interface ICarouselProps {
  images: IImageItem[];
  width: number;
}

const Carousel: React.FC<ICarouselProps> = ({
  images,
  width,
}: ICarouselProps) => {
  // const autoPlay = 2;
  const firstSlide = images[0];
  const secondSlide = images[1];
  const lastSlide = images[images.length - 1];

  const [state, setState] = useState({
    activeSlide: 0,
    translate: 100,
    transition: 0.8,
    _slides: [lastSlide, firstSlide, secondSlide],
  });

  const { activeSlide, translate, _slides, transition } = state;

  const sliderRef = useRef<HTMLDivElement>();

  const nextSlide = useCallback(() => {
    setState({
      ...state,
      translate: translate + 100,
      activeSlide: activeSlide === images.length - 1 ? 0 : activeSlide + 1,
    });
  }, [activeSlide, images, setState, state, translate]);

  const prevSlide = useCallback(() => {
    setState({
      ...state,
      translate: 0,
      activeSlide: activeSlide === 0 ? images.length - 1 : activeSlide - 1,
    });
  }, [activeSlide, images, state]);

  const smoothTransition = useCallback(() => {
    let newSlides = [];

    if (activeSlide === images.length - 1)
      newSlides = [images[images.length - 2], lastSlide, firstSlide];
    else if (activeSlide === 0)
      newSlides = [lastSlide, firstSlide, secondSlide];
    else newSlides = images.slice(activeSlide - 1, activeSlide + 2);

    setState({
      ...state,
      _slides: newSlides,
      transition: 0,
      translate: 100,
    });
  }, [activeSlide, firstSlide, secondSlide, lastSlide, images, state]);

  useEffect(() => {
    // const play = () => {
    //   nextSlide();
    // };

    const smooth = () => {
      smoothTransition();
    };

    // const interval = setInterval(play, autoPlay * 1000);
    sliderRef.current?.addEventListener('transitionend', smooth);

    return () => {
      // clearInterval(interval);
      sliderRef.current?.removeEventListener('transitionend', smooth);
    };
  }, [nextSlide, smoothTransition]);

  useEffect(() => {
    if (transition === 0) setState({ ...state, transition: 0.7 });
  }, [transition, setState, state]);

  return (
    <div
      ref={i => {
        if (i) sliderRef.current = i;
      }}
      style={{
        flex: 1,
        width: `${width}px`,
        height: '100%',
        margin: '0px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <SliderContent translate={translate} transition={transition}>
        {_slides.map(image => (
          <Slide
            key={image.image_url}
            width={width}
            content={image.image_url}
          />
        ))}
      </SliderContent>
      <Arrow handleClick={prevSlide} direction="left" />
      <Arrow handleClick={nextSlide} direction="right" />
    </div>
  );
};

export default Carousel;
