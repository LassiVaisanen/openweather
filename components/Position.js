import * as Location from 'expo-location'
import Weather from './Weather'
import { useEffect, useState} from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';

export default function Position() {
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [message, setMessage] = useState('Retrieving location');
    const [isLoading, setIsLoading] = useState(true);

    const [error, setError] = useState(null);


    useEffect(() => {
        (async() => {
            let {status} = await Location.requestForegroundPermissionsAsync()
            console.log(status)
            try{
                if(status !== 'granted') {
                    setMessage("Location not permitted.")

                } else {
                    const position = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High})
                    setLatitude(position.coords.latitude)
                    setLongitude(position.coords.longitude)
                    setMessage('Location retrieved.');
                    //console.log(message);
                }
            } catch (error) {
                setMessage("Error retrieving location.")
                console.log(error)
            }
            setIsLoading(false);
            //console.log("Loading done");
        })()
    }, [])

    if(error) {
        return (
            <View style={styles.container}>
                <Text style={styles.heading}>Error retrieving the weather</Text>
            </View> )
    }
    else if(isLoading) {
        return (
            <View style={styles.container}>
                <Text style={styles.heading}>Loading weather information...</Text>
                <ActivityIndicator size = "large"></ActivityIndicator>
            </View> )
      }
    else {
        return (
            <View style = {styles.container}>
                <Text style={styles.coords}>{latitude.toFixed(3)}&#176;, {longitude.toFixed(3)}&#176;</Text>
                <Text style={styles.message}>{message}</Text>  
                <Weather latitude={latitude} longitude={longitude}/>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    coords: {
        fontSize: 20,
    },
    message: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    heading: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
  });