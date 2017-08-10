import React, { Component } from 'react';
import {
    Text, View, StyleSheet, Dimensions,
    Image,
    AppRegistry,
    TouchableHighlight
    } from 'react-native';

const { width } = Dimensions.get("window");

export default class Home extends Component {


    constructor(props){
        super(props);

        this.loadComponent = this.loadComponent.bind(this);

    }

    loadComponent(component){

               this.props.loadComponent(component);

    }

  render() {

    const tileDimensions = calcTileDimensions(width, 2)  // -> change this number to change the Number of tiles per line

    const tileStyle = StyleSheet.create({

      sizesWrap: { width: tileDimensions.size, height: tileDimensions.size,
                   marginHorizontal: tileDimensions.margin, marginBottom:tileDimensions.margin
                    },
      sizesIcon:{  width: tileDimensions.size, height: tileDimensions.size-10,
                    }
    });

    return (

          <View style={styles.container}>
            <View style ={styles.item ,tileStyle.sizesWrap}>
                 <TouchableHighlight onPress={()=> this.loadComponent("REST")}>
                    <Image source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}} style={styles.item ,tileStyle.sizesIcon } />
                 </TouchableHighlight>
                 <Text style={styles.itemText}>
                      Resturant
                 </Text>
            </View>
            <View style ={styles.item ,tileStyle.sizesWrap}>
                 <TouchableHighlight onPress={()=> this.loadComponent("CAB")}>
                    <Image source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}} style={styles.item ,tileStyle.sizesIcon } />
                 </TouchableHighlight>
                 <Text style={styles.itemText}>
                      Grab A Cab
                 </Text>
            </View>
            <View style ={styles.item ,tileStyle.sizesWrap}>
                 <TouchableHighlight onPress={()=> this.loadComponent("GUIDE")}>
                    <Image source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}} style={styles.item ,tileStyle.sizesIcon } />
                 </TouchableHighlight>
                 <Text style={styles.itemText}>
                   Your Guide
                </Text>
            </View>
            <View style ={styles.item ,tileStyle.sizesWrap}>
                 <TouchableHighlight onPress={()=> this.loadComponent("TRIPS")}>
                    <Image source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}} style={styles.item ,tileStyle.sizesIcon } />
                 </TouchableHighlight>
                 <Text style={styles.itemText}>
                       Day trips
                  </Text>
            </View>
            <View style ={styles.item ,tileStyle.sizesWrap}>
                 <TouchableHighlight onPress={()=> this.loadComponent("PLACE")}>
                    <Image source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}} style={styles.item ,tileStyle.sizesIcon } />
                 </TouchableHighlight>
                 <Text style={styles.itemText}>
                     Places To Visit
                </Text>
            </View>
            <View style ={styles.item ,tileStyle.sizesWrap}>
                 <TouchableHighlight onPress={()=> this.loadComponent("WHET")}>
                    <Image source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}} style={styles.item ,tileStyle.sizesIcon } />
                 </TouchableHighlight>
                 <Text style={styles.itemText}>
                     Wheather
                </Text>
            </View>
          </View>

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
     alignItems: 'center',
     justifyContent: 'center',
     marginBottom: 10
  },
  itemText: {
    fontSize: 20,
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