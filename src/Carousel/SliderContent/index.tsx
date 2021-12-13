import React from 'react';

interface ISliderContentProps {
  translate: number;
  transition: number;
  children: React.ReactNode;
}

const SliderContent: React.FC<ISliderContentProps> = ({
  translate = 100,
  transition = 0.45,
  children,
}: ISliderContentProps) => (
  <div
    style={{
      display: 'flex',
      width: '100%',
      height: `100%`,
      transform: `translateX(-${translate}%)`,
      transition: `transform ease-out ${transition}s`,
    }}
  >
    {children}
  </div>
);

export default SliderContent;
