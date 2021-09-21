type tag = {
    id:string
    name:string
}

type TagListModel = {
    data: tag[],
    fetch: () => tag[]
    create: (name: string) => 'success' | 'duplicated' //success表示创建成功，duplicated表示创建重复
    save: () => void
}


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
        if (names.indexOf(name) >= 0) { return 'duplicated' }
        this.data.push({id:name,name:name})
        this.save()
        return 'success'
    }
}

export { tagsListModel }