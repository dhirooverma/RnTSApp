import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Admin from '../screens/admin';
import Welcome from '../screens/welcome';
import colors from '../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, View } from 'react-native';
import { get } from 'lodash';
import MapScreen from '../screens/mapScreen';

const Tab = createBottomTabNavigator();

const WelcomeTabs = (props) => {
    return (
        <Tab.Navigator initialRouteName={get(props, "route.params.userData.role", "") == "admin" ? 'Admin' : 'WelcomeScreen'} screenOptions={{
            // headerShown: false,
            headerStyle: {
                backgroundColor: colors.LightGray
            },
            tabBarInactiveBackgroundColor: colors.LightGrey,
            tabBarActiveBackgroundColor: colors.LightBlack,

        }}>
            <Tab.Screen name="WelcomeScreen" component={Welcome} initialParams={props.route.params} options={{
                tabBarIcon: (opt) => <Ionicons name="home-outline" size={22} color={opt.focused ? colors.Red : colors.Black} />,
                tabBarLabel: (opt) => <View style={{ marginHorizontal: 15 }}><Text style={{ color: opt.focused ? colors.Red : colors.Black }}>HOME</Text></View>,
                tabBarStyle: { display: get(props, "route.params.userData.role", "") != "admin" ? "none" : "flex" },
            }} />
            <Tab.Screen name="MapScreen" component={MapScreen} initialParams={props.route.params} options={{
                tabBarIcon: (opt) => <Ionicons name="navigate-circle-sharp" size={25} color={opt.focused ? colors.Red : colors.Black} />,
                tabBarLabel: (opt) => <View style={{ marginHorizontal: 15 }}><Text style={{ color: opt.focused ? colors.Red : colors.Black }}>MAP</Text></View>,
                tabBarStyle: { display: get(props, "route.params.userData.role", "") != "admin" ? "none" : "flex" },
            }} />
            {get(props, "route.params.userData.role", "") == "admin" && <Tab.Screen name="Admin" component={Admin} initialParams={props.route.params} options={{
                tabBarIcon: (opt) => <Ionicons name="person-outline" size={22} color={opt.focused ? colors.Red : colors.Black} />,
                tabBarLabel: (opt) => <View style={{ marginHorizontal: 15 }}><Text style={{ color: opt.focused ? colors.Red : colors.Black }}>ADMIN</Text></View>,
                title: "Admin Panel",
            }} />}
        </Tab.Navigator>
    );
}

export default WelcomeTabs;