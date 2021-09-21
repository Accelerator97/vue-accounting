import createId from "@/lib/createId"

const tagsListModel: TagListModel = {
    data: [],
    fetch() {
        this.data = JSON.parse(window.localStorage.getItem('tagsList') || '[]')
        return this.data
    },
    save() {
        window.localStorage.setItem('tagsList', JSON.stringify(this.data))
    },
    create(name: string) {
        const names = this.data.map(item => item.name)
        const id = createId().toString()
        if (names.indexOf(name) >= 0) { return 'duplicated' }
        this.data.push({id:id,name:name})
        this.save()
        return 'success'
    },
    update(id:string,name:string){
        const idList = this.data.map(item=> item.id )
        if(idList.indexOf(id)>=0){
            const names = this.data.map(item=>item.name)
            if(names.indexOf(name)>=0){
                return 'duplicated'
            }else{
                const tag = this.data.filter(item => item.id === id )[0]
                tag.name = name
                this.save()
                return 'success'
            }

        }else{
            return 'not found'
        }
    },
    remove(id:string){
        let index = -1
        for(let i = 0;i<this.data.length;i++){
            if(this.data[i].id === id){
                index = i
                break
            }
        }
        this.data.splice(index,1)
        this.save()
        return true
    }
}

export { tagsListModel }