type RecordItem = {
    tags: string[];
    notes: string;
    type: string;
    amount: number;
    createAt?:string;
}
type tag = {
    id: string
    name: string
}
type RootState = {
    recordList: RecordItem[],
    tagList: tag[],
    currentTag?: tag,
    createRecordError?:Error | null
    createTagError?:Error | null
}
type TagListModel = {
    data: tag[],
    fetch: () => tag[]
    create: (name: string) => 'success' | 'duplicated' //success表示创建成功，duplicated表示创建重复
    update: (name: string, id: string) => 'success' | 'not found' | 'duplicated'
    remove: (id: string) => boolean
    save: () => void
}
