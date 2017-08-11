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
  Button, TextInput
} from 'react-native';

//import { TextField } from 'react-native-material-textfield';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Fumi } from 'react-native-textinput-effects';

export default class SignIn extends Component {

    constructor(props){

        super(props);
        this.state = {
            url : this.props.url,
        };
        this.logging = this.logging.bind(this);
        this.SignIn = this.SignIn.bind(this);
        this.onChangeCode = this.onChangeCode.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
    }

    logging(e){
        console.log(message);
        e.preventDefault();
        this.setState({url : "Button Working",});
    }

     onChangeCode(text){

            this.setState({
                code: text,
            });

        }

        onChangeEmail(text){

            this.setState({
                email : text,
            });
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
                         email : this.state.email,
                         key:  this.state.code,
                       })
                     })
                      .then((response) => response.json())

                      .then((responseJson) => {
                            if(responseJson.message){
                                this.setState({
                                verified : true,});
                                this.props.loadHome(responseJson.user);    //Calling LoadHome Function in the parent

                            }
                            else{
                                 this.setState({signInFailed : 'signInFailed - Wrong User Name Password'})
                                 console.log("Sign In Failed");
                            }
                            })
                      .catch((error) => {
                            console.error(error);
                            this.setState({signInFailed : 'Network Error occured!'})
                            });


    }

  render() {
    return (

       <View style={styles.container2}>
                          <Fumi style={styles.mail}
                          label={'Your Email'}
                          iconClass={MaterialIcons}
                          iconName={'email'}
                          iconColor={'#f95a25'}
                          onChangeText = {this.onChangeEmail}
                          />
                          <Fumi style={styles.mail}
                          label={'Password'}
                          iconClass={MaterialIcons}
                          iconName={'grain'}
                          iconColor={'#f95a25'}
                          secureTextEntry={true}
                          onChangeText = {this.onChangeCode}
                          />
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
        ...StyleSheet.absoluteFillObject,
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

    container2: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'#3b5998',

    },
      mail:{
        height: 60,
        width:  360,
        marginBottom: 15,
        fontWeight: 'bold',
        opacity: 0.8,
      }
});

