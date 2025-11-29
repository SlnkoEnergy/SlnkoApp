// App.tsx
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider as PaperProvider, MD3LightTheme as DefaultPaperTheme } from 'react-native-paper';
import { store } from './app/store';
import Routes from './app/Navigations/Route';
import { COLORS } from './app/constants/theme';

export default class App extends Component {
  render() {
    return (
      <SafeAreaProvider>
        <ReduxProvider store={store}>
          <PaperProvider theme={DefaultPaperTheme}>
             <SafeAreaView
              style={{ flex: 1, backgroundColor: '#F5F5F5' }}
              edges={['bottom']} 
            >
              <Routes />
            </SafeAreaView>
          </PaperProvider>
        </ReduxProvider>
      </SafeAreaProvider>
    );
  }
}
