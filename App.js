import React, { Component } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { Text, View, StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from './src/screens/Home/Profile';
import ContactListScreen from './src/screens/Home/ContactList';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from "react-redux";
import thunk from 'redux-thunk';

const Stack = createStackNavigator();



const initialState = {
  DummyData: []
}
const reducer = (state = initialState, action) => {
  let index = -1;
  switch (action.type) {
    case 'FETCH_USERS_BEGIN':
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.

      // console.log(11);
      return {
        ...state,
        loading: true,
        error: null
      };

    case 'FETCH_USERS_SUCCESS':
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      // console.log(action.payload.users);
      return {
        ...state,
        loading: false,
        DummyData: action.payload.users
      };

    case 'FETCH_USERS_FAILURE':
      // The request failed, but it did stop, so set loading to "false".
      // Save the error, and we can display it somewhere
      // Since it failed, we don't have items to display anymore, so set it empty.
      // This is up to you and your app though: maybe you want to keep the items
      // around! Do whatever seems right.
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        DummyData: []
      };

    case 'EDIT_USER':
      var data = state.DummyData;
      index = data.findIndex(obj => obj.id === action.payload.userDetails.id);
      if (index >= 0) {
        data[index] = action.payload.userDetails;
      }
      const updatedData = data;
      return { 
        ...state,
        DummyData: updatedData 
      };

    case 'DELETE_USER':
      var data = state.DummyData;
      index = data.findIndex(obj => obj.id === action.payload.id);
      state.DummyData = index >= 0 ? [
        ...data.slice(0, index),
        ...data.slice(index + 1)
      ] : array;
      return { DummyData: state.DummyData };
    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
const store = createStore(reducer, applyMiddleware(thunk));



export default App = () => {
  return (
    // <Text>HOME</Text>
    <Provider store={store}>
      <StatusBar animated translucent backgroundColor='rgba(0,0,0,0.2)' barStyle='dark-content' />
      <NavigationContainer>
        <Stack.Navigator initialRouteName={'ContactList'} headerMode='float'>
          <Stack.Screen name='Profile' component={ProfileScreen} options={{ headerShown: false }} />
          <Stack.Screen name='ContactList' component={ContactListScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
