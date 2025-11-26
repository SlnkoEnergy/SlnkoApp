import React from "react";
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { Platform, SafeAreaView } from "react-native";
import { StatusBar } from "react-native";
import { RootStackParamList } from "./RootStackParamList";

import DrawerNavigation from "./DrawerNavigation";
import Onbording from "../Screens/onbording/Onbording";
// import SignIn from "../Screens/Auth/SignIn";
// import EnterCode from "../Screens/Auth/EnterCode";
// import NewPassword from "../Screens/Auth/NewPassword";
import Notification from "../Screens/Notification/Notification";
import EditProfile from "../Screens/profile/EditProfile";
import Call from "../Screens/Chat/Call";
import SingleChat from "../Screens/Chat/SingleChat";


import Messages from "../Screens/Chat/Messages";
import Splash from "../Screens/onbording/Splash";
import { useTheme } from "@react-navigation/native";
import ChooseLanguage from "../Screens/language/Language";
import UserDetails from "../Screens/Installation/UserDetails";
import CompanyDetails from "../Screens/Installation/CompanyDetails";
import NewContact from "../Screens/Contacts/NewContact";
import Estimatesdetails from "../Screens/Estimates/Estimatesdetails";
import DownloadQuotation from "../Screens/Estimates/DownloadQuotation";
import AddItem from "../Screens/Estimates/AddItem";
import ProjectDetails from "../Screens/Project/ProjectDetails";
import TaskDetails from "../Screens/Project/TaskDetails";
import AttendanceDetails from "../Screens/Project/AttendanceDetails";
import PartyProjectBalance from "../Screens/Project/PartyProjectBalance";
import PartyProjectPayment from "../Screens/Project/PartyProjectPayment";
import Settings from "../Screens/Settings/Settings";
import ChangePassword from "../Screens/Settings/ChangePassword";
import HelpCenter from "../Screens/Settings/HelpCenter";
import demo from "../Screens/Auth/demo";
import PaymentIn from "../Screens/Transaction/Payment/PaymentIn";
import PaymentOut from "../Screens/Transaction/Payment/PaymentOut";
import CreateDebitNote from "../Screens/Transaction/Payment/CreateDebitNote";
import CreateCreditNote from "../Screens/Transaction/Payment/CreateCreditNote";
import Partytoparty from "../Screens/Transaction/Payment/Partytoparty";
import Salesinvoice from "../Screens/Transaction/Sales/Salesinvoice";
import invoiceAddItem from "../Screens/Transaction/Sales/invoiceAddItem";
import AddBillAddress from "../Screens/Transaction/Sales/AddBillAddress";
import MaterialPurchase from "../Screens/Transaction/Expense/MaterialPurchase";
import MaterialReturn from "../Screens/Transaction/Expense/MaterialReturn";
import AddMaterialReturn from "../Screens/Transaction/Expense/AddMaterialReturn";
import MaterialTransfer from "../Screens/Transaction/Expense/MaterialTransfer";
import OtherMaterial from "../Screens/Transaction/Expense/OtherMaterial";
import PaidExpense from "../Screens/Transaction/MyAccount/PaidExpense";
import ReceivedExpense from "../Screens/Transaction/MyAccount/ReceivedExpense";
import BusinessCards from "../Screens/Settings/BusinessCards";
import Invite from "../Screens/Settings/Invite";
import LibraryManagement from "../Screens/Settings/LibraryManagement";
import CreateProject from "../Screens/Project/CreateProject";
import RolesAccess from "../Screens/Settings/RolesAccess";
import PayrollPeople from "../Screens/Settings/PayrollPeople";
import SelectParty from "../Screens/Contacts/SelectParty";
import AddTask from "../Screens/Project/AddTask";
import MainSignIn from "../Screens/Auth/MainSignIn";
import Company from "../Screens/Company/Company";



const Stack = createStackNavigator<RootStackParamList>();

const StackNavigator = () => {

  const theme = useTheme();

  return (
    <SafeAreaView style={{width:'100%', flex: 1 }}>
      {Platform.OS === 'android' &&
        <StatusBar backgroundColor={theme.colors.card} barStyle={theme.dark ? "light-content" : "dark-content"} /> 
      }
      <Stack.Navigator
        initialRouteName={"splash"}
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: "transparent",flex:1  },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        <Stack.Screen name={"demo"} component={demo} />
        <Stack.Screen name={"splash"} component={Splash} />
        <Stack.Screen name={"Onbording"} component={Onbording} />
        <Stack.Screen name={"Login"} component={MainSignIn} />
        <Stack.Screen name={"ChooseLanguage"} component={ChooseLanguage} />
        {/* <Stack.Screen name={"SignIn"} component={SignIn} /> */}
        {/* <Stack.Screen name={"EnterCode"} component={EnterCode} /> */}
        {/* <Stack.Screen name={"NewPassword"} component={NewPassword} /> */}
        <Stack.Screen name={"UserDetails"} component={UserDetails} />
        <Stack.Screen name={"CompanyDetails"} component={CompanyDetails} />
        <Stack.Screen name={"DrawerNavigation"} component={DrawerNavigation} />
        <Stack.Screen name={"NewContact"} component={NewContact} />
        <Stack.Screen name={"Messages"} component={Messages} />
        <Stack.Screen name={"Call"} component={Call} />
        <Stack.Screen name={"SingleChat"} component={SingleChat} />
        <Stack.Screen name={"Estimatesdetails"} component={Estimatesdetails} />
        <Stack.Screen name={"DownloadQuotation"} component={DownloadQuotation} />
        <Stack.Screen name={"AddItem"} component={AddItem} />
        <Stack.Screen name={"Company"} component={Company} />
        <Stack.Screen name={"TaskDetails"} component={TaskDetails} />
        <Stack.Screen name={"AttendanceDetails"} component={AttendanceDetails} />
        <Stack.Screen name={"PartyProjectBalance"} component={PartyProjectBalance} />
        <Stack.Screen name={"PartyProjectPayment"} component={PartyProjectPayment} />
        <Stack.Screen name={"PaymentIn"} component={PaymentIn} />
        <Stack.Screen name={"PaymentOut"} component={PaymentOut} />
        <Stack.Screen name={"CreateDebitNote"} component={CreateDebitNote} />
        <Stack.Screen name={"CreateCreditNote"} component={CreateCreditNote} />
        <Stack.Screen name={"Partytoparty"} component={Partytoparty} />
        <Stack.Screen name={"Salesinvoice"} component={Salesinvoice} />
        <Stack.Screen name={"invoiceAddItem"} component={invoiceAddItem} />
        <Stack.Screen name={"AddBillAddress"} component={AddBillAddress} />
        <Stack.Screen name={"MaterialPurchase"} component={MaterialPurchase} />
        <Stack.Screen name={"MaterialReturn"} component={MaterialReturn} />
        <Stack.Screen name={"AddMaterialReturn"} component={AddMaterialReturn} />
        <Stack.Screen name={"MaterialTransfer"} component={MaterialTransfer} />
        <Stack.Screen name={"OtherMaterial"} component={OtherMaterial} />
        <Stack.Screen name={"PaidExpense"} component={PaidExpense} />
        <Stack.Screen name={"ReceivedExpense"} component={ReceivedExpense} />
        <Stack.Screen name={"CreateProject"} component={CreateProject} />
        <Stack.Screen name={"RolesAccess"} component={RolesAccess} />
        <Stack.Screen name={"PayrollPeople"} component={PayrollPeople} />
        <Stack.Screen name={"SelectParty"} component={SelectParty} />
        <Stack.Screen name={"AddTask"} component={AddTask} />
        
        <Stack.Screen name={"EditProfile"} component={EditProfile} />
        <Stack.Screen name={"Settings"} component={Settings} />
        <Stack.Screen name={"HelpCenter"} component={HelpCenter} />
        <Stack.Screen name={"ChangePassword"} component={ChangePassword} />
        <Stack.Screen name={"BusinessCards"} component={BusinessCards} />
        <Stack.Screen name={"Invite"} component={Invite} />
        <Stack.Screen name={"LibraryManagement"} component={LibraryManagement} />

        <Stack.Screen name={"Notification"} component={Notification} />

      </Stack.Navigator>
    </SafeAreaView>
  );
};
export default StackNavigator;
