import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View, Dimensions, BackAndroid
} from 'react-native';

import {Header, Icon, ButtonGroup, Button} from 'react-native-elements';

const { width,height } = Dimensions.get("window");

export default class HeaderM extends Component{



    constructor () {
          super()
          this.state = {
            selectedIndex: 2
          }
            this.updateIndex = this.updateIndex.bind(this);
            this.loadHome = this.loadHome.bind(this);
            this.loadComponent = this.loadComponent.bind(this);
            this.exit = this.exit.bind(this);
        }

        exit(e){

            BackAndroid.exitApp();
        }

        loadHome(e){
        e.preventDefault();
            this.props.loadHome(this.props.user);
        }

        loadComponent(e){
            e.preventDefault();
            this.props.loadComponent(this.props.comp);
        }

        updateIndex (selectedIndex) {
          this.setState({selectedIndex})
        }
//        const component1 = () => <Text>Hello</Text>
//        const component2 = () => <Text>World</Text>
//        const component3 = () => <Text>ButtonGroup</Text>

        render () {

//          const buttons = [{ element: component1 }, { element: component2 }, { element: component3 }]
        const buttons = ['Hello', 'World', 'Buttons']
          const { selectedIndex } = this.state
          return (
          <View style={styles.body}>
            <View style={styles.back}>
            <Button
              title='BACK'
              color='#0074D9'
              onPress={this.loadHome}
              />
          </View>
          <View style={styles.middle}>

            <Button
              icon={{name: 'cached'}}
              color='#0074D9'
              title='REFRESH           '
               onPress={this.loadComponent}
               />
          </View>
          <View style={styles.next}>
            <Button
              iconRight
              icon={{name: 'code'}}
              color='#0074D9'
              title='EXIT'
               onPress={this.exit}

              />

            </View>
           </View>

          )
        }


}

const styles = StyleSheet.create({
    header : {
            ...StyleSheet.absoluteFillObject

    },
        body:{
             justifyContent: "flex-start", flexDirection: "row", flexWrap: "wrap", backgroundColor:'#0074D9',
        },
        back:{
             justifyContent: "flex-start", flexDirection: "row", flexWrap: "wrap",  width:width/4,
        },
        middle:{
             justifyContent: "flex-start", flexDirection: "row", flexWrap: "wrap", width : width/2,
        },
        next:{
             justifyContent: "flex-start", flexDirection: "row", flexWrap: "wrap",  width: width/4,
        },

});