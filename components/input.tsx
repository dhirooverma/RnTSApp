import React, { FC, useReducer, useEffect, forwardRef } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import colors from '../constants/colors';
import styles from '../constants/customStyle';

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state: any, action: any) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true
      };
    default:
      return state;
  }
};

const Input = forwardRef((props: any, ref) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : '',
    isValid: props.initiallyValid ? props.initiallyValid : false,
    touched: false
  });

  const { onInputChange, id, initialValue } = props;

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange, id, initialValue]);

  const textChangeHandler = (text) => {
    const onlyLetters = /^[a-zA-Z]+$/;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }
    if (props.password && !passwordRegex.test(text)) {
      isValid = false;
    }
    if (props.confirmPassword) {
      if (props.signupData && props.signupData.password && props.signupData.password.value === text) {
        isValid = true;
      } else {
        isValid = false;
      }
    }
    if (props.onlyLetters && !onlyLetters.test(text.toLowerCase())) {
      isValid = false;
    }
    dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
  };

  const lostFocusHandler = () => {
    dispatch({ type: INPUT_BLUR });
  };

  return (
    <View style={props.disabled ? styles.disabledFormControl : styles.formControl}>
      <Text style={styles.label}>{props.label}{props.required ? "*" : ""}</Text>
      <TextInput
        {...props}
        ref={ref}
        style={props.disabled ? styles.inputDisabled : styles.input}
        value={inputState.value}
        onChangeText={textChangeHandler}
        onBlur={lostFocusHandler}
      />
      {!props.disabled && !inputState.isValid && inputState.touched && <Text style={styles.warning}>{props.errorText}</Text>}
    </View>
  );
});

export default Input;