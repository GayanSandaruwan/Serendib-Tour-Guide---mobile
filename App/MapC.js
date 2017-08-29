import MapView from 'react-native-maps';
import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button, Dimensions
} from 'react-native';

const { width,height } = Dimensions.get("window");

export default class Map extends Component {


    constructor(props){
        super(props);

        //this.loadHome = this.loadHome.bind(this);
        this.state = {load : false,
                        latitude : "7.1870",
                        longitude : "79.8209"
                        };

    }

    componentDidMount(){


            this.loadLocationDetails();


    }

    loadLocationDetails(){

                navigator.geolocation.getCurrentPosition(
                  (position) => {
                    console.log("getCurrentPosition Success");
                    this.setState({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                  },
                  (error) => {
    //                this.props.displayError("Error dectecting your location");
                    alert(JSON.stringify(error))
                  },
                  {enableHighAccuracy: true, timeout: 50000, maximumAge: 1000}
                );


                    fetch(this.props.url+'data/place/distances', {
                               method: 'POST',
                               headers: {
                                 'Accept': 'application/json',
                                 'Content-Type': 'application/json',
                               },
                               body: JSON.stringify({
                                    lat : this.state.latitude,
                                    lang : this.state.longitude
                                })
                             })
                              .then((response) => response.json())

                              .then((responseJson) => {
                                    if(responseJson){
                                          console.log(responseJson);
                                          this.setState({markers : responseJson,
                                          load : true
                                          });
                                    }
                                    })
                              .catch((error) => {
                                    console.error(error);
                                    this.state = {locations : 'Locations Retrieval Failed !'};
                        });
    }






  render() {

      let markers = null;
    if(this.state.load){
             markers= this.state.markers.map(marker => (
                        <MapView.Marker

                          coordinate={{latitude:marker.lat, longitude:marker.lang}}
                          title={marker.name}
                          description={marker.distance +" "+ marker.time}
                          key={marker.distance+marker.time}

                        />
                      ));
            }
    return (
      <View style ={styles.container}>
        <MapView
          style={styles.map}
          showsUserLocation={true}
          showsMyLocationButton={true}
          region={{
            latitude: 6.9271,
            longitude: 79.8612,
            latitudeDelta: 0.05,
            longitudeDelta: 0.9,
          }}
        >

            {markers}

        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
     justifyContent: "flex-start", flexDirection: "row", flexWrap: "wrap",backgroundColor:'#3b5998',
         height: 9*height/10 -10,
         width: width-5,
         alignItems: 'center',

  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
