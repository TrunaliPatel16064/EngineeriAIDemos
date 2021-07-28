import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { Alert, TextStyle, View, ViewStyle } from "react-native"
import { Screen, Text, Header, TextField, Button } from "../../components"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color, spacing, typography } from "../../theme"
import { useNavigation } from "@react-navigation/native"
import { translate } from "../../i18n"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.offWhite,
  flex: 1,
}
const CONTAINER: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  marginHorizontal: 20,
}
const INPUT: TextStyle = {
  borderWidth: 1,

  borderColor: color.palette.white,
  color: color.palette.black,
}
const SUBMIT: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
}
const SUBMIT_TEXT: TextStyle = {
  fontWeight: "bold",
  fontSize: 16,
  textTransform: "uppercase",
  fontFamily: typography.secondary,
}

export const CountryInputScreen = observer(function CountryInputScreen() {
  const { countyStore } = useStores()
  const navigation = useNavigation()
  const [countryValue, setCountryValue] = useState("")
  const [isValidValue, setValidValue] = useState(false)
  const [loading, setLoading] = useState(false)

  const onChangeText = (text) => {
    text ? setValidValue(true) : setValidValue(false)
    setCountryValue(text)
  }

  const onSubmitPress = async () => {
    setLoading(true)
    await countyStore.fetchCountryDetail(countryValue)
  }

  useEffect(() => {
    if (loading) {
      if (countyStore.countryDetail) {
        navigation.navigate("countryDetail")
      } else {
        Alert.alert("data not found")
      }
      setLoading(false)
    }
  }, [countyStore.countryDetail])
  return (
    <Screen style={ROOT} preset="scroll">
      <Header leftIcon={"back"} headerText={translate("countryInput.header")} />
      <View style={CONTAINER}>
        <TextField
          placeholder={translate("countryInput.placeholder")}
          inputStyle={INPUT}
          value={countryValue}
          onChangeText={(text) => {
            onChangeText(text)
          }}
        />
        <Button
          isLoading={loading}
          disabled={!isValidValue ? true : false}
          style={[
            SUBMIT,
            { backgroundColor: !isValidValue ? color.palette.lighterGrey : color.primary },
          ]}
          text={translate("countryInput.submit")}
          textStyle={SUBMIT_TEXT}
          onPress={() => {
            onSubmitPress()
          }}
        />
      </View>
    </Screen>
  )
})
