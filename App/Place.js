import React, { Component } from 'react';
import {
    Text, View, StyleSheet, Dimensions,
    Image,
    AppRegistry,
    TouchableHighlight,
    ScrollView
    } from 'react-native';

const { width,height } = Dimensions.get("window");

export default class Place extends Component {


    constructor(props){
        super(props);

        this.loadComponent = this.loadComponent.bind(this);
        this.state = {load :false};
        console.log("Loading!!!")

    }

    loadComponent(component){

//               this.props.loadReserve("CAB",component);
                alert("A Great Place To Visit")

    }

    componentDidMount(){
            console.log("Fetching Places Details")
            fetch(this.props.url+'data/place/list', {
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
                                  this.setState({places : responseJson.places,
                                  load : true
                                  });
                            }
                            })
                      .catch((error) => {
                            console.error(error);
                            this.state = {places : 'CARS Retrieval Failed !'};
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

            let places =null;
            if(this.state.load){
                places = this.state.places.map(place => (
                         <TouchableHighlight onPress={()=> this.loadComponent(place)} style={tileStyle.sizesWrap} key={place.Lat + place.Lang} >
                            <View style={styles.body}>
                            <Image source={{uri:place.Image}} style={styles.item ,tileStyle.sizesIcon } />
                                <View style= {tileStyle.details}>
                                <Text style={{fontSize : width/25}}> Name      :{place.Name}</Text>
                                <Text style={{fontSize : width/25}}> Latitude  :{place.Lat}</Text>
                                <Text style={{fontSize : width/25}}> Longitude   :{place.Lang}</Text>

                                </View>
                            </View>
                         </TouchableHighlight>
                                        ));
            }
    return (

            <ScrollView style={{marginTop : 40}}>
            {places}
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
     justifyContent: "flex-start", flexDirection: "row", flexWrap: "wrap",backgroundColor:'#3b5998',
         height: 9*height/10,
         width: width-5,
         alignItems: 'center',
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