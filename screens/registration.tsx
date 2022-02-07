import React, { FC, useRef } from "react";
import { Button, TextInput } from "react-native";
import Input from "../components/input";
import styles from "../constants/customStyle";

const Registration: FC<{ inputChangeHandler: (inputIdentifier: any, inputValue: any, inputValidity: any) => void }> = (props: any) => {
    const passwordRef: any = useRef();

    const printRef = () => {
        passwordRef?.current?.focus?.call();
        let l1 = passwordRef?.current?.value;
        let l2 = passwordRef?.current?.props;
        console.log(l1, l2,);
    }
    return (<>
        {/* <TextInput
            ref={passwordRef}
            style={styles.input}
            value={"ssss"}
        // onChangeText={textChangeHandler}
        // onBlur={lostFocusHandler}
        /> */}
        <Button ref={passwordRef} title="mytile" onPress={() => { console.log("hello") }} />




        <Input
            id="fName"
            label="First Name"
            errorText="Please enter a valid name!"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            onInputChange={props.inputChangeHandler}
            minLength={2}
            required
        />
        <Input
            id="mName"
            label="Middle Name"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            onInputChange={props.inputChangeHandler}
        />
        <Input
            id="lName"
            label="Last Name"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            onInputChange={props.inputChangeHandler}
        />
        <Input
            id="email"
            label="Email"
            errorText="Please enter a valid Email!"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            onInputChange={props.inputChangeHandler}
            required
            email
        />
        <Input
            // ref={passwordRef}
            id="password"
            label="Password"
            errorText="Password should be minimum 8 characters at least one letter, one number and one special character!"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            onInputChange={props.inputChangeHandler}
            required
            password
        />
        <Input
            passwordValue={passwordRef.current?.value}
            id="confirmPassword"
            label="Confirm Password"
            errorText="Password not matching!"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            onInputChange={props.inputChangeHandler}
            required
            confirmPassword
        />
        <Button title={"check"} onPress={printRef} />

    </>);
}

export default Registration;