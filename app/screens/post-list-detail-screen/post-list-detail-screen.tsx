import React from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { Screen, Text, Header } from "../../components"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}
const ROWS: ViewStyle = {
  flexDirection: "row",
  flexWrap: "wrap",
  marginVertical: 10,
}
const TITLE: TextStyle = {
  textTransform: "capitalize",
  fontSize: 16,
}
const CONTAINER: ViewStyle = {
  margin: 20,
}

export const PostListDetailScreen = observer(function PostListDetailScreen() {
  // Pull in one of our MST stores
  const { postListStore } = useStores()
  const { postListDetail } = postListStore

  const renderRows = (title: string, value: any) => {
    return (
      <View style={ROWS}>
        <Text>
          <Text preset={"bold"} style={TITLE}>
            {title + " : "}
          </Text>
          {value}
        </Text>
      </View>
    )
  }
  return (
    <Screen style={ROOT} preset="scroll">
      <Header leftIcon={"back"} headerText={"postListDetail.header"} />
      <View style={CONTAINER}>
        {renderRows("title", postListDetail.title)}
        {renderRows("URL", postListDetail.url)}
        {renderRows("Created_At", postListDetail.created_at)}
      </View>
    </Screen>
  )
})
