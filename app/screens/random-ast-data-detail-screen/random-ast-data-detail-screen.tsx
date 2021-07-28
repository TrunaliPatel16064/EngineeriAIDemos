import React from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, TextStyle } from "react-native"
import { Header, Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import _ from "lodash"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}
const CONTAINER: ViewStyle = {
  flex: 1,
  margin: 20,

  // justifyContent: "center",
  // alignItems: "center",
}
const ROW: ViewStyle = {
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 10,
}
const TITLE: TextStyle = {
  textTransform: "capitalize",
  fontSize: 16,
}

export const RandomAstDataDetailScreen = observer(function RandomAstDataDetailScreen() {
  // Pull in one of our MST stores
  const { randomAstDataStore } = useStores()
  console.log("randomA===", randomAstDataStore.randomAstData)
  const { randomAstData } = randomAstDataStore

  const name = _.get(randomAstData, "name", "------")
  const nasaJplUrl = _.get(randomAstData, "nasa_jpl_url", "------")
  const isPotentiallyHazardousAsteroid = _.get(
    randomAstData,
    "is_potentially_hazardous_asteroid",
    "",
  )

  const renderRows = (title: string, value: any) => {
    return (
      <View style={ROW}>
        <Text preset={"default"}>
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
      <Header
        leftIcon={"back"}
        headerTx={"randomAstDetail.header"}
        titleStyle={{ fontWeight: "bold" }}
      />
      <View style={CONTAINER}>
        {renderRows("name", name)}
        {renderRows("nasa_jpl_url", nasaJplUrl)}
        {renderRows(
          "isPotentiallyHazardousAsteroid",
          isPotentiallyHazardousAsteroid === true ? "Yes" : "No",
        )}
      </View>
    </Screen>
  )
})
