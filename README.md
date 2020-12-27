# reactjs-infinite-carousel

This is a React component to have an infinite image carousel

To install the lib run one of the following commands according to your package manager;

```bash
yarn reactjs-infinite-carousel
```
or
```bash
npm i reactjs-infinite-carousel
```

To use the component, you need to set a list of objects in the following structure, and to set the width of the component;

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

And pass as arguments like this

```js
<Carousel images={list} width={500}/>
// In this example, the Carousel will be in 500px width
```

I also recommend placing the component in a div container that will contain the height of the component

```js
<div style={{height: '200px'}}>
  <Carousel images={list} width={500}/>
</div>
```
