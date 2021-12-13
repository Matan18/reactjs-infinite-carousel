import React from 'react';

// import { Container } from './styles';
interface IImageItem<T = undefined> {
  image_url: string;
  data?: T;
}

interface IDefaultComponentProps {
  item: IImageItem<unknown>;
}

const DefaultComponent: React.FC<IDefaultComponentProps> = ({ item }) => (
  <img
    src={item.image_url}
    alt={item.image_url}
    style={{
      width: `100%`,
      height: '100%',
      objectFit: 'cover',
      position: 'relative',
    }}
  />
);

export default DefaultComponent;
