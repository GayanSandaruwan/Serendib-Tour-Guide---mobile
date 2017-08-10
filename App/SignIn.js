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

export default class SignIn extends Component {

    constructor(props){

        super(props);
        this.state = {
            url : this.props.url,
        };
        this.logging = this.logging.bind(this);
        this.SignIn = this.SignIn.bind(this);
    }

    logging(e){
        console.log(message);
        e.preventDefault();
        this.setState({url : "Button Working",});
    }

    SignIn(e){
        e.preventDefault();

        fetch(this.state.url+'user/signin', {
               method: 'POST',
               headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json',
               },
               body: JSON.stringify({
                 email : 'gayankavirathne.14@cse.mrt.ac.lk',
                 key:  'PTgbdk',
               })
             })
              .then((response) => response.json())

              .then((responseJson) => {
                    if(responseJson.message){
                        this.setState({
                        verified : true,});
                        this.props.loadHome(responseJson.user);    //Calling LoadHome Function in the parent

                    }
                    })
              .catch((error) => {
                    console.error(error);
                    this.setState({signInFailed : 'signInFailed - Wrong User Name Passord'})
                    });
    }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {this.state.url}
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.error}>
            {this.state.signInFailed}
        </Text>
        <Button onPress={this.SignIn} title="SignIn"/>
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
  error: {
    textAlign: 'center',
    color: 'rgb(255,0,0)',
    marginBottom: 5,
  },
});

