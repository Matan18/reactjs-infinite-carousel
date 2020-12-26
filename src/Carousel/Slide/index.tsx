import React from 'react';

interface ISlideProps {
  content: string;
  width: number;
}

const Slide: React.FC<ISlideProps> = ({ content, width }: ISlideProps) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
    >
      <img
        src={content}
        alt={content}
        style={{
          width: `${width}px`,
          height: '100%',
          objectFit: 'cover',
          position: 'relative',
          zIndex: 0,
        }}
      />
    </div>
  );
};

export default Slide;
