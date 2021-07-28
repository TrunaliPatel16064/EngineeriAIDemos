import { GeneralApiProblem } from "./api-problem"

export interface User {
  id: number
  name: string
}

export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem
export type GetRandomAstDataResult = { kind: "ok"; data: any } | GeneralApiProblem
export type GetRandomAstIDResult = { kind: "ok"; data: any } | GeneralApiProblem
export type GetPosts = { kind: "ok"; post: any } | GeneralApiProblem
export type GetCountryDetail = { kind: "ok"; country: any } | GeneralApiProblem



