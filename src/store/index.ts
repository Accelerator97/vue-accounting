import Vue from 'vue'
import Vuex from 'vuex'
import clone from "@/lib/clone"
import createId from "@/lib/createId"

Vue.use(Vuex) //把store绑到vue.prototype上,初始化的时候会把store传给vue（main.ts中可以看到）
type RootState = {
  recordList: RecordItem[],
  tagList: tag[],
  currentTag?: tag
}
const store = new Vuex.Store({
  state: {  //data
    recordList: [],
    tagList: [],
    currentTag: undefined
  } as RootState,
  mutations: { //method 同步操作,数据的增删改查,里面的函数只能接受两个参数，超过的话用payload
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') 
    },
    saveRecords(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList))
    },
    createRecord(state, record: RecordItem) {
      const record2: RecordItem = clone(record); //深拷贝
      record2.createAt = new Date();
      state.recordList.push(record2);
      store.commit('saveRecords')
    },
    setCurrentTag(state, id: string) {
      state.currentTag = state.tagList.filter(t => t.id === id)[0]
    },
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagsList') || '[]')
    },
    createTag(state, name: string) {
      const names = state.tagList.map(item => item.name)
      const id = createId().toString()
      if (names.indexOf(name) >= 0) {
        window.alert('标签名重复')
      }
      state.tagList.push({ id: id, name: name })
      store.commit('saveTag')
    },
    saveTag(state) {
      window.localStorage.setItem('tagsList', JSON.stringify(state.tagList))
    },
    updateTag(state, payload: { id: string, name: string }) {
      const { id, name } = payload
      const idList = state.tagList.map(item => item.id)
      if (idList.indexOf(id) >= 0) {
        const names = state.tagList.map(item => item.name)
        if (names.indexOf(name) >= 0) {
          window.alert('标题名重复')
        } else {
          const tag = state.tagList.filter(item => item.id === id)[0]
          tag.name = name
          store.commit('saveTag')
        }

      } else {
        return 'not found'
      }
    },
    removeTag(state,id: string) {
      let index = -1
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i
          break
        }
      }
      state.tagList.splice(index, 1)
      store.commit('saveTag')
    },
  },
})

export default store;