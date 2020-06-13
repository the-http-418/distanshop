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
    count:'3',
    total: '10',
    longitude:'77.736',
    latitude:'12.99'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    shop_name: 'Loyal City Market',
    count:'14',
    total: '15',
    longitude:'78.736',
    latitude:'13.99'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    shop_name: 'Top n Town Superstore',
    count:'5',
    total: '20',
    longitude:'77.746',
    latitude:'12.9888'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f64',
    shop_name: 'Star Bazaar',
    count:'17',
    total: '17',
    longitude:'78.7436',
    latitude:'13.989'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d75',
    shop_name: 'Village HyperMarket',
    count:'5',
    total: '15',
    longitude:'77.78846',
    latitude:'12.98788'
  },

];

function Item({ shop }) {
const {store_name,customer_count,max_customers,store_size,employee_count} = shop

  return (
    <View style={styles.item}>
      <Text style={styles.maintitle}>{store_name}</Text>
        <Text style={styles.title}>Filled Capacity : {customer_count} \ {max_customers} </Text>
        <Text style={styles.title}>Store Area (sq.ft) : {store_size} </Text>
        <Text style={styles.title}>Employee Count : {employee_count} </Text>
    </View>
  );
}


export default class StoreListScreen extends Component {
  state = {
  		longitude:null,
      latitude:null,
      dataSource:null,
      isLoading:true
  	};

    componentDidMount() {
        return fetch('https://http418-safely-app.herokuapp.com/get_store_data')
          .then(response => response.json())
          .then(responseJson => {
            this.setState(
              {
                isLoading: false,
                dataSource: responseJson.data,
              },
              function() {
                  console.log(this.state.dataSource)
              }

            );
          })
          .catch(error => {
            console.error(error);
          });
      }

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
    <Text style={styles.checkwelcome}> Click on store to Check Safety</Text>
    <SafeAreaView style={styles.container}>
      <FlatList
        data={this.state.dataSource}
        renderItem={({ item }) => <Item shop={item} />}
        keyExtractor={item => item.shop_name}
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
  checkwelcome: {
    fontSize:18,
    fontWeight:'bold',
    color:'green',
    textAlign:'center'
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
  maintitle: {
    fontSize: 18,
    fontWeight : 'bold',
    color:'#FFFFFF'
  },
  title: {
    fontSize: 16,
    color:'#C0C0C0'
  },
});
