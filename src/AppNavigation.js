import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ListContact from './screen/listContact'
import AddContact from './screen/addContact'
import EditContact from './screen/editContact'

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">        
        <Stack.Screen name="listContact" component={ListContact} options={{headerShown: false}}/>
        <Stack.Screen name="addContact" component={AddContact} options={{headerShown: false}}/>
        <Stack.Screen name="editContact" component={EditContact} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
