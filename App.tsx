// App.tsx
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';

import { store } from './app/store';
import Routes from './app/Navigations/Route';

export default class App extends Component {
  render() {
    return (
      <SafeAreaProvider>
        <ReduxProvider store={store}>
          <PaperProvider>
            <SafeAreaView style={{ flex: 1 }}>
              <Routes /> 
            </SafeAreaView>
          </PaperProvider>
        </ReduxProvider>
      </SafeAreaProvider>
    );
  }
}
