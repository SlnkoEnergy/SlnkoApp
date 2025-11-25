import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Routes from './app/Navigations/Route';
import { Provider as ReduxProvider } from "react-redux";
import { store } from './app/store';

export default class App extends Component {

  render() {
    return (
      <SafeAreaProvider>
        <ReduxProvider store={store}>
          <SafeAreaView
          style={{
            flex: 1
          }}>
            <Routes/>
        </SafeAreaView>
        </ReduxProvider>
        
    </SafeAreaProvider>
    );
  }

};


