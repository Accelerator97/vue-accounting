type RecordItem = {
    tags: string[];
    notes: string;
    type: string;
    amount: number;
    createAt?:Date;
}

type tag = {
    id:string
    name:string
}

type TagListModel = {
    data: tag[],
    fetch: () => tag[]
    create: (name: string) => 'success' | 'duplicated' //success表示创建成功，duplicated表示创建重复
    update:(name:string,id:string) => 'success' | 'not found' | 'duplicated'
    remove:(id:string) => boolean
    save: () => void
}

interface Window {
    tagList:tag[]
    findTag:(id:string) => tag
    createTag:(name:string)=> void 
    removeTag:(id:string) =>boolean
    updateTag:(id:string,name:string) => 'success' | 'not found' | 'duplicated'
}
  