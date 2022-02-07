import { Picker } from "@react-native-picker/picker";
import { Icon } from "native-base";
import React, { useState, FC, useMemo, useCallback } from "react";
import { Button, Modal, Platform, Pressable, Text, TouchableWithoutFeedback, View } from "react-native";
import styles from "../constants/customStyle";
import Ionicons from 'react-native-vector-icons/Ionicons';

interface requiedProp {
    preSelected: String,
    onValueChange?: ((itemValue: any, itemIndex: number) => void) | undefined,
    id: String
}

const SelectBox: FC<requiedProp | any> = (props: any) => {

    const [selectedValue, setSelectedValue] = useState(props.preSelected);
    const [isVisible, setVisible] = useState(false);

    const androidView = useMemo(() => {
        return (<Picker
            {...props}
            style={styles.picker}
            selectedValue={selectedValue}
            onValueChange={(itemValue, itemIndex) => {
                setSelectedValue(itemValue);
                props.onValueChange(itemValue, itemIndex);
            }
            }>
            {props.children}
        </Picker>);

    }, [selectedValue, props.preSelected])

    const openModal = () => {
        setVisible(true);
    }

    const closeModal = () => {
        console.log("calleedd close modal", selectedValue);
        setVisible(false);
    }

    const iosView = useMemo(() => {
        return (
            <>
                <Pressable
                    style={styles.selectBox}
                    onPress={openModal}
                    android_ripple={{ color: 'green' }}>
                    <Text style={styles.selectBoxText}>{(selectedValue ?? "").toUpperCase()}</Text>
                    <Icon as={Ionicons} name="chevron-down-outline" />
                </Pressable>
                <Modal
                    supportedOrientations={['portrait', 'landscape']}
                    animationType="slide"
                    transparent={true}
                    visible={isVisible}
                    style={styles.modalView}
                // onDismiss={() => { setSelectedValue(itemValue) }}
                // onOrientationChange={(evnt) => {
                //     console.log(evnt);
                // }}
                >
                    <TouchableWithoutFeedback onPress={closeModal}>
                        <View style={styles.modalContainerStyle}>
                            <TouchableWithoutFeedback onPress={(e) => e.preventDefault()}>
                                <View style={styles.modalContent}>
                                    <Picker
                                        style={{ justifyContent: 'center', height: '100%' }}
                                        {...props}
                                        selectedValue={selectedValue}
                                        onValueChange={(itemValue, itemIndex) => {
                                            setSelectedValue(itemValue);
                                            props.onValueChange(itemValue, itemIndex);
                                        }
                                        }>
                                        {props.children}
                                    </Picker>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </>
        )
    }, [isVisible, selectedValue, props.preSelected])
    return Platform.OS == "android" ? androidView : iosView;
}

export default SelectBox;