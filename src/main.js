import FlatSurfaceShader from './FSS.vue'

const install = (Vue) => {
    Vue.component("flat-surface-shader", FlatSurfaceShader)
}

export default {
    install,
}

export {
    FlatSurfaceShader
}
