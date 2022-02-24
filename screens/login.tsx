import React, { createRef } from "react";
import { Text, View, Image, Pressable, StatusBar, ScrollView, Button, KeyboardAvoidingView, Alert, ActivityIndicator, TextInput, Keyboard, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from '../components/input';
import colors from '../constants/colors';
import styles from "../constants/customStyle";
import { CustomAlert, Label, Loader } from "../components/components";
import { delay } from '../controller/commonFunction';
import API from "../helper/api";
import { get, set } from 'lodash';

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
    requiredFields: any = ['email', 'first_name', 'middile_name', 'last_name', 'password'];
    emailRef: any = createRef();
    fNameRef: any = createRef();
    mNameRef: any = createRef();
    lNameRef: any = createRef();
    passwordRef: any = createRef();
    cPasswordRef: any = createRef();
    loginEmailRef: any = createRef();
    loginPasswordRef: any = createRef();

    constructor(props: any) {
        super(props);
        this.state = {
            registerPage: false,
            selectedRole: 'user',
            topLoader: false,
        }
    }

    tryLogin = async () => {
        this.loginEmailRef.current.focus();
        this.loginPasswordRef.current.focus();
        Keyboard.dismiss();
        await delay(500);
        let valid = true;
        if (!get(this.loginData, "email.validity", false) || !get(this.loginData, "password.validity", false)) {
            valid = false;
        }
        if (valid) {
            this.setState({ topLoader: true });
            await delay(1000);
            let response = await API.login(get(this.loginData, "email.value", ""), get(this.loginData, "password.value", ""));
            if (response.status) {
                this.loginData = {};
                this.props.navigation.replace('Welcome', { userData: response.data });
            } else {
                CustomAlert(response.msg);
                this.setState({ topLoader: false });
            }
        } else {
            CustomAlert("Please fill all required fields with valid data");
        }

    }

    trySignup = async () => {
        this.emailRef.current.focus();
        this.fNameRef.current.focus();
        this.mNameRef.current.focus();
        this.lNameRef.current.focus();
        this.passwordRef.current.focus();
        this.cPasswordRef.current.focus();
        Keyboard.dismiss();
        await delay(500);
        let valid = true;
        this.requiredFields.forEach((field) => {
            let isValid = get(this.signupData, `${field}.validity`, false);
            if (!isValid) {
                valid = false;
            }
        });
        if (valid) {
            let pass = get(this.signupData, `password.value`, "");
            let confirmPass = get(this.signupData, `confirm_password.value`, "1");
            if (pass !== confirmPass) {
                CustomAlert("Password not matching with confirm password!");
                return;
            }
            this.setState({ topLoader: true });
            let successful = false
            await delay(1000);
            let usersData = await API.getUsers();
            if (usersData.status) {
                let alreadyExist = false;
                if (usersData.data.length > 0) {
                    for (const key in usersData.data) {
                        if (usersData.data[key]['email'] == get(this.signupData, "email.value", "")) {
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
                        first_name: get(this.signupData, "first_name.value", ""),
                        middle_name: get(this.signupData, "middile_name.value", ""),
                        last_name: get(this.signupData, "last_name.value", ""),
                        email: get(this.signupData, "email.value", ""),
                        password: get(this.signupData, "password.value", ""),
                    }
                    let response = await API.signup(where);
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
            CustomAlert("Please fill all required fields with valid data");
        }
    }

    inputChangeHandler = (inputIdentifier: any, inputValue: any, inputValidity: any) => {
        if (__DEV__) { console.log("on change ===>>", inputIdentifier, inputValue, inputValidity); }
        if (this.state.registerPage) {
            set(this.signupData, `${inputIdentifier}.value`, inputValue);
            set(this.signupData, `${inputIdentifier}.validity`, inputValidity);
        } else {
            set(this.loginData, `${inputIdentifier}.value`, inputValue);
            set(this.loginData, `${inputIdentifier}.validity`, inputValidity);
        }
    }

    toggleRegister = () => {
        this.setState({ registerPage: !this.state.registerPage });
    }

    registrationUI() {
        return (<>
            <Input
                ref={this.fNameRef}
                id="first_name"
                label="First Name"
                errorText="minimum 4 characters! only alphabet!"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                onInputChange={this.inputChangeHandler}
                minLength={4}
                // autoFocus={true}
                required
                onlyLetters
            />
            <Input
                ref={this.mNameRef}
                id="middile_name"
                label="Middle Name"
                errorText="minimum 4 characters! only alphabet!"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                onInputChange={this.inputChangeHandler}
                minLength={4}
                required
                onlyLetters
            />
            <Input
                ref={this.lNameRef}
                id="last_name"
                label="Last Name"
                errorText="minimum 4 characters! only alphabet!"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                onInputChange={this.inputChangeHandler}
                minLength={4}
                required
                onlyLetters
            />
            <Input
                ref={this.emailRef}
                id="email"
                label="Email"
                errorText="Please enter valid Email!"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                onInputChange={this.inputChangeHandler}
                required
                email
            />
            <Input
                ref={this.passwordRef}
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
                ref={this.cPasswordRef}
                secureTextEntry={true}
                signupData={this.signupData}
                id="confirm_password"
                label="Confirm Password"
                // errorText="Password not matching!"
                autoCapitalize="none"
                autoCorrect={false}
                // initialValue={'abcd'}
                returnKeyType="next"
                onInputChange={this.inputChangeHandler}
                required
                confirmPassword
            />
        </>);
    }

    render() {
        const behaviors = Platform.OS == 'ios' ? 'padding' : undefined;
        return (
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={behaviors}>
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
                                            ref={this.loginEmailRef}
                                            key={"email"}
                                            id="email"
                                            label="Email"
                                            errorText="Please enter a valid Email!"
                                            keyboardType="email-address"
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            returnKeyType="next"
                                            onInputChange={this.inputChangeHandler}
                                            // initialValue={get(this.loginData, "email.value", "")}
                                            initialValue={'admin@gmail.com'}
                                            initiallyValid={true}
                                            required
                                            email
                                        />
                                        <Input
                                            ref={this.loginPasswordRef}
                                            secureTextEntry={true}
                                            key="password"
                                            id="password"
                                            label="Password"
                                            // keyboardType='numeric'
                                            errorText="Please enter a valid Password!"
                                            initiallyValid={true}
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            returnKeyType="next"
                                            onInputChange={this.inputChangeHandler}
                                            // initialValue={get(this.loginData, "email.password", "")}
                                            initialValue={'dhiroo@1'}
                                            required
                                            minLength={6}
                                        />
                                    </> :
                                    this.registrationUI()
                                }
                                <Pressable
                                    style={styles.button}
                                    onPress={this.state.registerPage ? this.trySignup : this.tryLogin}
                                    android_ripple={{ color: 'white' }}>
                                    <Text style={styles.buttonText}>{this.state.registerPage ? "Sign Up" : "Login"}</Text>
                                </Pressable>
                                <Text onPress={this.toggleRegister} style={{ margin: 5, fontSize: 20, color: colors.White }}>{this.state.registerPage ? "Go back to Login!" : "New User? Register!"}</Text>
                            </View>
                        </SafeAreaView>
                    </ScrollView>
                </View>
                {this.state.topLoader ? <Loader /> : <></>}
            </KeyboardAvoidingView>
        )
    }
}