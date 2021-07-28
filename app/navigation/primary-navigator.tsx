/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import React from "react"

import { createNativeStackNavigator } from "react-native-screens/native-stack"
import {
  WelcomeScreen,
  DemoScreen,
  RandomIdFormScreen,
  RandomAstDataDetailScreen,
} from "../screens"
import { CountryDetailScreen } from "../screens/country-detail-screen/country-detail-screen"
import { CountryInputScreen } from "../screens/country-input-screen/country-input-screen"
import { HomeScreen } from "../screens/home-screen/home-screen"
import { PostListDetailScreen } from "../screens/post-list-detail-screen/post-list-detail-screen"
import { PostListScreen } from "../screens/post-list-screen/post-list-screen"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type PrimaryParamList = {
  welcome: undefined
  demo: undefined
  randomAst: undefined
  randomAstDetail: undefined
  home: undefined
  postList: undefined
  postListDetail: undefined
  countryInput: undefined
  countryDetail: undefined
}

// Documentation: https://github.com/software-mansion/react-native-screens/tree/master/native-stack
const Stack = createNativeStackNavigator<PrimaryParamList>()

export function PrimaryNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
      initialRouteName="home"
    >
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="randomAst" component={RandomIdFormScreen} />
      <Stack.Screen name="welcome" component={WelcomeScreen} />
      <Stack.Screen name="demo" component={DemoScreen} />
      <Stack.Screen name="randomAstDetail" component={RandomAstDataDetailScreen} />
      <Stack.Screen name="postList" component={PostListScreen} />
      <Stack.Screen name="postListDetail" component={PostListDetailScreen} />
      <Stack.Screen name="countryInput" component={CountryInputScreen} />
      <Stack.Screen name="countryDetail" component={CountryDetailScreen} />
    </Stack.Navigator>
  )
}

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["welcome"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
