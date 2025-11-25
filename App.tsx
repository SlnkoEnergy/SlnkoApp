import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Routes from './app/Navigations/Route';
import { Provider as ReduxProvider } from "react-redux";
import { store } from './app/store';
import { Provider as PaperProvider, MD3LightTheme } from 'react-native-paper';

const paperTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#003366',
  },
};

export default class App extends Component {

  render() {
    return (
      <SafeAreaProvider>
        <ReduxProvider store={store}>
          <PaperProvider theme={paperTheme}>
            <SafeAreaView style={{ flex: 1 }}>
              <Routes />
            </SafeAreaView>
          </PaperProvider>
        </ReduxProvider>
      </SafeAreaProvider>
    );
  }

};


