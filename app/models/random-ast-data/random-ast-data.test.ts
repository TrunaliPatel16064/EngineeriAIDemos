import { RandomAstDataModel, RandomAstData } from "./random-ast-data"

test("can be created", () => {
  const instance: RandomAstData = RandomAstDataModel.create({})

  expect(instance).toBeTruthy()
})