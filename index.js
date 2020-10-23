/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Splash from './src/screen/splash';   
import React, { Component } from 'react'

class Main extends Component {  
    constructor(props) {
        super(props);   
        this.state = { currentScreen: 'Splash'}        
        setTimeout(() => {            
            this.setState({ currentScreen: 'Menu'})
        }, 1000);
    }
    
    render(){
        const { currentScreen } = this.state
        let mainScreen = currentScreen === 'Splash' ? <Splash/> : <App/>
        return mainScreen
    }
}

AppRegistry.registerComponent(appName, () => Main);
