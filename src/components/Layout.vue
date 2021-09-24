<template>
    <div class="layout-wrapper">
        <div class="content" :class="classPrefix && `${classPrefix}-content`"> 
            <slot/>
        </div>
        <Nav/>
    </div>
</template>

<script>
    export default {
        name:"Layout",
        props:['classPrefix']
    }
</script>

<style lang="scss">
.layout-wrapper{
    display: flex;
    flex-direction: column;
    height: 100vh; /*給 Safari 以外的瀏覽器讀取*/
    height: calc(var(--vh,1vh)*100);
    .content{
    overflow: auto; //如果内容过多显示滚动条
    flex-grow: 1;
}
}

</style>