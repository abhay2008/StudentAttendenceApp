import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class AppHeader extends React.Component{
  render(){
    return(
      <View style= {styles.textContainer}>
        <Text style={styles.text}>SCHOOL ATTENDANCE</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textContainer:{
    backgroundColor: 'rgb(0, 0, 80)',
    height: 60
  },
  text:{
    color: 'cyan',
    padding: 10,
    fontSize: 30.5,
    fontFamily: 'monospace',
    textAlign: 'center',
  }
});

