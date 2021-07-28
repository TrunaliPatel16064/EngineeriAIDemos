import React from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { Screen, Text, Header } from "../../components"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import { SvgUri } from "react-native-svg"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}
const CONTAINER: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}

export const CountryDetailScreen = observer(function CountryDetailScreen() {
  // Pull in one of our MST stores
  const { countyStore } = useStores()
  const { countryDetail } = countyStore

  function renderRows(title: string, value: any) {
    return (
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        <Text text={title + " : "} preset={"bold"} style={{ textTransform: "uppercase" }} />
        <Text text={value} style={{ fontSize: 16 }} preset={"default"} />
      </View>
    )
  }

  return (
    <Screen style={ROOT} preset="scroll">
      <Header headerText={"Country Detail"} />
      <View style={CONTAINER}>
        {renderRows("capital", countryDetail.capital)}
        {renderRows("population", countryDetail.population)}
        {renderRows("latlan", countryDetail.latlng[0] + " , " + countryDetail.latlng[1])}
        <SvgUri uri={countryDetail.flag} />
      </View>
    </Screen>
  )
})
