import React, { useCallback, useEffect, useRef, useState } from 'react';
import Arrow from './Arrow';
import DefaultComponent from './DefaultComponent';
import Dots, { IDotsProps } from './Dots';
import Slide from './Slide';
import SliderContent from './SliderContent';

export interface IImageItem<T = undefined> {
  image_url: string;
  data?: T;
}

interface ICarouselProps<T = undefined> {
  images: IImageItem<T>[];
  CustomComponent?: React.FC<{ item: IImageItem<T> }>;
  Arrows?: {
    left: React.FC<{ handleClick: () => void }>;
    right: React.FC<{ handleClick: () => void }>;
  };
  CustomDots?: React.FC<IDotsProps<T>>;
  desactiveDots?: boolean;
  desactiveArrows?: boolean;
  autoPlay?: number;
  activeColor?: string;
  defaultColor?: string;
}

function Carousel<CustomDataType>({
  images,
  autoPlay,
  CustomComponent,
  activeColor,
  defaultColor,
  desactiveDots,
  desactiveArrows,
  CustomDots,
  Arrows,
}: ICarouselProps<CustomDataType>): JSX.Element {
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

  const setSlide = useCallback(
    (index: number) => {
      if (activeSlide - index === 1) {
        prevSlide();
        return;
      }
      if (activeSlide - index === -1) {
        nextSlide();
        return;
      }
      if (index === 0) {
        setState(prevState => ({
          ...prevState,
          activeSlide: index,
          _slides: [lastSlide, firstSlide, secondSlide],
        }));
        return;
      }
      if (index === images.length - 1) {
        setState(prevState => ({
          ...prevState,
          activeSlide: index,
          _slides: [images[images.length - 2], lastSlide, firstSlide],
        }));
        return;
      }
      setState(prevState => ({
        ...prevState,
        activeSlide: index,
        _slides: images.slice(index - 1, index + 2),
      }));
    },
    [
      activeSlide,
      firstSlide,
      images,
      lastSlide,
      nextSlide,
      prevSlide,
      secondSlide,
    ],
  );

  useEffect(() => {
    const play = () => {
      nextSlide();
    };

    const smooth = () => {
      smoothTransition();
    };

    const interval = autoPlay ? setInterval(play, autoPlay * 1000) : undefined;
    sliderRef.current?.addEventListener('transitionend', smooth);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
      sliderRef.current?.removeEventListener('transitionend', smooth);
    };
  }, [nextSlide, smoothTransition, autoPlay]);

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
        width: '100%',
        height: '100%',
        margin: '0px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <SliderContent translate={translate} transition={transition}>
        {_slides.map(image => (
          <Slide key={image.image_url}>
            {CustomComponent ? (
              <CustomComponent item={image} />
            ) : (
              <DefaultComponent item={image} />
            )}
          </Slide>
        ))}
      </SliderContent>
      {!desactiveDots && (
        <>
          {CustomDots ? (
            <CustomDots
              handleClick={setSlide}
              slides={images}
              activeIndex={activeSlide}
              activeColor={activeColor}
              defaultColor={defaultColor}
            />
          ) : (
            <Dots
              handleClick={setSlide}
              slides={images}
              activeIndex={activeSlide}
              activeColor={activeColor}
              defaultColor={defaultColor}
            />
          )}
        </>
      )}
      {!desactiveArrows && (
        <>
          {Arrows?.left ? (
            <Arrows.left handleClick={prevSlide} />
          ) : (
            <Arrow handleClick={prevSlide} direction="left" />
          )}
          {Arrows?.right ? (
            <Arrows.right handleClick={prevSlide} />
          ) : (
            <Arrow handleClick={nextSlide} direction="right" />
          )}
        </>
      )}
    </div>
  );
}

export default Carousel;
