import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button, TextInput, Dimensions
} from 'react-native';
const { width,height } = Dimensions.get("window");


//import { TextField } from 'react-native-material-textfield';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {TextField} from 'react-native-material-textfield';
import { Sae } from 'react-native-textinput-effects';

export default class RegisterUser extends Component {



    constructor(props){
    	super(props);
    	this.state = { email:'', first_name: '' , last_name: '', NIC : '', url:this.props.url};
    	this.registerUser = this.registerUser.bind(this);

    }
    registerUser(e){

    	e.preventDefault();
    	if(this.state.email=='' || this.state.first_name=='' || this.state.last_name=='' || this.state.NIC=='' ){
			
			this.setState({signInFailed : 'Fill all the details'});
			console.log("User Registration Details " +this.state.email +"  "+ this.state.first_name +" " +this.state.last_name +" "+this.state.NIC );

    	}
    	else if(this.state.email.indexOf('@'.toLowerCase()) > -1){

    		this.setState({email : '', signInFailed : 'Enter a valid Email'});

    	}

    	else{
    		console.log("Trying to register the User")
    	 fetch(this.state.url+'user/register', {
                       method: 'POST',
                       headers: {
                         'Accept': 'application/json',
                         'Content-Type': 'application/json',
                       },
                       body: JSON.stringify({
                         email : this.state.email,
                         first_name : this.state.first_name,
                         last_name : this.state.last_name,
                         NIC : this.state.NIC,
                       })
                     })
                      .then((response) => response.json())

                      .then((responseJson) => {
                            if(responseJson.message){
                                this.setState({
                                verified : true,});
                                this.props.loadComponent("SIGNIN");    //Calling LoadHome Function in the parent
                                alert("User Registered. Check your mail for the key! ")
                            }
                            else{
                                 this.setState({signInFailed : 'User Already exist on this NIC'})
                                 console.log("Registration Failed! Duplicate NIC");
                            }
                            })
                      .catch((error) => {
                            console.error(error);
                            this.setState({signInFailed : 'Network Error occured!'})
                            });
    	}
    }
    	


    render(){


    	let { phone } =this.state;

    	return (

    			<View style={styles.container}>
 					<Sae
 						style={styles.mail}
					    label={'Email Address'}
					    iconClass={FontAwesomeIcon}
					    iconName={'pencil'}
					    iconColor={'white'}
					    value={this.state.email}					    
					    onChangeText={(text) => { this.setState({email: text}) }}
					    autoCapitalize={'none'}
					    autoCorrect={false}
					  />
					  <Sae
 						style={styles.mail}
					    label={'First Name'}
					    iconClass={FontAwesomeIcon}
					    iconName={'pencil'}
					    iconColor={'white'}
					    value={this.state.first_name}
					    onChangeText={(text) => { this.setState({first_name: text}) }}
					    autoCapitalize={'none'}
					    autoCorrect={false}
					  />
					  <Sae
 						style={styles.mail}
					    label={'Last Name'}
					    iconClass={FontAwesomeIcon}
					    iconName={'pencil'}
					    iconColor={'white'}
					    value={this.state.last_name}
					    onChangeText={(text) => { this.setState({last_name: text}) }}
					    autoCapitalize={'none'}
					    autoCorrect={false}
					  />
					  <Sae
 						style={styles.mail}
					    label={'NIC'}
					    iconClass={FontAwesomeIcon}
					    iconName={'pencil'}
					    iconColor={'white'}
					    value={this.state.NIC}
					    onChangeText={(text) => { this.setState({NIC: text}) }}
					    autoCapitalize={'none'}
					    autoCorrect={false}
					  />
						<Text style={styles.error}>
	                  		{this.state.signInFailed}
	              		</Text>
					  <View style={{marginTop:2, marginBottom : 20}}>
		                  <Button onPress={this.registerUser} title="Register" />
		              </View>
		              <View style={{marginTop:2, marginBottom : 20}}>
		                  <Button onPress={(e)=>{this.props.loadComponent("SIGNIN")}} title="QUIT" />
		              </View>
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
    backgroundColor: '#ffa500',
  },

	  container2: {
	  overflow:  'hidden',
	  paddingTop: 16,
	  backgroundColor:  'white',
	  height: height,
	  width: width,
	  opacity: 0.8,
	  justifyContent: 'center',
	  alignItems: 'center',
	  backgroundColor:'#3b5998',

	},
	      mail:{
        height: 60,
        width:  width-30,
        marginBottom: 5,
        fontWeight: 'bold',
        opacity: 0.8,
        color: 'black',
      }
  });


