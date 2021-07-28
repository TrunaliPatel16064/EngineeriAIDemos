import { PostListModel, PostList } from "./post-list"

test("can be created", () => {
  const instance: PostList = PostListModel.create({})

  expect(instance).toBeTruthy()
})