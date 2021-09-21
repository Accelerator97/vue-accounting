<template>
    <Layout>
        <div>
          <Icon name="left"/>
          <span>编辑标签</span>
        </div>
        <Notes field-name="标签名" placeholder="请输入标签名"></Notes>
    </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { tagsListModel } from "@/models/tagsListModel";
import Notes from '@/components/Money/Notes.vue'

@Component({
    components:{Notes}
})
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