import { useEffect, useState } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { Image } from 'expo-image';

const api = {
  url: process.env.EXPO_PUBLIC_API_URL,
  key: process.env.EXPO_PUBLIC_API_KEY,
  icons: process.env.EXPO_PUBLIC_ICONS_URL
}


export default function Weather(props) {

    const [temp, setTemp] = useState(0.0);
    const [description, setDescription] = useState('');
    const [icon, setIcon] = useState('');

    useEffect(() => {
        const url = api.url +
        'lat=' + props.latitude +
        '&lon='+ props.longitude  +
        '&units=metric' +
        //'&lang=fi' +
        '&appid=' + api.key

        console.log(url)

        fetch(url)
        .then(res => res.json())
        .then((json) => {
            setTemp(json.main.temp)
            setDescription(json.weather[0].description)
            setIcon(api.icons + json.weather[0].icon + '@2x.png')
        })
        .catch((error) => {
            setDescription("Error retrieving weather information.")
            console.log(error)
        })
    }, [])



  return (
    <View style = {styles.container}>
      <Text style = {styles.temp}>{temp}&#x2103;</Text>
        {icon &&
          <Image source = {{uri: icon}} style= {{width: 100, height: 100}} />
        }
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    image: {
      flex: 1,
      width: '100%',
      backgroundColor: '#0553',
    },
    temp: {
      fontSize: 20,
    },
    description: {
      fontSize: 20,
    }
  });