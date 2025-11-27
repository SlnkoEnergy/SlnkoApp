// app/Navigations/Route.tsx
import React, { useState, useMemo } from "react";
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";

import StackNavigator from "./StackNavigator";
import themeContext from "../constants/themeContext";
import { COLORS } from "../constants/theme";

const Routes = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const authContext = useMemo(
    () => ({
      setDarkTheme: () => setIsDarkTheme(true),
      setLightTheme: () => setIsDarkTheme(false),
    }),
    []
  );

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      background: COLORS.background,
      title: COLORS.title,
      card: COLORS.card,
      text: COLORS.text,
      textLight: COLORS.textLight,
      input: COLORS.input,
      border: COLORS.borderColor,
      checkBoxborder: COLORS.checkBoxborderColor,
    },
  };

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      background: COLORS.darkBackground,
      title: COLORS.darkTitle,
      card: COLORS.darkCard,
      text: COLORS.darkText,
      textLight: COLORS.darkTextLight,
      input: COLORS.darkInput,
      border: COLORS.darkBorder,
      checkBoxborder: COLORS.darkcheckBoxborderColor,
    },
  };

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  return (
    <themeContext.Provider value={authContext}>
      <NavigationContainer theme={theme}>
        <StackNavigator />
      </NavigationContainer>
    </themeContext.Provider>
  );
};

export default Routes;
