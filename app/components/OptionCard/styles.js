import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  cardStyle: {
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: '40%',
    height: 200,
    borderRadius: 10,
    marginHorizontal: 10,
    elevation: 8
  },
  circle: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    top: -10,
    left: -10,
    zIndex: -10
  },
  buttonTextStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})

export default styles;