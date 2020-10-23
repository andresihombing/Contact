import React, {Component} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import GlobalStyle from "../style/globalStyle";

class Splash extends Component {            
  
    render() {
        return (
            <View style={GlobalStyle.fill}>
                <View style={styles.positionTextCenter}>
                    <Text style={styles.textCenter}>Contact</Text>
                </View>
            </View>
        );
    }
}

export default Splash

const styles = StyleSheet.create({    
    textCenter:{
        textAlign :'center',
        fontSize: 50,
        fontWeight: 'bold',
        color: GlobalStyle.orange,
    },
    positionTextCenter:{
        justifyContent: 'center',
        height: '100%'
    }
});