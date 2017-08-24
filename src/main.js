import FlatSurfaceShader from './FSS.vue'

const install = (Vue) => {
    Vue.Component("flat-surface-shader", FlatSurfaceShader)
}

export default {
    install,
}

export {
    FlatSurfaceShader
}
