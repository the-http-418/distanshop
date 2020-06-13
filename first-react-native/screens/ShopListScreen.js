import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Component } from 'react';
import { Image,StyleSheet, Text, View,TouchableOpacity,Alert} from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
//import { Avatar } from "react-native-elements";


export default class ShopListScreen extends Component {
  state = {
  		longitude:null,
      latitude:null
  	};
    findCoordinates = () => {
		navigator.geolocation.getCurrentPosition(
			position => {
        const longitude = JSON.stringify(position.coords.longitude);
				//const location = JSON.parse(locationstr);
        //const longitude = locationstr.longitude
        //alert(location.longitude)
				//this.setState({ longitude });
        //const latitude = locationstr.latitude
        //alert(location.latitiude)
				this.setState({ longitude });
        const latitude = JSON.stringify(position.coords.latitude)
        this.setState({latitude});
			},
			error => Alert.alert(error.message),
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		);
	};

render()
{
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} onLoad={this.findCoordinates}>
      <View style={styles.welcomeContainer}>
      <TouchableOpacity onPress={this.findCoordinates}>
					<Text style={styles.welcome}>Find My Coords?</Text>
					<Text>Longitude: {this.state.longitude}</Text>
          <Text>Latitude: {this.state.latitude}</Text>
				</TouchableOpacity>
    </View>
    </ScrollView>
  );
}

}


const styles = StyleSheet.create({
  profdeet : {
    color:'black',
    fontSize : 18,
    textAlign:'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 15,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
});
