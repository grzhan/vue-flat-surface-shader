# vue-flat-surface-shader

> A Vue component for [flat surface shader](https://github.com/wagerfield/flat-surface-shader)

![license badge](https://img.shields.io/npm/l/vue-flat-surface-shader.svg?style=flat-square) ![npm badge](https://img.shields.io/npm/v/vue-flat-surface-shader.svg?style=flat-square)

DEMO:  [Github Pages](https://grzhan.github.io/vue-flat-surface-shader/)

![demo screenshot](https://ws3.sinaimg.cn/large/006tKfTcgy1fjxbf31cp5j30m80eiq3p.jpg)



## How to use

```bash
npm install --save vue-flat-surface-shader
```

#### Main.js

```javascript
import Vue from 'vue'
import FlatSurfaceShader from 'vue-flat-surface-shader'

Vue.use(FlatSurfaceShader)
```

#### App.vue file (simple example)

```vue
<template>
  <div id="app">
    <flat-surface-shader type="webgl" 
                         :light="{ambient: '#22bc9e', diffuse: '#2b7c6b'}"
                         width=2000
                         height=1000>
    </flat-surface-shader>
  </div>
</template>
```

#### App.vue file (advanced example)

```vue
<template>
  <div id="app">
    <flat-surface-shader class="shader"
                         type="canvas" 
                         :light="{ambient: '#22bc9e', diffuse: '#2b7c6b', draw: false}" 
                         :mesh="{segments: 4, slices: 4, width: 1.8, height: 1.8}">
    </flat-surface-shader>
  </div>
</template>
<style>
  html, body {
      margin: 0;
      padding: 0;
  }
  .shader {
      width: 100vw;
      height: 100vh;
  }
</style>
```

### Props

#### 1.Type

+ The type of shader's renderer, avaliable values are `webgl`, `canvas`, `svg`.
+ Prop type: `String`
+ Default value: `webgl`

#### 2. Light

A **Light** is composed of a 3D position **Vector** and 2 **Color** objects defining its **ambient** & **diffuse** emissions. These color channels interact with the **Material** of a **Mesh** to calculate the color of a **Triangle**.

For detailed explanation, see [http://wagerfield.github.io/flat-surf…](http://wagerfield.github.io/flat-surface-shader/) and [https://github.com/wagerfield/flat-surface-shader](https://github.com/wagerfield/flat-surface-shader)

| Name        | Type    | Default   |
| ----------- | ------- | --------- |
| count       | Number  | 2         |
| xyScalar    | Number  | 1         |
| zOffset     | Number  | 100       |
| ambient     | String  | '#880066' |
| diffuse     | String  | '#FF8800' |
| speed       | Number  | 0.001     |
| gravity     | Number  | 1200      |
| dampening   | Number  | 0.95      |
| minLimit    | Number  | 10        |
| maxLimit    | Number  | null      |
| minDistance | Number  | 20        |
| maxDistance | Number  | 400       |
| autopilot   | Boolean | false     |
| draw        | Boolean | true      |

#### 3. Mesh

A **Mesh** is constructed from a **Geometry** object and a **Material** object. All the **Triangles** within the **Geometry** are rendered using the properties of the **Material**:

+ **Geometry** is simply a collection of triangles – nothing more.
+ A **Material** is composed of 2 **Color** objects which define the **ambient** & **diffuse** properties of a *surface*.
+ A **Triangle** is constructed from **3 Vertices** which each define the **x, y** and **z** coordinates of a corner. 

For detailed explanation, see [http://wagerfield.github.io/flat-surf…](http://wagerfield.github.io/flat-surface-shader/) and [https://github.com/wagerfield/flat-surface-shader](https://github.com/wagerfield/flat-surface-shader)



| Name     | Type   | Default   |
| -------- | ------ | --------- |
| width    | Number | 1.2       |
| height   | Number | 1.2       |
| depth    | Number | 10        |
| segments | Number | 16        |
| slices   | Number | 8         |
| xRange   | Number | 0.8       |
| yRange   | Number | 0.1       |
| zRange   | Number | 1.0       |
| ambient  | String | '#555555' |
| diffuse  | String | '#FFFFFF' |
| speed    | Number | 0.002     |

## Development Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).

## License

Licensed under [MIT](http://www.opensource.org/licenses/mit-license.php).