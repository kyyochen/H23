import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Event from '../components/Event';

const Home = () => {
    const tabBarHeight = useBottomTabBarHeight();

    return (
        <SafeAreaView style={[styles.container]}>
            <ScrollView>
                <Event title="Title text" location="N/A" time="Always"/>
                <Event title="Title text" location="N/A" time="Always"/>
                <Event title="Title text" location="N/A" time="Always"/>
                <Event title="Title text" location="N/A" time="Always"/>
            </ScrollView>
        </SafeAreaView>

    )
}   

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e28f66"
    }
})