import React, { FC } from "react"
import { ActivityIndicator, Alert, Text, View } from "react-native"
import colors from "../constants/colors"
import styles from "../constants/customStyle"

export const Label: FC = (props) => {
    return <Text {...props} style={styles.label}>{props.children}</Text>
}

export const Loader: FC = () => {
    return (
        <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, position: 'absolute', height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size={'large'} color={colors.Red} />
        </View>
    )
}

export const CustomAlert = (title, body = '') => {
    return (
        Alert.alert(
            title,
            body,
            [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]
        )
    );
}