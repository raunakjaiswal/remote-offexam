import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const SendButton = (props) => {
  const { label, func } = props;
  return (
    <TouchableOpacity onPress={func} style={styles.sendBtnStyle}>
      <Text style={[styles.buttonTextStyle, { color: '#E6F1FE' }]}>{label}</Text>
    </TouchableOpacity>
  )
}

export default SendButton;