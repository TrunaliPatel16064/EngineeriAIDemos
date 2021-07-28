import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { Api } from "../../services/api"

/**
 * Model description here for TypeScript hints.
 */
const api = new Api()
api.setup()
export const CountyStoreModel = types
  .model("CountyStore")
  .props({
    isLoading: types.optional(types.boolean, false),
    countryDetail: types.optional(types.frozen(), null),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    fetchCountryDetail: flow(function* fetchCountryDetail(countryName) {
      try {
        self.isLoading = true
        const response = yield api.getCountryDetail(countryName)
             console.log("response===", response.country,self.countryDetail)
        if (response.kind === "ok") {
     
          const data = response.country
          data.forEach((element) => {
            if (element.name === countryName) {
              self.countryDetail = element
            } else {
              self.countryDetail = data[0]
            }
          })
          console.log("detail====",self.countryDetail);
          
          self.isLoading = false
        } else {
          self.countryDetail = null
          self.isLoading=false
        }
      } catch (error) {}
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type CountyStoreType = Instance<typeof CountyStoreModel>
export interface CountyStore extends CountyStoreType {}
type CountyStoreSnapshotType = SnapshotOut<typeof CountyStoreModel>
export interface CountyStoreSnapshot extends CountyStoreSnapshotType {}
