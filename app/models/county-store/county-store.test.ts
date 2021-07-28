import { CountyStoreModel, CountyStore } from "./county-store"

test("can be created", () => {
  const instance: CountyStore = CountyStoreModel.create({})

  expect(instance).toBeTruthy()
})