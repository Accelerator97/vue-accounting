import Vue from 'vue'
import Component from 'vue-class-component'

const errorType:{[key:string]:string} = {
    'tag name duplicated':'标签名重复'
}
@Component
export class TagHelper extends Vue { 

    createTag(){
        const name = window.prompt('请输入签名')
        if(!name){return window.alert('标签名不能为空')}
        if(this.$store.state.createTagError){
            window.alert(errorType[this.$store.state.createTagError] || '未知错误')
        }
        this.$store.commit('createTag',name)
    }
}

export default TagHelper