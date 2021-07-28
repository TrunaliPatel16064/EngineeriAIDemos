import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
import {
  ViewStyle,
  FlatList,
  View,
  TextStyle,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native"
import { Screen, Text, Header } from "../../components"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import { toJS } from "mobx"
import { useNavigation } from "@react-navigation/native"

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
const SEPERATOR: ViewStyle = {
  borderTopWidth: 1,
  borderBottomWidth: 1,
  padding: 5,
  backgroundColor: color.palette.offWhite,
  borderTopColor: color.palette.lightGrey,
  borderBottomColor: color.palette.lightGrey,
}
const LISTCONTAINER: ViewStyle = {
  padding: 10,
}

export const PostListScreen = observer(function PostListScreen() {
  // Pull in one of our MST stores
  const { postListStore } = useStores()
  const { isLoading } = postListStore
  const navigation = useNavigation()

  useEffect(() => {
    postListStore.fetchPostListData()
    const interval = setInterval(() => {
      postListStore.fetchMoreData()
    }, 10000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  const onEndReached = () => {
    if (!isLoading) {
      postListStore.fetchMoreData()
    }
  }

  const onPress = async (item) => {
    postListStore.updatePostListDetail(item)
    navigation.navigate("postListDetail")
  }
  const ItemSeparatorComponent = () => {
    return <View style={SEPERATOR} />
  }
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

  const renderItem = (item: any, index: number) => {
    return (
      <TouchableOpacity
        style={LISTCONTAINER}
        onPress={() => {
          onPress(item)
        }}
      >
        {renderRows("title", item.title)}
        {renderRows("URL", item.url)}
        {renderRows("Created_At", item.created_at)}
      </TouchableOpacity>
    )
  }
  const footerComponent = () => {
    return <ActivityIndicator size={"small"} color={color.palette.black} />
  }

  return (
    <Screen style={ROOT} preset="scroll">
      <Header leftIcon={"back"} headerTx={"postList.header"} />
      <FlatList
        data={toJS(postListStore.postListData)}
        renderItem={({ item, index }) => renderItem(item, index)}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorComponent}
        onEndReachedThreshold={0.1}
        onEndReached={onEndReached}
        ListFooterComponent={footerComponent}
      />
    </Screen>
  )
})
