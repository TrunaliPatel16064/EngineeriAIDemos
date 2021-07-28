import React from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { Button, Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import { useNavigation } from "@react-navigation/native"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
  justifyContent: "center",
}

export const HomeScreen = observer(function HomeScreen() {
  const navigation = useNavigation()
  const renderButtons = (text, route) => {
    return (
      <Button
        text={text}
        onPress={() => {
          navigation.navigate(route)
        }}
        style={{ margin: 10 }}
        textStyle={{ padding: 10, fontSize: 18 }}
      />
    )
  }
  return (
    <Screen style={ROOT} preset="scroll">
      {renderButtons("RandomAstData", "randomAst")}
      {renderButtons("PostList", "postList")}
      {renderButtons("Country Input", "countryInput")}
    </Screen>
  )
})
