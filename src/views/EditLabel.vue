<template>
    <Layout>
         编辑标签
    </Layout>

</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { tagsListModel } from "@/models/tagsListModel";

@Component
export default class Label extends Vue {
    created(){
        const id = this.$route.params.id
        const tags = tagsListModel.fetch()
        const tag = tags.filter(t=> t.id === id)[0]
        if(tag){
            console.log(tag);
        }else{
            this.$router.replace('/404')
        }
    }
}
</script>

<style scoped>

</style>