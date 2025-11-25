import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Routes from './app/Navigations/Route';

export default class App extends Component {

  render() {
    return (
      <SafeAreaProvider>
        <SafeAreaView
          style={{
            flex: 1
          }}>
            <Routes/>
        </SafeAreaView>
    </SafeAreaProvider>
    );
  }

};


