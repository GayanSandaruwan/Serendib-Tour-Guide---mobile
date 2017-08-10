import React, { Component } from 'react';
import {
    Text, View, StyleSheet, Dimensions,
    Image,
    AppRegistry,
    TouchableHighlight,
    ScrollView
    } from 'react-native';

const { width } = Dimensions.get("window");

export default class Guide extends Component {


    constructor(props){
        super(props);

        this.loadComponent = this.loadComponent.bind(this);
        this.state = {load :false};
        console.log("Loading!!!")

    }

    loadComponent(component){

               this.props.loadReserve("GUIDE",component);

    }

    componentDidMount(){
            console.log("Fetching GUIDES Details")
            fetch(this.props.url+'data/guide/list', {
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
                                  this.setState({guides : responseJson.guides,
                                  load : true
                                  });
                            }
                            })
                      .catch((error) => {
                            console.error(error);
                            this.state = {guides : 'CARS Retrieval Failed !'};
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
                places = this.state.guides.map(guide => (
                         <TouchableHighlight onPress={()=> this.loadComponent(guide)} style={tileStyle.sizesWrap} key={guide.NIC} >
                            <View style={styles.body}>
                            <Image source={{uri:guide.Image}} style={styles.item ,tileStyle.sizesIcon } />
                                <View style= {tileStyle.details}>
                                <Text style={{fontSize : width/25}}> Cost   :{guide.Cost}</Text>
                                <Text style={{fontSize : width/25}}> Name  :{guide.Name}</Text>
                                <Text style={{fontSize : width/25}}> Age   :{guide.Age}</Text>
                                <Text style={{fontSize : width/25}}> NIC :{guide.NIC}</Text>
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