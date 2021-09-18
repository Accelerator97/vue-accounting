<template>
    <div class="nav-wrapper">
        <div class="content">
            <slot/>
        </div>
        <Nav/>
    </div>
</template>

<script>
    export default {
        name:"Layout"
    }
</script>

<style lang="scss" >
.nav-wrapper{
    display: flex;
    flex-direction: column;
    height: 100vh;
}
.content{
    overflow: auto; //如果内容过多显示滚动条
    flex-grow: 1;
}
</style>