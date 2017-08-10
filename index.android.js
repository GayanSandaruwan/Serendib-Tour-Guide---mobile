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
  Button
} from 'react-native';
import SignIn from './App/SignIn.js';
import Home from './App/Home.js';
import Map from './App/MapC.js';
import Restaurant from './App/Restaurant.js';
import Car from './App/Car.js';
import Guide from './App/Guide.js';
import Reserve from './App/Reserve.js';


let RenderingComponent  =  null;
let urlPrefix = "http://192.168.1.59:3001/";

export default class SerendibTourGuide extends Component {


    constructor(props){
        super(props);

        this.loadHome = this.loadHome.bind(this);
        this.state = {view : "START", user : null};
        this.loadComponent = this.loadComponent.bind(this);
        this.loadReserve = this.loadReserve.bind(this);
    }
    componentDidMount() {
        RenderingComponent = <SignIn url= {urlPrefix} loadHome ={this.loadHome}/>;

        console.log("Starting Application");
        this.setState({view : "AUTH"});
    }
    loadComponent(comp){
        console.log("asdfasd");
        if(comp == null){
        }
        if(comp == "REST"){
            console.log("REST");
            RenderingComponent = <Restaurant url={urlPrefix} loadReserve={this.loadReserve}/>;
            this.setState({view : "REST"});
        }
        else if(comp == "CAB"){
            console.log("CAB");
            RenderingComponent = <Car url={urlPrefix} loadReserve={this.loadReserve}/>;

            this.setState({view : "CAB"});

        }
        else if(comp == "GUIDE"){
            console.log("GUIDE");
            RenderingComponent = <Guide url={urlPrefix} loadReserve={this.loadReserve}/>;

            this.setState({view : "GUDE"});
        }
        else if(comp == "TRIPS"){
            console.log("TRIPS");
        }
        else if(comp == "PLACE"){
            console.log("PLACE");
            RenderingComponent = <Map url={urlPrefix}/>
            this.setState({view: "PLACE"});

        }
    }

    loadReserve(type,object){

        RenderingComponent = <Reserve url={urlPrefix} user={this.state.user} type={type} Object={object}/> ;
        this.setState({view : "RESERVE"})

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
});

AppRegistry.registerComponent('SerendibTourGuide', () => SerendibTourGuide);
