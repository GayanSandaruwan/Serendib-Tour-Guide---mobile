import React, { Component } from 'react';
import { Text, TouchableOpacity, View ,StyleSheet, Button,Dimensions} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';

  const { width, height } = Dimensions.get("window");

export default class Reserve extends Component {


  constructor(props){
    super(props);

    this.state = {user: this.props.user, type : this.props.type, startOrEnd : "" ,
                    Object :this.props.Object, message:"Choose start & End Time",
                    url : this.props.url,  isDateTimePickerVisible: false,
                    };

                    console.log(this.state.url);

    this.showStartTimePicker = this.showStartTimePicker.bind(this);
    this.showEndTimePicker = this.showEndTimePicker.bind(this);
    this.makeReservation = this.makeReservation.bind(this);

  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
  showStartTimePicker(){

        this.setState({startOrEnd : "start"});
        this._showDateTimePicker();
  }

   showEndTimePicker(){

          this.setState({startOrEnd : "end"});
          this._showDateTimePicker();
    }

  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    if(this.state.startOrEnd == "start"){
        this.setState({Time_start :date, message : "Set End Time"});
    }
    if(this.state.startOrEnd == "end"){
        if(this.state.message=="Set End Time"){
            this.setState({Time_end :date, message : "Ready For Reservation"});
        }
        else{
            this.setState({Time_end :date, message : "Set Start Time"});
        }
    }

    this._hideDateTimePicker();
  };

  makeReservation(e){

          e.preventDefault();
          console.log("Trying to Reserve "+this.state.type);

         fetch(this.state.url+'reserve/' +this.state.type, {
                       method: 'POST',
                       headers: {
                         'Accept': 'application/json',
                         'Content-Type': 'application/json',
                       },
                       body: JSON.stringify({
                           Reserv_Flag:  'true',
                           Success:  'false',
                           Time_start   :  this.state.Time_start,
                           Time_end     :  this.state.Time_end,
                           User_Id      :  this.state.user.Id,
                           Object_Id    :  this.state.Object.Id,
                       })
                     })
                      .then((response) => response.json())

                      .then((responseJson) => {
                            if(responseJson.message){
                                this.setState({
                                message : 'Reservation Complete', reservation : responseJson.reservation});
//                                this.props.loadHome(responseJson.user);    //Calling LoadHome Function in the parent
                            console.log("Reservation Complete");
//
                            }
                            })
                      .catch((error) => {
                            console.error(error);
                            this.setState({signInFailed : 'signInFailed - Wrong User Name Passord'})
                            });

      }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.buttonStart}>
        <Button onPress={this.showStartTimePicker} title="Startting Time" color="#841584"  />
        </View>
        <View style={styles.buttonEnd}>
        <Button onPress={this.showStartTimePicker} title="Ending    Time" color="#841584" />
        </View>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
          datePickerModeAndroid={'calendar'}
          mode={'datetime'}
        />
        <Text style={styles.message}>{this.state.message}</Text>
        <Button onPress={this.makeReservation} title={" Reserve "+this.state.type} color="green"/>

      </View>
    );
  }

}



const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 500,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',

  },
  message :{
          fontSize: 20,
          fontWeight: 'bold',
          color : 'red'
  },
  buttonStart :{
         justifyContent: "flex-start", flexDirection: "column", flexWrap: "wrap", marginBottom :20, position: 'absolute', width : width/2,
                                                                                                 bottom:height-height/2,
  },
  buttonEnd:{
     justifyContent: "flex-start", flexDirection: "column", flexWrap: "wrap", marginBottom :20, position: 'absolute',width : width/2,
        bottom:height-3*height/4,
  }

});