import React, { FC, useEffect, useLayoutEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons'
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  useColorScheme,
  View,
} from 'react-native';
import colors from '../constants/colors';
import styles from '../constants/customStyle';
import { get } from 'lodash';

const Welcome = (props: any) => {
  const isDarkMode = useColorScheme() === 'dark';
  const userData = get(props, "route.params.userData", {});

  const logout = () => {
    props.navigation.replace('Login');
  }

  props.navigation.setOptions({
    title: `Welcome ${userData.first_name}`,
    headerLeft: () => <TouchableHighlight style={{ marginLeft: 10 }} onPress={logout}><Ionicons name="power-outline" color={colors.Red} size={25} /></TouchableHighlight>
  })

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <View
            style={{
              margin: 5,
            }}>
            <Ionicons name="person-circle-outline" color={colors.Red} size={120} />
          </View>
          <Text style={styles.h5}>{get(userData, "first_name", "")} {get(userData, "last_name", "")}</Text>
          <Text style={styles.h5}>{get(userData, "email", "")}</Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Welcome;