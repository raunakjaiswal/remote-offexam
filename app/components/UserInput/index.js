import React from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from './styles';

const UserInput = (props) => {
  const { label, placeholder, setState } = props;
  return (
    <View style={styles.inputBox}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput onChangeText={setState} style={styles.textInput} placeholder={placeholder} />
    </View>
  )
}

export default UserInput;