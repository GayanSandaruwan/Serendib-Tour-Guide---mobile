import React, { Component } from 'react';
import {
    Text, View, StyleSheet, Dimensions,
    Image,
    AppRegistry,
    TouchableHighlight,
    ScrollView
    } from 'react-native';

const { width } = Dimensions.get("window");

export default class Restaurant extends Component {


    constructor(props){
        super(props);

        this.loadComponent = this.loadComponent.bind(this);
        this.state = {load :false};
        console.log("Loading!!!")

    }

    loadComponent(component){

               this.props.loadReserve("REST",component);

    }

    componentDidMount(){
            console.log("Fetching Resturants Details")
            fetch(this.props.url+'data/resturant/list', {
                       method: 'GET',
                       headers: {
                         'Accept': 'application/json',
                         'Content-Type': 'application/json',
                       }

                     })
                      .then((response) => response.json())

                      .then((responseJson) => {
                            if(responseJson.message){
                                  console.log(responseJson);
                                  this.setState({restaurants : responseJson.resturants,
                                  load : true
                                  });
                            }
                            })
                      .catch((error) => {
                            console.error(error);
                            this.state = {restaurants : 'Restaurants Retrieval Failed !'};
                });

    }

  render() {

    const tileDimensions = calcTileDimensions(width, 2)  // -> change this number to change the Number of tiles per line

    const tileStyle = StyleSheet.create({

      sizesWrap: { width: width, height: tileDimensions.size,
                   marginHorizontal: tileDimensions.margin/3, marginBottom:tileDimensions.margin/4, backgroundColor :'white'
                    },
      sizesIcon:{  width: tileDimensions.size, height: tileDimensions.size-10,
                    },
      details:{ width:width- tileDimensions.size-tileDimensions.margin, height : tileDimensions.size,
                 justifyContent: "center", flexDirection: "row", flexWrap: "wrap"
      }
    });

            let restaurants =null;
            if(this.state.load){
                restaurants = this.state.restaurants.map(restaurant => (
                         <TouchableHighlight onPress={()=> this.loadComponent(restaurant)} style={tileStyle.sizesWrap} key={restaurant.Id} >
                            <View style={styles.body}>
                            <Image source={{uri: 'https://s-media-cache-ak0.pinimg.com/originals/d0/1d/fa/d01dfa8621f83289155a3be0970fb0cb.jpg'}} style={styles.item ,tileStyle.sizesIcon } />
                                <View style= {tileStyle.details}>
                                <Text style={{fontSize : width/25}}> Resturant : {restaurant.Name}</Text>
                                <Text style={{fontSize : width/25}}> Owner  :{restaurant.Owner}</Text>
                                <Text style={{fontSize : width/25}}> Cost   :{restaurant.Cost}</Text>
                                <Text style={{fontSize : width/25}}> Location   :{restaurant.Location}</Text>
                                </View>
                            </View>
                         </TouchableHighlight>
                                        ));
            }
    return (

            <ScrollView style={{marginTop : 40}}>
            {restaurants}
            </ScrollView>

              );
  }

}

const calcTileDimensions = (deviceWidth, tpr) => {
  const margin = deviceWidth / (tpr * 10);
  const size = (deviceWidth - margin * (tpr * 2)) / tpr;
  return { size, margin };
};

const styles = StyleSheet.create({
  container: {
     justifyContent: "flex-start", flexDirection: "row", flexWrap: "wrap", marginTop: 30,backgroundColor:'#3b5998'

  },
  item: {
    backgroundColor: 'yellow',
     alignSelf: "flex-start",
    flexDirection: "row", flexWrap: "wrap"
  },
  itemText: {
    fontSize: 20

//    fontWeight: 'bold'
  },
  head:{
       justifyContent: "flex-start", flexDirection: "row", flexWrap: "wrap", marginBottom:30
  },
    body:{
         justifyContent: "flex-start", flexDirection: "row", flexWrap: "wrap",
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold'
    },
});