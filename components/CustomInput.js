import { StyleSheet, Text, TextInput, View } from 'react-native'


const CustomInput = ({ placeholder, name, headerEnabled, onChangeText, type, secure, multiline }) => {
    return (
        <View style={styles.container}>
            {headerEnabled && <Text>{name}</Text>}
            <TextInput multiline={multiline} secureTextEntry={secure} keyboardType={type} onChangeText={(text) => {onChangeText(text)}} style={styles.input} placeholder={placeholder} />
        </View>
    )
}

export default CustomInput

const styles = StyleSheet.create({
    container: {

    },
    input: {
        width: "100%",
        height: 30,
        borderBottomWidth: 1,
        marginTop: 4,
        borderColor: "#777"
    }
})