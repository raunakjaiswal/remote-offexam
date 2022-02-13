import React from 'react';
import { View } from 'react-native';
import OptionCard from '../../components/OptionCard';

import styles from './styles';

const HomeScreen = ({ navigation }) => {

  const moveToKeyScreen = () => {
    navigation.navigate("Key");
  }

  const moveToSubmitScreen = () => {
    navigation.navigate("Submit");
  }

  return (
    <View style={styles.container}>
      <OptionCard
        label="Create Key"
        onPressFunc={moveToKeyScreen}
        bgColor="#FFCE4B"
        circColor="#FF824A"
        labelColor="#BC751B" />
      <OptionCard
        label="Submit PDF"
        onPressFunc={moveToSubmitScreen}
        bgColor="#754F9D"
        circColor="#54218B"
        labelColor="#F2ECF6" />
    </View >
  )
}

export default HomeScreen;