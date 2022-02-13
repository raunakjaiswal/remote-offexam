import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import KeyScreen from './screens/KeyScreen';
import SubmitScreen from './screens/SubmitScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer styles={styles.container}>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }} initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Key" component={KeyScreen} />
        <Stack.Screen name="Submit" component={SubmitScreen} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
