import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const OptionCard = (props) => {
  const { label, onPressFunc, bgColor, circColor, labelColor } = props;
  return (
    <TouchableOpacity onPress={onPressFunc} style={[styles.cardStyle, { backgroundColor: bgColor }]}>
      <View style={[styles.circle, { backgroundColor: circColor }]}></View>
      <Text style={[styles.buttonTextStyle, { color: labelColor }]}>{label}</Text>
    </TouchableOpacity>
  )
}

export default OptionCard;