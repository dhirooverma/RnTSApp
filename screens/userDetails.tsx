import React from "react";
import { Text, View, Image, Pressable, StatusBar, ScrollView, Button, KeyboardAvoidingView, Alert, ActivityIndicator, TextInput, Keyboard, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from '../components/input';
import colors from '../constants/colors';
import styles from "../constants/customStyle";
import { Picker } from '@react-native-picker/picker';
import SelectBox from "../components/selectbox";
import { CustomAlert, Label, Loader } from "../components/components";
import { delay } from '../controller/commonFunction';
import API from "../helper/api";
import { get, set } from 'lodash';
import Ionicons from 'react-native-vector-icons/Ionicons'

interface MyState {
    editMode: boolean,
    selectedRole: String,
    topLoader: boolean,
    isLoading: boolean
}
export default class UserDetails extends React.Component<any, MyState> {
    loginData: any = {};
    userData: any = {};
    requiredFields = ['id', 'email', 'role_type', 'first_name', 'middile_name', 'last_name'];

    constructor(props: any) {
        super(props);
        this.state = {
            editMode: false,
            selectedRole: 'user',
            topLoader: false,
            isLoading: false,
        }
        this.initData();
    }

    initData = () => {
        let propUserData = get(this.props, 'route.params.userData', {});
        this.requiredFields.forEach(field => {
            set(this.userData, `${field}.value`, propUserData[field]);
            set(this.userData, `${field}.validity`, true);
        });
    }

    cancelEditing = async () => {
        this.setState({ isLoading: true });
        await delay(100)
        this.initData();
        this.setState({ editMode: false, isLoading: false });
    }

    saveData = async () => {
        Keyboard.dismiss();
        await delay(500);
        let valid = true;
        this.requiredFields.forEach((field) => {
            let isValid = get(this.userData, `${field}.validity`, false);
            if (!isValid) {
                valid = false;
            }
        });
        if (valid) {
            this.setState({ topLoader: true });
            let successful = false
            await delay(1000);
            let where = {
                id: get(this.userData, "id.value", ""),
                first_name: get(this.userData, "first_name.value", ""),
                middle_name: get(this.userData, "middile_name.value", ""),
                last_name: get(this.userData, "last_name.value", ""),
                role: get(this.userData, "role_type.value", ""),
            }
            let response = await API.userUpdate(where);
            if (response.status) {
                successful = true;
                this.props.navigation.navigate('UserDetails', { userData: response.data })
                CustomAlert("Data updated successfully");
            } else {
                CustomAlert(response.msg);
            }
            this.setState({ topLoader: false, editMode: !successful });
        } else {
            CustomAlert("Please fill all required fields with valid data");
        }
    }

    inputChangeHandler = (inputIdentifier: any, inputValue: any, inputValidity: any) => {
        // console.log("on change ===>>", inputIdentifier, inputValue, inputValidity)
        set(this.userData, `${inputIdentifier}.value`, inputValue);
        set(this.userData, `${inputIdentifier}.validity`, inputValidity);
    }

    toggleRegister = () => {
        this.setState({ editMode: !this.state.editMode });
    }

    onValueChange = (itemValue: any, itemIndex: number) => {
        set(this.userData, 'role_type.value', itemValue);
    }

    submitAction = () => {
        if (this.state.editMode) {
            this.saveData();
        } else {
            this.setState({ editMode: true });
        }
    }

    render() {
        const behaviors = Platform.OS == 'ios' ? 'padding' : undefined;
        return (
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={behaviors}>
                <View style={styles.container}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                        <SafeAreaView>
                            {this.state.isLoading ?
                                <></>
                                :
                                <View style={{
                                    alignItems: 'center',
                                }}>
                                    <View
                                        style={{
                                            margin: 5,
                                        }}>
                                        <Ionicons name="person-circle-outline" color={colors.Red} size={120} />
                                    </View>
                                    <Input
                                        id="email"
                                        key="email"
                                        label="Email"
                                        errorText="Please enter a valid Email!"
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        returnKeyType="next"
                                        initialValue={get(this.userData, 'email.value', '')}
                                        onInputChange={this.inputChangeHandler}
                                        editable={false}
                                        email
                                        disabled={true}
                                    />
                                    <Input
                                        id="first_name"
                                        key="first_name"
                                        label="First Name"
                                        errorText="Please enter a valid first name!"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        initiallyValid={true}
                                        returnKeyType="next"
                                        onInputChange={this.inputChangeHandler}
                                        initialValue={get(this.userData, 'first_name.value', '')}
                                        minLength={2}
                                        required
                                        disabled={!this.state.editMode}
                                        editable={this.state.editMode}
                                    />
                                    <Input
                                        id="middile_name"
                                        key="middile_name"
                                        label="Middle Name"
                                        errorText="Please enter a valid middle name!"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        returnKeyType="next"
                                        initiallyValid={true}
                                        initialValue={get(this.userData, 'middile_name.value', '')}
                                        onInputChange={this.inputChangeHandler}
                                        minLength={2}
                                        required
                                        disabled={!this.state.editMode}
                                        editable={this.state.editMode}
                                    />
                                    <Input
                                        id="last_name"
                                        key="last_name"
                                        label="Last Name"
                                        errorText="Please enter a valid last name!"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        returnKeyType="next"
                                        initiallyValid={true}
                                        initialValue={get(this.userData, 'last_name.value', '')}
                                        onInputChange={this.inputChangeHandler}
                                        minLength={2}
                                        required
                                        disabled={!this.state.editMode}
                                        editable={this.state.editMode}
                                    />
                                    <View style={{ ...styles.column, width: '90%' }}>
                                        <Label>Role</Label>
                                        <SelectBox disabled={!this.state.editMode} id={"role_type"} preSelected={get(this.userData, 'role_type.value', 'user')} onValueChange={this.onValueChange}>
                                            <Picker.Item label="User" value="user" />
                                            <Picker.Item label="Admin" value="admin" />
                                            <Picker.Item label="Super user" value="super user" />
                                        </SelectBox>
                                    </View>
                                    <View style={{ ...styles.row, width: '90%' }}>
                                        {this.state.editMode && <Pressable
                                            style={{ ...styles.button, backgroundColor: colors.Red, flex: 1 }}
                                            onPress={this.cancelEditing}
                                            android_ripple={{ color: 'white' }}>
                                            <Text style={styles.buttonText}>Cancel</Text>
                                        </Pressable>}
                                        {this.state.editMode && <View style={{ width: 10 }}></View>}
                                        <Pressable
                                            style={{ ...styles.button, backgroundColor: this.state.editMode ? colors.Green : colors.Black, flex: 1 }}
                                            onPress={this.submitAction}
                                            android_ripple={{ color: 'white' }}>
                                            <Text style={styles.buttonText}>{this.state.editMode ? "Save" : "Edit"}</Text>
                                        </Pressable>
                                    </View>
                                </View>}
                        </SafeAreaView>
                    </ScrollView>
                </View>
                {this.state.topLoader ? <Loader /> : <></>}
            </KeyboardAvoidingView>
        )
    }
}