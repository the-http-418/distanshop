import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Component } from 'react';
import { Image,StyleSheet, Text, View,TouchableOpacity,Alert} from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
//import { Avatar } from "react-native-elements";
import { SafeAreaView,FlatList} from 'react-native';
import Constants from 'expo-constants';
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    shop_name: 'Hari Vegetable Mart',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    shop_name: 'Loyal City Market',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    shop_name: 'Top n Town Superstore',
  },
];

function Item({ shop_name }) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{shop_name}</Text>
    </View>
  );
}


export default class ShopListScreen extends Component {
  state = {
  		longitude:null,
      latitude:null
  	};
    findCoordinates = () => {
		navigator.geolocation.getCurrentPosition(
			position => {
        const longitude = JSON.stringify(position.coords.longitude);
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
					<Text style={styles.welcome}>Longitude: {this.state.longitude}</Text>
          <Text style={styles.welcome}>Latitude: {this.state.latitude}</Text>
				</TouchableOpacity>
    </View>
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => <Item shop_name={item.shop_name} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
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
    marginTop: Constants.statusBarHeight,
  },
  welcome: {
    fontSize:18
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
  item: {
    backgroundColor: '#000000',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
    color:'#C0C0C0'
  },
});
