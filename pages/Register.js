import { Image, StyleSheet, Text, TouchableOpacity, View, Keyboard, KeyboardAvoidingView, Pressable, ScrollView } from 'react-native'
import CustomInput from '../components/CustomInput';
import { useContext, useState } from 'react';
import { auth, db, userRef } from '../firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { AuthContext } from '../context/AuthContext';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


const brandImg = require("../assets/Brand.png")

const Register = ({ navigation }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [number, setNumber] = useState("")
    const [username, setUsername] = useState("")
    const {u, setUser} = useContext(AuthContext)

    const onRegister = async () => {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        const user = cred.user;
        
        if(user) {
            try {
                const document = doc(db, "users", user.uid)
                const data = {
                    id: user.uid,
                    email: email,
                    name: name,
                    phone: number,
                    username: username,
                }

                await setDoc(document, data);

                setUser(user);

            }
            catch(err) {
                console.log(err)
            }
        }
        
    }

    return (
        <KeyboardAwareScrollView>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Image style={styles.image} source={brandImg} />
                </View>
                <View style={styles.inputContainer}>
                    <CustomInput onChangeText={setName} headerEnabled name={"Name"} placeholder={"Your name"} />
                    <CustomInput onChangeText={setUsername} headerEnabled name={"Username"} placeholder={"Ryan Reynolds"} />
                    <CustomInput onChangeText={setEmail} headerEnabled name={"Email"} placeholder={"awesome@example.com"} />
                    <CustomInput onChangeText={setNumber} headerEnabled type={"number-pad"} name={"Phone Number"} placeholder={"This helps us connect you with people"} />
                    <CustomInput onChangeText={setPassword} secure headerEnabled name={"Password"} placeholder={"Don't share this!"} />
                </View>
                <View style={styles.submitContainer}>
                    <TouchableOpacity style={styles.buttonContainer} onPress={onRegister}>
                        <Text style={styles.submitText}>
                            Register
                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.extra} onPress={() => { navigation.navigate("Login") }}>
                        Already have an account? <Text style={styles.link}> Login</Text>
                    </Text>
                </View>
            </View> 
        </KeyboardAwareScrollView>
        
    )
}

export default Register

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