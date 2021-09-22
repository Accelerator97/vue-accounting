import recordStore from "./recordStore"
import tagsStore from "./tagsStore"

const store = {
    ...recordStore,
    ...tagsStore
}

export default store