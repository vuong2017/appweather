import React, { Component } from 'react'
import Home from './Components/Home'
import store from './Redux/Store'
import {Provider} from 'react-redux'
export default class App extends Component{
  render(){
    return(
      <Provider store={store}>
        <Home />
      </Provider>
    );
  }
}
