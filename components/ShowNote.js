import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Image, ScrollView, TouchableOpacity } from 'react-native';
const ShowNote = ({ route, navigation }) => {
    const data = route.params;
    const [userData, setUserData] = useState({});
    // const storeData = async (value) => {
    //     try {
    //         const jsonValue = JSON.stringify(value)
    //         await AsyncStorage.setItem('notesAndUserData', jsonValue)
    //     } catch (e) {
    //         // saving error
    //     }
    // }
    // useEffect(() => {
    //     getData();
    // }, []);
    // const getData = async () => {
    //     try {
    //         const jsonValue = await AsyncStorage.getItem('notesAndUserData');
    //         const data = jsonValue && JSON.parse(jsonValue);
    //         console.log(data);
    //         setUserData(data);
    //         console.log(userData);
    //         return data;
    //     } catch (e) {
    //         // error reading value
    //     }
    // }
    // React.useLayoutEffect(() => {
    //     navigation.setOptions({
    //         headerRight: () => (
    //             <Button onPress={() => {
    //                 console.log("Log out pressed",userData);
    //                 userData.currentUser.username = '';
    //                 storeData(userData);
    //                 navigation.navigate('Login');
    //             }} title="Logout" />
    //         ),
    //     });
    // }, [navigation, userData]);
    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={{ fontSize: 15, fontWeight: 'bold', padding: 6, margin: 3, marginVertical: 20, borderColor: 'red', borderWidth: 1, backgroundColor: '#FFD580' }}>{data.title}</Text>
                <View style={{ borderWidth: 1, height: 450, borderColor: 'grey', backgroundColor: '#FFFDD9' }}>
                    <Text style={{ fontWeight: 'normal',padding:10,paddingVertical:15 }}>{data.description}</Text>
                </View>
                <TouchableOpacity
                    style={styles.savebutton}
                    onPress={() => {
                        navigation.goBack()
                    }
                    }
                >
                    <Text>Back</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 0,
        padding: 0,
        flex: 1,
        flexDirection: 'column'
    },
    savebutton: {
        marginTop: 'auto',
        alignItems: "center",
        backgroundColor: "yellowgreen",
        padding: 10
    }
});
export default ShowNote;
