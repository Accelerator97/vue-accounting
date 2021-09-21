const recordListModel = {
    data:[] as RecordItem[],
    clone(data:RecordItem[] | RecordItem){
        return JSON.parse(JSON.stringify(data))
    },
    fetch() {
        this.data = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[]
        return this.data
    },
    save() {
        window.localStorage.setItem('recordList', JSON.stringify(this.data))
    }
}

export {recordListModel}