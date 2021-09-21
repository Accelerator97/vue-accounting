const recordListModel = {
    clone(data:RecordItem[] | RecordItem){
        return JSON.parse(JSON.stringify(data))
    },
    fetch() {
        return JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[]
    },
    save(data: RecordItem[]) {
        window.localStorage.setItem('recordList', JSON.stringify(data))
    }
}

export {recordListModel}