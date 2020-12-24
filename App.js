import * as React from "react";
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
 import List from "./screens/List";
// //  import Stocks from "./components/Stocks";
// //  import StocksList from "./screens/StockList";
import LoginScreen from "./screens/LoginScreen";
import Details from "./screens/Details";
 import Signup from "./screens/Signup";
//import ForgotPassword from "./screens/ForgotPassword";
  import * as firebase from "firebase";
 import { firebaseConfig } from "./config";
 !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const Stack = createStackNavigator();

function App({ navigation }) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
         <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            headerShown: false,
          }}
        />

            <Stack.Screen
          name="List"
          component={List}
          options={{
            title: "List Screen",
            headerLeft: null,
            headerTintColor: "#ffffff",
            headerStyle: {
              backgroundColor: "#3598DB",
            },
            headerTitleStyle: {
              color: "white",
            },
          }}

          // options={{ headerTitle: "Title", headerLeft: () => null }}
        />
         <Stack.Screen
          name="Details"
          component={Details}
          options={{
            title: "Detail Screen",
            headerLeft: null,
            headerTintColor: "#ffffff",
            headerStyle: {
              backgroundColor: "#3598DB",
            },
            headerTitleStyle: {
              color: "white",
            },
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
