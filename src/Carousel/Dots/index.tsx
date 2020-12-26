import React from 'react';

interface IDotProps {
  active: boolean;
}

const Dot: React.FC<IDotProps> = ({ active }: IDotProps) => {
  return <span style={{ background: `${active ? 'white' : 'none'}` }} />;
};

interface IDotsProps {
  slides: string[];
  activeIndex: number;
}

const Dots: React.FC<IDotsProps> = ({ slides, activeIndex }: IDotsProps) => {
  return (
    <div>
      {slides.map((slide, index) => (
        <Dot key={slide} active={activeIndex === index} />
      ))}
    </div>
  );
};

export default Dots;
