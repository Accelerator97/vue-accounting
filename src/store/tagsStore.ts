import { tagsListModel } from '@/models/tagsListModel'

export default {
    tagList: tagsListModel.fetch(),
    findTag(id: string) {
      return this.tagList.filter(t => t.id === id)[0]
    },
    createTag: (name: string) => {
      const message = tagsListModel.create(name)
      if (message === 'duplicated') {
        window.alert('标签名重复')
      } else if (message === 'success') {
        window.alert
      }
    },
    removeTag: (id: string) => {
      return tagsListModel.remove(id)
    },
    updateTag: (id: string, name: string) => {
      return tagsListModel.update(id, name)
    }
}