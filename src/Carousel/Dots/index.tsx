import React from 'react';
import { IImageItem } from '..';
import Dot from './Dot';

export interface IDotsProps<T> {
  slides: IImageItem<T>[];
  activeColor?: string;
  defaultColor?: string;
  activeIndex: number;
  handleClick?: (index: number) => void;
}

function Dots<CustomImageData>({
  slides,
  activeIndex,
  handleClick,
  activeColor,
  defaultColor,
}: IDotsProps<CustomImageData>): JSX.Element {
  return (
    <div
      style={{
        height: '20px',
        position: 'absolute',
        bottom: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
      }}
    >
      {slides.map((slide, index) => (
        <Dot
          key={slide.image_url}
          index={index}
          handleClick={handleClick}
          active={activeIndex === index}
          activeColor={activeColor}
          defaultColor={defaultColor}
        />
      ))}
    </div>
  );
}

export default Dots;
