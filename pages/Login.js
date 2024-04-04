import { Image, StyleSheet, Text, TouchableOpacity, View, Keyboard, Pressable } from 'react-native'
import CustomInput from '../components/CustomInput'
import { auth } from '../firebase'
import { useContext, useState } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from '../context/AuthContext';

const brandImg = require("../assets/Brand.png")

const Login = ({navigation}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {loggedIn, setUser} = useContext(AuthContext)

    const onLogin = async () => {
        try {
            const cred = await signInWithEmailAndPassword(auth, email, password);

            setUser(cred.user);
            console.log(user)
            setUser(cred.user)
        }
        catch (error) {
            console.log(error);
        }
        
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Image style={styles.image} source={brandImg} />
            </View>
            <View style={styles.inputContainer}>
                <CustomInput onChangeText={setEmail} headerEnabled name={"Email"} placeholder={"awesome@example.com"} />
                <CustomInput onChangeText={setPassword} secure headerEnabled name={"Password"} placeholder={"Don't share this!"} />
            </View>
            <View style={styles.submitContainer}>
                <TouchableOpacity style={styles.buttonContainer} onPress={onLogin}>
                    <Text style={styles.submitText}>
                        Login
                    </Text>
                </TouchableOpacity>
                <Text style={styles.extra} onPress={() => {navigation.navigate("Register")}}>
                    Don't have an account yet? <Text style={styles.link}> Register</Text>
                </Text>
            </View>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        alignItems: "center",
        backgroundColor: "#FFF",
        flex: 1
    },
    image: {
        height: 100,
        resizeMode: "contain",

    },
    titleContainer: {
        paddingTop: 60,
        paddingBottom: 80
    },
    inputContainer: {
        paddingHorizontal: 20,
        width: "100%",
        gap: 20,
        marginBottom: 20
    },
    buttonContainer: {
        backgroundColor: "#e28f66",
        width: "100%",
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5
    },
    submitContainer: {
        paddingHorizontal: 20,
        width: "100%",
        alignItems: "center"
    },
    submitText: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: 400
    },
    extra: {
        fontSize: 16,
        marginTop: 10
    },
    link: {
        color: "#e28f66"
    }
})