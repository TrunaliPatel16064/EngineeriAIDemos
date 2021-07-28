import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { Button, Screen, Text, TextField, Header } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import { translate } from "i18n-js"

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
  height: 50,
  backgroundColor: color.palette.white,
  borderColor: color.palette.white,
  padding: 10,
  color: color.palette.black,
}
const BUTTON: ViewStyle = {
  marginVertical: 10,
  minHeight: 40,
}
const BUTTON_TEXT: TextStyle = {
  textTransform: "uppercase",
  fontSize: 14,
  fontWeight: "bold",
}

export const RandomIdFormScreen = observer(function RandomIdFormScreen() {
  const [id, setID] = useState("")
  const [validID, setValidId] = useState(false)

  const { randomAstDataStore } = useStores()
  const navigation = useNavigation()

  useEffect(() => {
    randomAstDataStore.randomId ? setValidId(true) : setValidId(false)
  }, [randomAstDataStore.randomId])

  const onChangeText = (text) => {
    randomAstDataStore.updateID(text)
  }

  const onSubmitPress = async () => {
    await randomAstDataStore.fetchRandomData()
    navigation.navigate("randomAstDetail")
  }

  const onRandomAsID = async () => {
    await randomAstDataStore.fetchRandomAstID()
  }
  return (
    <Screen style={ROOT} preset="scroll">
      <Header leftIcon={"back"} />
      <View style={CONTAINER}>
        <TextField
          value={randomAstDataStore.randomId}
          placeholderTx={"randomAst.placeholder"}
          inputStyle={INPUT}
          onChangeText={(text) => {
            onChangeText(text)
          }}
        />
        <Button
          isLoading={randomAstDataStore.isLoading}
          disabled={!validID}
          tx={"randomAst.submit"}
          style={[BUTTON, { backgroundColor: !validID ? color.palette.lightGrey : color.primary }]}
          textStyle={BUTTON_TEXT}
          onPress={() => {
            onSubmitPress()
          }}
        />
        <Button
          isLoading={randomAstDataStore.isRandomID}
          tx={"randomAst.randomAsteroidID"}
          style={BUTTON}
          textStyle={BUTTON_TEXT}
          onPress={() => {
            onRandomAsID()
          }}
        />
      </View>
    </Screen>
  )
})
