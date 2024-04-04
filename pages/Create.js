import { useState } from 'react';
import { Image, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';
import CustomInput from '../components/CustomInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { AuthContext } from '../context/AuthContext';
import { db, storage } from '../firebase';
import * as Crypto from 'expo-crypto';
import { getStorage, ref, uploadBytes } from "firebase/storage";



const types = [
    { label: 'Sports', value: 'Sports' },
    { label: 'Recreation', value: 'Recreation' },
    { label: 'Card Games', value: 'Card Games' },
    { label: 'Video Games', value: 'Video Games' },
    { label: 'Other', value: 'Other' },
    { label: 'Leisure', value: 'Leisure' },
    { label: 'Event', value: 'Event' },
    { label: 'Meal', value: 'Meal' },
];


const Create = () => {
    const [type, setType] = useState("");
    const [desc, setDesc] = useState("");
    const [location, setLocation] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [blob, setBlob] = useState(null)
    const [start, setStart] = useState(new Date())
    const [end, setEnd] = useState(new Date())
    

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage({ uri: result.assets[0].uri })
        } else {
            alert('You did not select any image.');
        }
        const response = await fetch(result.assets[0].uri)
        const b = await response.blob()
        setBlob(b)
    };

    const onCreate = async () => {
        const UUID = Crypto.randomUUID();
        const imgUrl = `images/activities/${UUID}`
        const imagesRef = ref(storage, imgUrl);

        try {
            const snapshot = await uploadBytes(imagesRef, blob)
            console.log(snapshot);
        }
        catch (err) {
            console.log(err)
        }

        const activity = {
            type: type,
            desc: desc,
            image: imgUrl,
            start: start,
            end: end,
        }
    }

    const onStartChanged = (event, date) => {
        if (event.type == "set") {
            const d = new Date(date);
            setStart(d);
        }
    }

    const onEndChanged = (event, date) => {
        if (event.type == "set") {
            const d = new Date(date);
            setEnd(d);
        }
    }


    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAwareScrollView>
                <View style={styles.inner}>
                    <View style={styles.inputs}>
                        <Text style={styles.title}>Create Event</Text>
                        <Dropdown style={styles.dropdown} itemContainerStyle={styles.itemContainer} labelField={"label"} valueField={"value"} placeholder='Select the type of activity' data={types} maxHeight={300} value={type} onChange={setType} />
                        <CustomInput name="Location" headerEnabled placeholder="Where will your event be?" onChangeText={setLocation}/>
                        <CustomInput multiline name="Description" headerEnabled placeholder="What is this event?" onChangeText={setDesc} />
                        <View style={styles.row}>
                            <Text style={{ fontSize: 20 }}>From</Text>
                            <DateTimePicker minuteInterval={15} timeZoneOffsetInMinutes={-5 * 60}  minimumDate={new Date()} onChange={onStartChanged} mode="datetime" value={start} />
                        </View>
                        <View style={styles.row}>
                            <Text style={{ fontSize: 20 }}>To</Text>
                            <DateTimePicker minuteInterval={15} timeZoneOffsetInMinutes={-5 * 60} minimumDate={new Date()} onEndChanged={onEndChanged} mode="datetime" value={end} />
                        </View>

                    </View>

                    {selectedImage == null ? <TouchableOpacity onPress={pickImageAsync} style={styles.image} /> : <Image style={styles.image} source={selectedImage} />}


                </View>
            </KeyboardAwareScrollView>
            <TouchableOpacity onPress={onCreate} style={styles.bottomButton}>
                <Text>Create</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Create

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
    },
    inner: {
        backgroundColor: "#FFF",
        paddingHorizontal: 10,
        alignItems: "center",
        height: "100%"
    },
    inputs: {
        flex: 1,
        gap: 20,
        width: "100%"
    },
    title: {
        fontSize: 36,
        fontWeight: "bold"
    },
    dropdown: {
        height: 50,
        borderBottomWidth: 1,
        paddingHorizontal: 8,
    },
    itemContainer: {
        borderBottomWidth: 1
    },
    bottomButton: {
        position: 'absolute',
        bottom: 0,
        width: "100%",
        backgroundColor: "#e28f66",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 15,
        borderRadius: 5
    },
    image: {
        marginTop: 20,
        borderWidth: 1,
        width: "80%",
        aspectRatio: 1,
        backgroundColor: "#aaa",
        borderRadius: 10,
        resizeMode: "cover"
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        height: 40,
        alignItems: "center"
    }
})