import React, { FC, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons'
import {
    FlatList,
    SafeAreaView,
    Text,
    TouchableHighlight,
    View,
} from 'react-native';
import colors from '../constants/colors';
import styles from '../constants/customStyle';
import { useState } from 'react';
import { CustomAlert, Loader } from '../components/components';
import API from '../helper/api';
import { Divider } from 'native-base';
import { delay } from '../controller/commonFunction';

const Admin: FC = (props: any) => {
    const userData = props?.route?.params?.userData;
    const [userList, setUserList] = useState({});
    const [topLoader, setTopLoader] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const deleteUser = async (id) => {
        setTopLoader(true);
        API.deleteUsers(id)
        getUserList(true);
    }

    const logout = () => {
        props.navigation.replace('Login');
    }

    useEffect(() => {
        getUserList(true);
    }, []);

    const getUserList = async (init = false) => {
        await delay(500);
        !init && setRefreshing(true);
        let usersData = await API.getUsers();
        if (usersData.status) {
            setUserList(usersData.data);
        } else {
            CustomAlert(usersData.msg);
        }
        init ? setTopLoader(false) : setRefreshing(false);
        console.log(userList);
    }

    props.navigation.setOptions({ headerLeft: () => <TouchableHighlight style={{ marginLeft: 10 }} onPress={logout}><Ionicons name="power-outline" color={colors.Red} size={25} /></TouchableHighlight> })

    const _renderItem = ({ item }) => (
        <View style={{ flexDirection: "row", justifyContent: 'space-between', padding: 5, opacity: userData.email == item.email ? 0.5 : 1 }}>
            <View style={{ flex: 8 }}><Text numberOfLines={1} style={styles.h5}>{item.email}</Text></View>
            <View style={{ flexDirection: "row", flex: 2, justifyContent: "flex-end" }}>
                <TouchableHighlight><Ionicons name="create-outline" color={colors.Red} size={25} /></TouchableHighlight>
                <TouchableHighlight style={{ marginLeft: 10 }} onPress={() => userData.email != item.email && deleteUser(item.id)}><Ionicons name="trash-outline" color={colors.Red} size={25} /></TouchableHighlight>
            </View>
        </View>
    );

    const separator = () => {
        return <Divider orientation="horizontal" />;
    };

    return (
        <View style={{ flex: 1, backgroundColor: colors.LightBlack }}>
            <SafeAreaView>
                <FlatList
                    onRefresh={getUserList}
                    data={Object.values(userList)}
                    renderItem={_renderItem}
                    refreshing={refreshing}
                    ItemSeparatorComponent={separator}
                />
            </SafeAreaView>
            {topLoader ? <Loader /> : <></>}
        </View>
    );
};

export default Admin;