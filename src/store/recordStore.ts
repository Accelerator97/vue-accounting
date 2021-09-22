import { recordListModel } from '@/models/recordListModel'
import clone from "@/lib/clone"

// let data:RecordItem[] | undefined = undefined

const recordStore =  {
    // recordList: data, 对象不能在定义的时候使用，不能直接recordStore.fetchRecords()
    recordList:[]as RecordItem[],
    fetchRecords(){
        this.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[]
        return this.recordList
    },
    saveRecords(){
        window.localStorage.setItem('recordList', JSON.stringify(this.recordList))
    },

    createRecord: (record: RecordItem) => {
      recordListModel.create(record)
    },
    create(record:RecordItem){
        const record2:RecordItem = clone(record); //深拷贝
        record2.createAt = new Date();
        this.recordList && this.recordList.push(record2);
        // console.log(this.recordList);
        recordStore.saveRecords()  //定义函数的时候可以调用其他函数
    },
}

recordStore.fetchRecords() //把data从undefined变为RecordItem[]
export default recordStore