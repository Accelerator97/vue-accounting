<template>
    <div>
      <svg class="icon">
        <use :xlink:href="'#'+name" />
      </svg>
    </div>
</template>

<script lang="ts">
let importAll = (webpackContext:__WebpackModuleApi.RequireContext) => {webpackContext.keys().forEach(webpackContext)}
try {
    importAll(require.context('../assets/icons',true,/\.svg$/))
}catch(error){
    console.log(error);
}
    export default {
        name:"Icon",
        props:['name']
    }
</script>

<style lang="scss" scoped>
.icon{
    width:1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
</style>