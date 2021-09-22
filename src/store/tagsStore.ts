import createId from "@/lib/createId"

const tagStore = {
    tagList: [] as tag[],
    fetchTags(){
        this.tagList = JSON.parse(window.localStorage.getItem('tagsList') || '[]')
        return this.tagList
    },
    findTag(id: string) {
        return this.tagList.filter(t => t.id === id)[0]
    },
    createTag(name: string) {
        const names = this.tagList.map(item => item.name)
        const id = createId().toString()
        if (names.indexOf(name) >= 0) {
            window.alert('标签名重复')
            return 'duplicated'
        }
        this.tagList.push({ id: id, name: name })
        this.saveTag()
        return 'success'
    },
    removeTag(id: string){
        let index = -1
        for(let i = 0;i<this.tagList.length;i++){
            if(this.tagList[i].id === id){
                index = i
                break
            }
        }
        this.tagList.splice(index,1)
        this.saveTag()
        return true
    },
    updateTag(id: string, name: string)  {
        const idList = this.tagList.map(item=> item.id )
        if(idList.indexOf(id)>=0){
            const names = this.tagList.map(item=>item.name)
            if(names.indexOf(name)>=0){
                return 'duplicated'
            }else{
                const tag = this.tagList.filter(item => item.id === id )[0]
                tag.name = name
                this.saveTag()
                return 'success'
            }

        }else{
            return 'not found'
        }
    },
    saveTag() {
        window.localStorage.setItem('tagsList', JSON.stringify(this.tagList))
    }
}

tagStore.fetchTags()

export default tagStore