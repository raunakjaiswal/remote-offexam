import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputBox: {
    width: '85%',
    marginVertical: 10
  },
  loadingScreen: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    opacity: 0.8,
    zIndex: 5
  },
  loadingText: {
    color: '#549CF8',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 16
  },
  inputLabel: {
    color: '#3D404F',
    fontSize: 15,
    fontWeight: 'bold'
  },
  pdfInfoText: {
    fontSize: 12,
    marginTop: 3,
    color: '#969696',
    fontWeight: 'bold'
  }
})

export default styles;