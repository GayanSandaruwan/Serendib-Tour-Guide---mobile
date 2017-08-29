/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button, Dimensions
} from 'react-native';
const { width,height } = Dimensions.get("window");


import SignIn from './App/SignIn.js';
import Home from './App/Home.js';
import Map from './App/MapC.js';
import Restaurant from './App/Restaurant.js';
import Car from './App/Car.js';
import Guide from './App/Guide.js';
import Place from './App/Place.js';
import Reserve from './App/Reserve.js';
import HeaderM from './App/Header.js';
import RegisterUser from './App/RegisterUser.js';


let RenderingComponent  =  null;
let urlPrefix = "http://192.168.0.117:3001/";
console.disableYellowBox = true;


export default class SerendibTourGuide extends Component {


    constructor(props){
        super(props);

        this.loadHome = this.loadHome.bind(this);
        this.state = {view : "START", user : null};
        this.loadComponent = this.loadComponent.bind(this);
        this.loadReserve = this.loadReserve.bind(this);
    }
    componentDidMount() {
        RenderingComponent = <SignIn url= {urlPrefix} loadHome ={this.loadHome} loadComponent={this.loadComponent}/>;

        console.log("Starting Application");
        this.setState({view : "AUTH"});
    }

    loadComponent(comp){
        console.log("Loading Component... :" +comp);
        if(comp == null){
        }
        if(comp == "REST"){
            console.log("REST");
            RenderingComponent =
                        <View style={styles.header}>
                            <HeaderM loadHome={this.loadHome} user={this.state.user} loadComponent={this.loadComponent} comp={comp}/>
                            <Restaurant url={urlPrefix} loadReserve={this.loadReserve}/>
                         </View>;
            this.setState({view : "REST"});
        }
        else if(comp == "CAB"){
            console.log("CAB");
            RenderingComponent =
                        <View style={styles.header}>
                            <HeaderM loadHome={this.loadHome} user={this.state.user} loadComponent={this.loadComponent} comp={comp}/>
                            <Car url={urlPrefix} loadReserve={this.loadReserve}/>
                         </View>;
            this.setState({view : "CAB"});

        }
        else if(comp == "GUIDE"){
           console.log("GUIDE");
           RenderingComponent =
                        <View style={styles.header}>
                            <HeaderM loadHome={this.loadHome} user={this.state.user} loadComponent={this.loadComponent} comp={comp}/>
                            <Guide url={urlPrefix} loadReserve={this.loadReserve}/>
                         </View>;
            this.setState({view : "GUDE"});
        }
        else if(comp == "TRIPS"){
           console.log("TRIPS");
           RenderingComponent =
                        <View style={styles.header}>
                            <HeaderM loadHome={this.loadHome} user={this.state.user} loadComponent={this.loadComponent} comp={comp}/>
                            <Map url={urlPrefix} />
                         </View>;
            this.setState({view : "TRIPS"});

        }
        else if(comp == "PLACE"){
            console.log("PLACE");
            RenderingComponent =
                            <View style={styles.header}>
                            <HeaderM loadHome={this.loadHome} user={this.state.user} loadComponent={this.loadComponent} comp={comp}/>
                                <Place url={urlPrefix}/>
                             </View>;
            this.setState({view: "PLACE"});

        }
        else if(comp == "REGISTER"){

          console.log("REGISTER");
          RenderingComponent = <RegisterUser url={urlPrefix} loadHome={this.loadHome} loadComponent={this.loadComponent}/>
          this.setState({view: "REGISTER"});

        }
        else if(comp == "SIGNIN"){

          console.log("SIGNIN");
          RenderingComponent = <SignIn url= {urlPrefix} loadHome ={this.loadHome} loadComponent={this.loadComponent}/>
          this.setState({view: "SIGNIN"});

        }
    }

    loadReserve(type,object){

        RenderingComponent = <Reserve url={urlPrefix} user={this.state.user} type={type} Object={object} returnHome={this.loadHome}/>;

        this.setState({view : "RESERVE"});
    }

    loadHome(user){
       // e.preventDefault();
        console.log("Loading Home" + user.first_name);
        RenderingComponent = <Home url= {"Yeah Working!!"} loadComponent = {this.loadComponent}/>;

        this.setState({view : "HOME", user : user});


    }
  render() {
    return (
      <View style={styles.container}>
      {RenderingComponent}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },

  header:{
            justifyContent: "flex-start", flexDirection: "column", flexWrap: "wrap",

  },
});

AppRegistry.registerComponent('SerendibTourGuide', () => SerendibTourGuide);
