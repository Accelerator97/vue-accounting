import clone from "@/lib/clone"

const recordListModel = {
    data:[] as RecordItem[],
    create(record:RecordItem){
        const record2:RecordItem = clone(record); //深拷贝
        record2.createAt = new Date();
        this.data.push(record2);
        // console.log(this.recordList);
        this.save()
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