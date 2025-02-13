import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button, Dimensions, Alert, Image, KeyboardAvoidingView, ScrollView, Platform, TextInput, StatusBar, useWindowDimensions } from 'react-native';

const App = () => {
  const { width, height } = useWindowDimensions(); // Sử dụng hook useWindowDimensions lay chieu cao chieu rong
  const isPortrait = height >= width; // kiem tra che do doc hay ngang
  const imageWidth = width * 0.8; // chieu rong hinh anh bang 80pt
  const imageHeight =isPortrait ? imageWidth * 0.6 : imageWidth * 0.2; // chieu cao so voi chieu rong 50pt
  const [inputValue, setInputValue] = useState('');

  const statusBarStyle = isPortrait ? 'dark-content' : 'light-content'; // font chu thanh trang thái
  const statusBarBackgroundColor = Platform.select({
    ios: isPortrait ? 'white' : 'black', // mau nen cho ios
    android: isPortrait ? 'white' : 'darkblue', // mau nen cho android
  });
  return (
    <>
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor={statusBarBackgroundColor}
        translucent={false} // ktra thanh trang thai khong trong suot
      />
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // dung 'height' cho Android
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0} // chinh offset cho Android

      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Image
            source={{ uri: 'data:image/jpeg;base64,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' }}
            style={[styles.image, { width: imageWidth, height: imageHeight }]}
            resizeMode="contain"
          />
          <TextInput
            style={styles.input}
            placeholder="Nhập văn bản"
            value={inputValue}
            onChangeText={setInputValue}
          />
          <View style={[styles.buttonContainer, isPortrait ? styles.portrait : styles.landscape]}>
            <View style={styles.buttonWrapper}>
              <Button title="Button 1" onPress={() => Alert.alert('bạn vừa nhập ', inputValue)} color='green'/>
            </View>
            <View style={styles.buttonWrapper}>
              <Button title="Button 2" onPress={() => Alert.alert('day la Button 2')} color='red'/>
            </View>
            
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>    
  );};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Platform.select({ ios: 20, android: 15 }), // dat gia tri khac nhau cho and va ios
  },
  scrollViewContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '70%', 
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWrapper: {
    margin: 10, 
    width: '30%', 
  },
  portrait: {
    flexDirection: 'column', // xep nut theo chieu doc
  },
  landscape: {
    flexDirection: 'row', // xep nut theo chieu ngang
    justifyContent: 'space-between', 
  },
});

export default App;
