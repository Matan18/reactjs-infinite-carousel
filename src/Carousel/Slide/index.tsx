import React from 'react';

interface ISlideProps {
  children?: React.ReactNode;
}

const Slide: React.FC<ISlideProps> = ({ children }: ISlideProps) => {
  return (
    <section
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        flex: 'none',
      }}
    >
      {children}
    </section>
  );
};

export default Slide;
