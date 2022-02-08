import React from "react";
import { Text, View, Image, Pressable, StatusBar, ScrollView, Button, KeyboardAvoidingView, Alert, ActivityIndicator, TextInput, Keyboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from '../components/input';
import colors from '../constants/colors';
import styles from "../constants/customStyle";
import { Picker } from '@react-native-picker/picker';
import SelectBox from "../components/selectbox";
import { CustomAlert, Label, Loader } from "../components/components";
import { delay } from '../controller/commonFunction';
import API from "../helper/api";

interface MyProps { }

interface MyState {
    registerPage: boolean,
    selectedRole: String,
    topLoader: boolean,
    loginData?: object | any
    signupData?: object | any
}
export default class Login extends React.Component<any, MyState> {
    loginData: any = {};
    signupData: any = {};

    constructor(props: any) {
        super(props);
        this.state = {
            registerPage: false,
            selectedRole: 'user',
            topLoader: false,
        }
    }

    tryLogin = async () => {
        Keyboard.dismiss();
        // let response = await API.login("lukky@gmail.com", "Lukky@123");
        let allFields = Object.values(this.loginData)
        let valid = true;
        console.log(this.loginData);
        allFields.forEach((data: any) => {
            if (!(data?.validity)) {
                valid = false;
                console.log("entered");
            }
        });
        if (allFields.length > 0 && valid) {
            this.setState({ topLoader: true });
            await delay(1000);
            let response = await API.login(this.loginData?.email?.value, this.loginData?.password?.value);
            console.log(response.status)
            let data = JSON.parse(JSON.stringify(this.loginData));
            if (response.status) {
                this.loginData = {};
                this.props.navigation.replace('Welcome', { userData: response.data });
            } else {
                CustomAlert(response.msg);
                this.setState({ topLoader: false });
            }
        } else {
            CustomAlert("Please fill all required details");
        }

    }

    trySignup = async () => {
        Keyboard.dismiss();
        await delay(500);
        let allFields = Object.values(this.signupData)
        let valid = true;
        allFields.forEach((data: any) => {
            if (!(data?.validity)) {
                valid = false;
            }
        });
        if (allFields.length > 0 && valid) {
            this.setState({ topLoader: true });
            let successful = false
            await delay(1000);
            let usersData = await API.getUsers();
            if (usersData.status) {
                let alreadyExist = false;
                if (usersData.data.length > 0) {
                    for (const key in usersData.data) {
                        if (usersData.data[key]['email'] == this.signupData?.email?.value) {
                            alreadyExist = true;
                            break;
                        }
                    }
                }
                if (alreadyExist) {
                    CustomAlert("This email is already exist, please enter different email");
                } else {
                    this.signupData
                    let where = {
                        first_name: this.signupData?.fName?.value,
                        middle_name: this.signupData?.mName?.value ?? "",
                        last_name: this.signupData?.lName?.value ?? "",
                        email: this.signupData?.email?.value,
                        password: this.signupData?.password?.value,
                    }
                    let response = await API.signup(where);
                    let data = JSON.parse(JSON.stringify(this.signupData));
                    if (response.status) {
                        this.signupData = {};
                        successful = true;
                        this.props.navigation.replace('Welcome', { userData: response.data });
                    } else {
                        CustomAlert(response.msg);
                    }
                }
            } else {
                CustomAlert(usersData.msg);
            }
            if (!successful) {
                this.setState({ topLoader: false });
            }
        } else {
            CustomAlert("Please fill all required details");
        }
    }

    inputChangeHandler = (inputIdentifier: any, inputValue: any, inputValidity: any) => {
        if (this.state.registerPage) {
            this.signupData[inputIdentifier] ??= {};
            this.signupData[inputIdentifier]['value'] = inputValue;
            this.signupData[inputIdentifier]['validity'] = inputValidity;
        } else {
            this.loginData[inputIdentifier] ??= {};
            this.loginData[inputIdentifier]['value'] = inputValue;
            this.loginData[inputIdentifier]['validity'] = inputValidity;
        }
    }

    toggleRegister = () => {
        this.setState({ registerPage: !this.state.registerPage });
    }

    onValueChange = (itemValue: any, itemIndex: number) => {
        console.log(itemValue);
    }

    registrationUI() {
        return (<>
            <Input
                id="fName"
                label="First Name"
                errorText="Please enter a valid name!"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                onInputChange={this.inputChangeHandler}
                minLength={2}
                required
            />
            <Input
                id="mName"
                label="Middle Name"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                initiallyValid={true}
                onInputChange={this.inputChangeHandler}
                minLength={2}
                required
            />
            <Input
                id="lName"
                label="Last Name"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                initiallyValid={true}
                onInputChange={this.inputChangeHandler}
                minLength={2}
                required
            />
            <Input
                id="email"
                label="Email"
                errorText="Please enter a valid Email!"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                onInputChange={this.inputChangeHandler}
                required
                email
            />
            <Input
                secureTextEntry={true}
                id="password"
                label="Password"
                errorText="Password should be minimum 8 characters at least one letter, one number and one special character!"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                onInputChange={this.inputChangeHandler}
                required
                password
            />
            <Input
                secureTextEntry={true}
                signupData={this.signupData}
                id="confirmPassword"
                label="Confirm Password"
                errorText="Password not matching!"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                onInputChange={this.inputChangeHandler}
                required
                confirmPassword
            />
        </>);
    }

    render() {
        return (
            <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding'>
                <View style={styles.container}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                        <SafeAreaView>
                            <View style={{
                                alignItems: 'center',
                            }}>
                                <StatusBar backgroundColor='blue' barStyle='light-content' />
                                <View>
                                    <Image style={styles.logo} source={require('../assets/images/fmc.png')} />
                                </View>
                                {!this.state.registerPage ?
                                    <>
                                        <Input
                                            key={"email"}
                                            id="email"
                                            label="Email"
                                            errorText="Please enter a valid Email!"
                                            keyboardType="email-address"
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            returnKeyType="next"
                                            onInputChange={this.inputChangeHandler}
                                            initialValue={this.loginData?.email?.value ?? ""}
                                            // initiallyValid={true}
                                            required
                                            email
                                        />
                                        <Input
                                            secureTextEntry={true}
                                            id="password"
                                            label="Password"
                                            errorText="Please enter a valid Password!"
                                            // keyboardType="email-address"
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            returnKeyType="next"
                                            onInputChange={this.inputChangeHandler}
                                            initialValue={this.loginData?.password?.value ?? ""}
                                            // initiallyValid={false}
                                            required
                                            minLength={6}
                                        />
                                        {/* <View style={{ ...styles.column, width: '90%' }}>
                                            <Label>Role</Label>
                                            <SelectBox id={"role"} preSelected={'user'} onValueChange={this.onValueChange}>
                                                <Picker.Item label="User" value="user" />
                                                <Picker.Item label="Admin" value="admin" />
                                                <Picker.Item label="Super user" value="super user" />
                                            </SelectBox>
                                        </View> */}
                                    </> :
                                    this.registrationUI()
                                    // <Registration inputChangeHandler={this.inputChangeHandler} />

                                }
                                <Pressable
                                    style={styles.button}
                                    onPress={this.state.registerPage ? this.trySignup : this.tryLogin}
                                    android_ripple={{ color: 'white' }}>
                                    <Text style={styles.buttonText}>{this.state.registerPage ? "Sign Up" : "Login"}</Text>
                                </Pressable>
                                <Button onPress={this.toggleRegister} color={colors.White} title={this.state.registerPage ? "Go back to Login!" : "New User? Register!"} />
                            </View>
                        </SafeAreaView>
                    </ScrollView>
                </View>
                {this.state.topLoader ? <Loader /> : <></>}
            </KeyboardAvoidingView>
        )
    }
}