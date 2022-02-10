
import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from "../screens/welcome";
import Login from "../screens/login";
import { NativeBaseProvider } from "native-base";
import colors from "../constants/colors";
import WelcomeTabs from "./BottomNavigator";
import UserDetails from "../screens/userDetails";

const Stack = createNativeStackNavigator();
export default class AppNavigator extends React.Component {
    render() {
        return (
            <NativeBaseProvider>
                <Stack.Navigator screenOptions={{
                    headerStyle: {
                        backgroundColor: colors.LightGray
                    }
                }}>
                    <Stack.Screen
                        name="Login"
                        component={Login}
                        options={{ title: 'Login', headerShown: false }}
                    />
                    <Stack.Screen
                        name="Welcome"
                        component={WelcomeTabs}
                        options={{ title: 'Welcome', headerShown: false, }}
                    />
                    <Stack.Screen
                        name="UserDetails"
                        component={UserDetails}
                        options={{ title: 'User Details', headerShown: true, headerBackTitleVisible: false }}
                    />
                </Stack.Navigator>
            </NativeBaseProvider>

        );
    }
}