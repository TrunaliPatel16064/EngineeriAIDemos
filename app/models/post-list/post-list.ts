import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { Api } from "../../services/api"

/**
 * Model description here for TypeScript hints.
 */
const api = new Api()
api.setup()
export const PostListModel = types
  .model("PostList")
  .props({
    postListData: types.optional(types.frozen(), []),
    isLoading: types.optional(types.boolean, false),
    pageNo: types.optional(types.number, 0),
    postListDetail: types.optional(types.frozen(), {}),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    fetchPostListData: flow(function* fetchPostListData() {
      try {
        self.isLoading = true
        self.pageNo = 0
        const response = yield api.getPosts(self.pageNo)
        console.log("response====", response)

        if (response.kind === "ok") {
          self.postListData = response.post.hits
          self.isLoading = false
        } else {
          self.postListData = null
          self.isLoading = false
        }
      } catch (error) {}
    }),
    fetchMoreData: flow(function* fetchMoreData() {
      try {
        self.isLoading = true
        self.pageNo += 1
        const response = yield api.getPosts(self.pageNo)
        if (response.kind === "ok") {
          const data = [...self.postListData, ...response.post.hits]
          self.postListData = data
          self.isLoading = false
          console.log("postLi===", self.postListData)
        } else {
          self.postListData = null
          self.isLoading = false
        }
      } catch (error) {}
    }),
    updatePostListDetail(value: object) {
      self.postListDetail = value
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type PostListType = Instance<typeof PostListModel>
export interface PostList extends PostListType {}
type PostListSnapshotType = SnapshotOut<typeof PostListModel>
export interface PostListSnapshot extends PostListSnapshotType {}
