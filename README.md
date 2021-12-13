# reactjs-infinite-carousel

## &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Matan18/reactjs-infinite-carousel/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/reactjs-infinite-carousel.svg?style=flat)](https://www.npmjs.com/package/reactjs-infinite-carousel)

## Instalation

This is a React component to have an infinite carousel

To install the lib run one of the following commands according to your package
manager;

```bash
yarn add reactjs-infinite-carousel
```

or

```bash
npm i reactjs-infinite-carousel
```

## Usage

To use the component, you need a list of objects like the following structure;

> `image_url` is also key prop for map

```js
const list = [
  {
    image_url:
      "https://avatars0.githubusercontent.com/u/54731808?s=460&u=f1dd2199406981cedca881fca032889be8408878&v=4",
  },
  {
    image_url:
      "https://avatars0.githubusercontent.com/u/54731808?s=460&u=f1dd2199406981cedca881fca032889be8408878&v=4",
  },
  {
    image_url:
      "https://avatars0.githubusercontent.com/u/54731808?s=460&u=f1dd2199406981cedca881fca032889be8408878&v=4",
  },
];
```

And place the Carousel component inside another element, (this element will
controll the size of carousel);

```js
import Carousel from "reactjs-infinite-carousel";
// ...
<div style={{ height: "200px", width: "100%" }}>
  <Carousel images={list} />
</div>;
```

As optional, you can pass an autoPlay prop that is in seconds to change each
image;

```js
<Carousel images={list} autoPlay={1} />;
// Intervals of 1 second
```

If you want to customize your components and data attributes, you can pass
CustomComponent as argument, the carousel will automatically call this component
to each image in the list, This component must recieve a `item` prop that has
the same shape of `IImageItem`;

```js
function CustomSlide({ item: { image_url } }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: `url(${image_url}) center no-repeat`,
        backgroundSize: "cover",
      }}
    />
  );
}

function App() {
  return <Carousel images={list} CustomComponent={CustomSlide} />;
}
```

## Using Typescript

In TypeScript you can import the IImageItem interface;

```ts
import { Carousel, IImageItem } from "reactjs-infinite-carousel";

...
const list:IImageItem[]=[
  {
    image_url:'https://avatars0.githubusercontent.com/u/54731808?s=460&u=f1dd2199406981cedca881fca032889be8408878&v=4'
  },
]
...
```

This Carousel make type checking comparing the shape of list and Data recieved
of CustomSlide, in `item` prop, has a prop called `data` at the shape of the
generics recieved in `IImageItem<T>`;

```ts
type ItemProps = {
  name: string;
  age: number;
};

type CustomProps = IImageItem<ItemProps>;

function CustomSlide({ item: { image_url } }: CustomProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: `url(${image_url}) center no-repeat`,
        backgroundSize: "cover",
      }}
    />
  );
}

const list: CustomProps[] = [];

function App() {
  return <Carousel images={list} CustomComponent={CustomSlide} />;
}
```

### All props

| Prop            | Meaning                                            | Type                                                                                                                      |
| --------------- | -------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------ |
| images          | Data list                                          | IImageItem&#60;T&#62;                                                                                                     |
| CustomComponent | Custom Component For eacth item                    | React.FC&#60;{ item: IImageItem&#60;T&#62; }&#62;                                                                         |
| Arrows          | Custom Components for left and right Arrows        | { <br/>left: React.FC&#60;{ handleClick: () => void }>; <br/>right: React.FC&#60;{ handleClick: () => void }&#62;; <br/>} |
| CustomDots      | Custom Component for Dots                          | React.FC&#60;IDotsProps&#60;T&#62;&#62;                                                                                   |
| desactiveDots   | disable dots                                       | boolean                                                                                                                   |
| desactiveArrows | disable arrows                                     | boolean                                                                                                                   |
| autoPlay        | time in seconds for autoplay                       | number                                                                                                                    |
| activeColor     | color in Dot when is respective element is in view | string                                                                                                                    |
| defaultColor    | color in Dot                                       | string                                                                                                                    |

```ts
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
```
