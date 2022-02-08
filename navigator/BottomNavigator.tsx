import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Admin from '../screens/admin';
import Welcome from '../screens/welcome';
import colors from '../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text } from 'react-native';
import { get } from 'lodash';

const Tab = createBottomTabNavigator();

const WelcomeTabs = (props) => {
    return (
        <Tab.Navigator screenOptions={{
            // headerShown: false,
            headerStyle: {
                backgroundColor: colors.LightGray
            },
            tabBarActiveBackgroundColor: colors.LightGray,
        }}>
            <Tab.Screen name="WelcomeScreen" component={Welcome} initialParams={props.route.params} options={{
                tabBarIcon: () => <Ionicons name="home-outline" size={22} />,
                tabBarLabel: (opt) => <Text style={{ color: opt.focused ? colors.Red : colors.Black }}>Welcome</Text>,
                tabBarStyle: { display: get(props, "route.params.userData.role", "") != "admin" ? "none" : "flex" },
            }} />
            {get(props, "route.params.userData.role", "") == "admin" && <Tab.Screen name="Admin" component={Admin} initialParams={props.route.params} options={{
                tabBarIcon: () => <Ionicons name="person-outline" size={22} />,
                tabBarLabel: (opt) => <Text style={{ color: opt.focused ? colors.Red : colors.Black }}>Admin</Text>,
                title: "Admin Panel",
            }} />}
        </Tab.Navigator>
    );
}

export default WelcomeTabs;