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

const defaultKeyExtractor = (image: IImageItem<unknown>) => image.image_url;

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
  keyExtractor?: (item: IImageItem<T>) => React.Key;
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
  keyExtractor = defaultKeyExtractor,
  Arrows,
}: ICarouselProps<CustomDataType>): JSX.Element {
  const isMultiElements = images.length > 1;

  const firstSlide = images[0] || null;
  const secondSlide = images[1] || null;
  const lastSlide = isMultiElements ? images[images.length - 1] : null;

  const [state, setState] = useState({
    activeSlide: 0,
    translate: 100,
    transition: 0.8,
    _slides: [lastSlide, firstSlide, secondSlide],
  });

  const { activeSlide, translate, _slides, transition } = state;

  const sliderRef = useRef<HTMLDivElement>();

  const nextSlide = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      translate: prevState.translate + 100,
      activeSlide:
        prevState.activeSlide === images.length - 1
          ? 0
          : prevState.activeSlide + 1,
    }));
  }, [images, setState]);

  const prevSlide = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      translate: 0,
      activeSlide:
        prevState.activeSlide === 0
          ? images.length - 1
          : prevState.activeSlide - 1,
    }));
  }, [images]);

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
      if (!isMultiElements) return;
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
      isMultiElements,
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

  if (images.length === 0) return <></>;

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
      <SliderContent
        translate={isMultiElements ? translate : 0}
        transition={transition}
      >
        {_slides
          .filter(item => !!item)
          .map(image => (
            <>
              {image && (
                <Slide key={keyExtractor(image)}>
                  {CustomComponent ? (
                    <CustomComponent item={image} />
                  ) : (
                    <DefaultComponent item={image} />
                  )}
                </Slide>
              )}
            </>
          ))}
      </SliderContent>
      {!desactiveDots && isMultiElements && (
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
      {!desactiveArrows && isMultiElements && (
        <>
          {Arrows?.left ? (
            <Arrows.left handleClick={prevSlide} />
          ) : (
            <Arrow handleClick={prevSlide} direction="left" />
          )}
          {Arrows?.right ? (
            <Arrows.right handleClick={nextSlide} />
          ) : (
            <Arrow handleClick={nextSlide} direction="right" />
          )}
        </>
      )}
    </div>
  );
}

export default Carousel;
