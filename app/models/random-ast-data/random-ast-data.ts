import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { Api } from "../../services/api"
import { randomID } from "../../utils/constant"

/**
 * Model description here for TypeScript hints.
 */
const api = new Api()
api.setup()
export const RandomAstDataModel = types
  .model("RandomAstData")
  .props({
    isLoading: types.optional(types.boolean, false),
    randomAstData: types.optional(types.frozen(), []),
    randomId: types.optional(types.string, ""),
    isRandomID: types.optional(types.boolean, false),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    fetchRandomData: flow(function* fetchRandomData() {
      try {
        // self.randomId = null
        self.isLoading = true
        const response = yield api.getRandomAstData(self.randomId)
        console.log("response===", response)
        if (response.kind === "ok") {
          self.randomAstData = response.data
          self.isLoading = false
          self.randomId = ""
        } else {
          self.isLoading = false
          self.randomAstData = null
          self.randomId = ""
        }
      } catch (error) {
        console.log("error===", error)
      }
    }),
    fetchRandomAstID: flow(function* fetchRandomAstID() {
      try {
        self.isRandomID = true
        const response = yield api.getRandomAstID()
        // console.log("response===", response)
        if (response.kind === "ok") {
          const data = response.data.near_earth_objects
          const value = randomID(data)
          console.log("id===", value.id)
          self.randomId = value.id
          self.isRandomID = false
        } else {
          self.isRandomID = false
          // self.randomId = null
        }
      } catch (error) {
        console.log("error====", error)
      }
    }),
    updateID(value: any) {
      self.randomId = value
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type RandomAstDataType = Instance<typeof RandomAstDataModel>
export interface RandomAstData extends RandomAstDataType {}
type RandomAstDataSnapshotType = SnapshotOut<typeof RandomAstDataModel>
export interface RandomAstDataSnapshot extends RandomAstDataSnapshotType {}
