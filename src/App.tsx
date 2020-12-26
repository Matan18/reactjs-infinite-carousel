import React from 'react';
import { IImageItem } from './@types/IImageItem';
import Carousel from './Carousel';

interface IAppProps {
  name?: string;
}

const App: React.FC<IAppProps> = () => {
  const list: IImageItem[] = [
    {
      image_url: 'node1.png',
    },
    {
      image_url: 'node2.png',
    },
    {
      image_url: 'node3.jpg',
    },
    {
      image_url: 'node4.jpg',
    },
    {
      image_url: 'react1.jpg',
    },
    {
      image_url: 'react2.png',
    },
    {
      image_url: 'react4.png',
    },
  ];

  return (
    <>
      <div style={slider}>
        <Carousel width={1000} images={list} />
      </div>
    </>
  );
};

export default App;

const slider: React.CSSProperties = {
  display: 'flex',
  boxSizing: 'border-box',
  flex: 1,
  width: '1000px',
  height: '300px',
};
