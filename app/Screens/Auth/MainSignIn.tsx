import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Dialog, Portal } from "react-native-paper";
import Button from "../../components/Button/Button";
import { FONTS, COLORS } from "../../constants/theme";
import { GlobalStyleSheet } from "../../constants/StyleSheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../Navigations/RootStackParamList";
import { useTheme } from "@react-navigation/native";
import { useAppDispatch } from "../../store/hooks";
import { loginSlice, useLoginMutation } from "../../store/slices/loginSlice";
import { IMAGES } from "../../constants/Images";

type LoginScreenProps = StackScreenProps<RootStackParamList, "Login">;

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const theme = useTheme();
  const { colors }: { colors: any } = theme;

  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start();
  }, []);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");

  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const showDialog = (title: string, message: string) => {
    setDialogTitle(title);
    setDialogMessage(message);
    setDialogVisible(true);
  };
  const hideDialog = () => setDialogVisible(false);

 const handleLogin = async () => {
  const user = name.trim();
  const pass = password.trim();

  if (!user || !pass) {
    showDialog("Missing Fields", "Please enter both username and password.");
    return;
  }
  if (isLoading) return;

  try {
    Keyboard.dismiss();

    const loginResponse = await login({ name: user, password: pass }).unwrap();
    const { token, userId } = loginResponse ?? {};

    if (!token || !userId) {
      showDialog("Error", "Token or userId not received from server.");
      return;
    }

    await AsyncStorage.setItem("authToken", token);

    const users = await dispatch(
      loginSlice.endpoints.getAllUsersIt.initiate()
    ).unwrap();
    const matchedUser = users.find(
      (item: any) => String(item._id) === String(userId)
    );

    if (!matchedUser) {
      showDialog("Error", "User not found in user list.");
      return;
    }

    await AsyncStorage.setItem(
      "userData",
      JSON.stringify({
        name: matchedUser.name,
        email: matchedUser.email,
        phone: matchedUser.phone,
        emp_id: matchedUser.emp_id,
        role: matchedUser.role,
        createdAt: matchedUser.createdAt,
        userID: matchedUser._id,
      })
    );

    setPassword("");


    // navigation.navigate("DrawerNavigation" as any, { screen: "Home" } as any);

    navigation.reset({
  index: 0,
  routes: [{ name: 'DrawerNavigation' }],
});



  } catch (err: any) {
    const msg =
      err?.status === 401 || err?.originalStatus === 401
        ? "Incorrect username or password."
        : "Unable to sign in. Check your connection and try again.";
    showDialog("Login Failed", msg);
  }
};


  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <View style={GlobalStyleSheet.gradientBg} />

          <Animated.View style={[GlobalStyleSheet.container, { opacity: fadeAnim }]}>
            <Image
              source={IMAGES.protrac_logo}
              style={GlobalStyleSheet.logo}
              resizeMode="contain"
            />

            {/* Username */}
            <View style={GlobalStyleSheet.roundInputContainer}>
              <Icon name="account-outline" size={22} color="#003366" />
              <TextInput
                style={GlobalStyleSheet.roundInput}
                placeholder="Name or Employee ID"
                placeholderTextColor={colors.placeholder ?? "#48709e"}
                value={name}
                onChangeText={setName}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                onSubmitEditing={() => {}}
                textContentType="username"
              />
            </View>

            {/* Password */}
            <View style={GlobalStyleSheet.roundInputContainer}>
              <Icon name="lock-outline" size={22} color="#003366" />
              <TextInput
                style={GlobalStyleSheet.roundInput}
                placeholder="Password"
                placeholderTextColor={colors.placeholder ?? "#48709e"}
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="go"
                onSubmitEditing={handleLogin}
                textContentType="password"
              />
              <TouchableOpacity onPress={() => setShowPassword((s) => !s)} accessibilityRole="button">
                <Icon name={showPassword ? "eye-off-outline" : "eye-outline"} size={22} color="#003366" />
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <Button
              title={isLoading ? "Signing in..." : "Login"}
              onPress={handleLogin}
              disabled={isLoading}
              color={theme.dark ? COLORS.white : COLORS.primary}
              text={colors.card}
            />

            <TouchableOpacity disabled={isLoading}>
              <Text style={GlobalStyleSheet.forgotText}>Forget Password?</Text>
            </TouchableOpacity>

            <View style={GlobalStyleSheet.footer}>
              <Text style={GlobalStyleSheet.poweredBy}>Powered By</Text>
              <Image
                source={IMAGES.slnko_blue}
                style={GlobalStyleSheet.footerLogo}
                resizeMode="contain"
              />
            </View>
          </Animated.View>

          <Portal>
            <Dialog visible={dialogVisible} onDismiss={hideDialog} style={GlobalStyleSheet.dialog}>
              <Dialog.Title style={GlobalStyleSheet.dialogTitle}>{dialogTitle}</Dialog.Title>
              <Dialog.Content>
                <Text>{dialogMessage}</Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button
                  title="OK"
                  onPress={hideDialog}
                  color={theme.dark ? COLORS.white : COLORS.primary}
                  text={colors.card}
                />
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
