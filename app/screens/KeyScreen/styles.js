import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadButtonStyle: {
    backgroundColor: '#EFF7FE',
    width: '100%',
    padding: 12,
    borderColor: '#67A7F9',
    borderWidth: 1.7,
    borderRadius: 5,
    borderStyle: 'dashed',
    marginVertical: 12
  },
  buttonTextStyle: {
    color: '#67A7F9',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  inputBox: {
    width: '85%',
    marginVertical: 10
  },
  textInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'lightgray',
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginVertical: 12,
    borderRadius: 5
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