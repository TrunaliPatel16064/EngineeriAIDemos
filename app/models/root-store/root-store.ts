import { CountyStoreModel } from "../county-store/county-store"
import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { PostListModel } from "../post-list/post-list"
import { RandomAstDataModel } from "../random-ast-data/random-ast-data"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  countyStore: types.optional(CountyStoreModel, {}),
    randomAstDataStore: types.optional(RandomAstDataModel, {}),
  postListStore: types.optional(PostListModel, {}),
    CountyStore:types.optional(CountyStoreModel,{})
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
