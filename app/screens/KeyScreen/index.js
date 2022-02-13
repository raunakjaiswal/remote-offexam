import React, { useState } from 'react';
import { Text, View, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import styles from './styles';
import CryptoES from 'crypto-es';
import * as SMS from 'expo-sms';
import UserInput from '../../components/UserInput';
import SendButton from '../../components/SendButton';
import UploadButton from '../../components/UploadButton';

const KeyScreen = () => {
  const [roll, setRoll] = useState("");
  const [fileName, setFileName] = useState("No file chosen");
  const [testId, setTestId] = useState("");
  const [sha256String, setsha256String] = useState("");

  const uploadPdf = async () => {
    try {
      const file = await DocumentPicker.getDocumentAsync({ type: "application/pdf" });
      if (file.type === "success") {
        setFileName(file.name);
        await readFile(file.uri);
      } else {
        setFileName("No file choosen");
      }
    } catch (error) {
      console.log(error);
      console.warn("Could not read file");
    }
  }

  const readFile = async (fileUri) => {
    try {
      const fileBuffer = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.Base64 });
      generateSHAKey(fileBuffer);
    } catch (error) {
      console.log(error);
    }
  }

  const generateSHAKey = (data) => {
    const hash = CryptoES.SHA256(data);
    const hashStr = hash.toString(CryptoES.enc.Hex);
    console.log("Sha256", hashStr);
    setsha256String(hashStr);
  }

  const sendSms = async () => {
    try {
      const isAvailable = await SMS.isAvailableAsync();
      const message = sha256String + "%" + testId + "%" + roll;

      if (isAvailable) {
        const { result } = await SMS.sendSMSAsync(["+18045757447"], message);
        console.log(result);
      } else {
        console.log("SMS not available")
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight, }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
        <UserInput label="Roll No" placeholder="Enter roll no" setState={setRoll} />
        <UserInput label="Test Id" placeholder="Enter test id" setState={setTestId} />

        <View style={styles.inputBox}>
          <Text style={styles.inputLabel}>Attachments</Text>
          <UploadButton label="Choose PDF" func={uploadPdf} />
          <Text style={styles.pdfInfoText}>{fileName}</Text>
        </View>

        <SendButton label="Send SMS" func={sendSms} />
      </ScrollView>
    </SafeAreaView>
  )
}

export default KeyScreen;