# reactjs-infinite-carousel
## &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Matan18/reactjs-infinite-carousel/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/reactjs-infinite-carousel.svg?style=flat)](https://www.npmjs.com/package/reactjs-infinite-carousel)

This is a React component to have an infinite carousel

To install the lib run one of the following commands according to your package manager;

```bash
yarn add reactjs-infinite-carousel
```
or
```bash
npm i reactjs-infinite-carousel
```

To use the component, you need to set a width for the component and a list of objects like the following structure;

```ts
{
  image_url: string
}
```
For example
```js
const list =[
  {
    image_url:'https://avatars0.githubusercontent.com/u/54731808?s=460&u=f1dd2199406981cedca881fca032889be8408878&v=4'
  },
  {
    image_url:'https://avatars0.githubusercontent.com/u/54731808?s=460&u=f1dd2199406981cedca881fca032889be8408878&v=4'
  },
  {
    image_url:'https://avatars0.githubusercontent.com/u/54731808?s=460&u=f1dd2199406981cedca881fca032889be8408878&v=4'
  },
]
```
In TypeScript you can import the object interface;

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

And pass as arguments like this

```js
<Carousel images={list} width={500}/>
// In this example, the Carousel will be in 500px width
```

I also recommend placing the component in a div container that will set the height of the component

```js
<div style={{height: '200px'}}>
  <Carousel images={list} width={500}/>
</div>
```

As optional, you can pass an autoPlay prop that is in seconds to change each image

```js
  <Carousel images={list} width={1000} autoPlay={1} />
  // Intervals of 1 second
```
