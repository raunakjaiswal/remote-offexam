import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const UploadButton = (props) => {
  const { label, func } = props;
  return (
    <TouchableOpacity onPress={func} style={styles.uploadButtonStyle}>
      <Text style={styles.buttonTextStyle}>{label}</Text>
    </TouchableOpacity>
  )
}

export default UploadButton;