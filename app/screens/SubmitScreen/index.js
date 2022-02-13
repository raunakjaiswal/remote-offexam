import React, { useState } from 'react';
import { Text, View, ActivityIndicator, ToastAndroid, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import styles from './styles';
import UserInput from '../../components/UserInput';
import SendButton from '../../components/SendButton';
import UploadButton from '../../components/UploadButton';

const SubmitScreen = () => {
  const [roll, setRoll] = useState("");
  const [fileName, setFileName] = useState("No file chosen");
  const [testId, setTestId] = useState("");
  const [fileData, setFileData] = useState("");
  const [showLoader, setShowLoader] = useState(false);

  const uploadPdf = async () => {
    try {
      const file = await DocumentPicker.getDocumentAsync({ type: "application/pdf" });
      if (file.type === "success") {
        setFileName(file.name);
        createPdfToUpload(file);
      } else {
        setFileName("No file choosen");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const createPdfToUpload = (response) => {
    let { name, size, uri } = response;
    let nameParts = name.split('.');
    let fileType = nameParts[nameParts.length - 1];
    var fileToUpload = {
      name: name,
      size: size,
      uri: uri,
      type: "application/" + fileType
    };
    setFileData(fileToUpload);
  }

  const sendData = () => {
    let formdata = new FormData();

    formdata.append("testid", testId);
    formdata.append("rollnumber", roll);
    formdata.append("file", fileData);

    setShowLoader(true);
    try {
      fetch("https://remote-offexam-backend.herokuapp.com/student/answer", {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formdata
      }).then((response) => {
        setShowLoader(false);
        return response.text();
      }).then((res) => {
        console.log(res);
        ToastAndroid.show(res, ToastAndroid.SHORT);
      })
    } catch (error) {
      setShowLoader(false);
      console.log(error);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight, }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
        {showLoader &&
          <View style={styles.loadingScreen}>
            <ActivityIndicator size="large" color="#549CF8" />
            <Text style={styles.loadingText}>Please Wait...</Text>
          </View>
        }

        <UserInput label="Roll No" placeholder="Enter roll number" setState={setRoll} />
        <UserInput label="Test Id" placeholder="Enter test id" setState={setTestId} />

        <View style={styles.inputBox}>
          <Text style={styles.inputLabel}>Attachments</Text>
          <UploadButton label="Choose PDF" func={uploadPdf} />
          <Text style={styles.pdfInfoText}>{fileName}</Text>
        </View>

        <SendButton label="Submit" func={sendData} />
      </ScrollView>
    </SafeAreaView>
  )
}

export default SubmitScreen;