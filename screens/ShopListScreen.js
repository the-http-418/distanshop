import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Component } from 'react';
import { Image,StyleSheet, Text, View,TouchableOpacity,Alert} from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
//import { Avatar } from "react-native-elements";
import { SafeAreaView,FlatList} from 'react-native';
import Constants from 'expo-constants';
function Item({ shop }) {
const {store_name,discount_percentage,start,end,offer_name,product} = shop

  return (
    <View style={styles.item}>
      <Text style={styles.maintitle}>{offer_name}</Text>
      <Text style={styles.title}>Store: {store_name} </Text>
      <Text style={styles.title}>Product: {product} </Text>
      <Text style={styles.title}>Discount : {discount_percentage} % off </Text>
        <Text style={styles.title}>Offer Period : {start} - {end} </Text>
    </View>
  );
}


export default class StoreListScreen extends Component {
  state = {
      dataSource:null,
      isLoading:true,
      test: false
  	};
async getStores()
{
  fetch('https://http418-safely-app.herokuapp.com/get_offer_data')
    .then(response => response.json())
    .then(responseJson => {
      this.setState(
        {
          isLoading: false,
          dataSource: responseJson.data,
        },
        function() {
            //console.log(this.state.dataSource)
        }

      );
    })
    .catch(error => {
      console.error(error);
    });
}
    componentDidMount() {
        this.timer = setInterval(()=> this.getStores(), 1000)
      }


render()
{
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} onLoad={this.findCoordinates}>
    <Text style={styles.checkwelcome}> Latest Offers in Stores Near You!</Text>
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
    borderColor:'red',
    borderWidth:5,
    borderStyle:'dashed'
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
