import Vue from 'vue'
import Vuex from 'vuex'
import clone from "@/lib/clone"
import createId from "@/lib/createId"
import _ from 'lodash'

Vue.use(Vuex) //把store绑到vue.prototype上,初始化的时候会把store传给vue（main.ts中可以看到）

const store = new Vuex.Store({
  state: {  //data
    recordList: [],
    tagList: [],
    currentTag: undefined,
    createRecordError: null,
    createTagError: null,
    updateTagError:null
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
      record2.createAt = record2.createAt || new Date().toISOString();
      state.recordList.push(record2);
      store.commit('saveRecords')
    },
    setCurrentTag(state, id: string) {
      state.currentTag = state.tagList.filter(t => t.id === id)[0]
    },
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagsList') || '[]')
      if (!state.tagList || state.tagList.length === 0) {
        store.commit('createTag', { name: '餐饮', iconName: 'canying', mold: '-' })
        store.commit('createTag', { name: '娱乐', iconName: 'yule', mold: '-' })
        store.commit('createTag', { name: '通讯', iconName: 'tongxun', mold: '-' })
        store.commit('createTag', { name: '交通', iconName: 'jiaotong', mold: '-' })
        store.commit('createTag', { name: '烟酒', iconName: 'yanjiu', mold: '-' })
        store.commit('createTag', { name: '数码', iconName: 'shuma', mold: '-' })
        store.commit('createTag', { name: '服饰', iconName: 'fushi', mold: '-' })
        store.commit('createTag', { name: '旅行', iconName: 'lvxing', mold: '-' })
        store.commit('createTag', { name: '工资', iconName: 'gongzi', mold: '+' })
        store.commit('createTag', { name: '兼职', iconName: 'jianzhi', mold: '+' })
        store.commit('createTag', { name: '理财', iconName: 'licai', mold: '+' })
        store.commit('createTag', { name: '礼金', iconName: 'lijin', mold: '+' })
        store.commit('createTag', { name: '其他', iconName: 'qita', mold: '+' })
      }
    },
    createTag(state, payload: { name: string, iconName: string, mold: string }) {
      const { name, iconName, mold } = payload
      state.createTagError = null
      const names = state.tagList.map(item => item.name)
      const id = createId().toString()
      if (names.indexOf(name) >= 0) {
        state.createTagError = new Error('tag name duplicated')
        return
      }
      state.tagList.push({ id: id, name: name, iconName: iconName, mold: mold })
      store.commit('saveTag')
    },
    saveTag(state) {
      window.localStorage.setItem('tagsList', JSON.stringify(state.tagList))
    },
    updateTag(state, payload: { id: string, name: string, iconName: string,mold:string}) {
      const { id, name, iconName,mold} = payload
      state.updateTagError = null
      const idList = state.tagList.map(item => item.id)
      if (idList.indexOf(id) >= 0) {
        const index = state.tagList.findIndex(item => item.id === id)
        const tagList2 = clone(state.tagList)
        tagList2.splice(index,1) //splice返回值是删除的元素，且会改变原数组
        const names = tagList2.map(item => item.name)
        if (names.indexOf(name) >= 0) {
          state.updateTagError = new Error('tag name duplicated')
          return
        } else {
          const tag = state.tagList.filter(item => item.id === id)[0]
          tag.name = name
          tag.iconName = iconName
          tag.mold = mold
          store.commit('saveTag')
        }
      } else {
        return 'not found'
      }
    },
    removeTag(state, id: string) {
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