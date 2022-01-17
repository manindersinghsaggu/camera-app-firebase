// import React from 'react';
import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/HomeScreen';
import ViewProfile from './src/ViewProfile';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ViewProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

// import React, {Component} from 'react';
// import {StyleSheet, View, Alert} from 'react-native';
// import {RNCamera} from 'react-native-camera';

// class App extends Component {
//   state = {
//     barcodes: [],
//   };

//   barcodeRecognized = ({barcodes}) => {
//     barcodes.forEach(barcode => console.log(barcode.data));
//     this.setState({barcodes});
//   };

//   renderBarcodes = () => (
//     <View>{this.state.barcodes.map(this.renderBarcode)}</View>
//   );

//   renderBarcode = ({data}) =>
//     Alert.alert(
//       'Scanned Data',
//       data,
//       [
//         {
//           text: 'Okay',
//           onPress: () => console.log('Okay Pressed'),
//           style: 'cancel',
//         },
//       ],
//       {cancelable: false},
//     );

//   render() {
//     return (
//       <View style={styles.container}>
//         <RNCamera
//           ref={ref => {
//             this.camera = ref;
//           }}
//           style={styles.scanner}
//           onGoogleVisionBarcodesDetected={this.barcodeRecognized}>
//           {this.renderBarcodes}
//         </RNCamera>
//         {/* <RNCamera
//           style={{ flex: 1, alignItems: 'center' }}
//           ref={ref => {
//             this.camera = ref
//           }}
//         /> */}
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     backgroundColor: 'black',
//   },
//   scanner: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },

// });
// Firebase Storage to upload file
// import storage, {firebase} from '@react-native-firebase/storage';

// import React, {PureComponent} from 'react';
// import {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import {RNCamera} from 'react-native-camera';

// class App extends PureComponent {
//   render() {
//     return (
//       <View style={styles.container}>
//         <RNCamera
//           ref={ref => {
//             this.camera = ref;
//           }}
//           style={styles.preview}
//           type={RNCamera.Constants.Type.front}
//           flashMode={RNCamera.Constants.FlashMode.off}
//           androidCameraPermissionOptions={{
//             title: 'Permission to use camera',
//             message: 'We need your permission to use your camera',
//             buttonPositive: 'Ok',
//             buttonNegative: 'Cancel',
//           }}
//           androidRecordAudioPermissionOptions={{
//             title: 'Permission to use audio recording',
//             message: 'We need your permission to use your audio',
//             buttonPositive: 'Ok',
//             buttonNegative: 'Cancel',
//           }}
//           onGoogleVisionBarcodesDetected={({barcodes}) => {
//             console.log(barcodes);
//           }}
//         />
//         <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
//           <TouchableOpacity
//             // onPress={this.takePicture.bind(this)}
//             onPress={this.handleSubmit()}
//             style={styles.capture}>
//             <Text style={{fontSize: 14}}> SNAP </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   }

//   takePicture = async () => {
//     if (this.camera) {
//       const options = {quality: 0.5, base64: true};
//       const data = await this.camera.takePictureAsync(options);
//       console.log(data.uri);

//       this._uploadFile(data);
//     }
//   };

//   _uploadFile = async filePath => {
//     try {
//       // Check if file selected
//       if (Object.keys(filePath).length == 0)
//         return alert('Please Select any File');
//       // setLoading(true);

//       // Create Reference
//       console.log(filePath.uri.replace('file://', ''));
//       console.log(filePath.name);
//       const reference = storage().ref(`/myfiles/${filePath.name}`);

//       // Put File
//       const task = reference.putFile(filePath.uri.replace('file://', ''));
//       // You can do different operation with task
//       // task.pause();
//       // task.resume();
//       // task.cancel();

//       task.on('state_changed', taskSnapshot => {
//         setProcess(
//           `${taskSnapshot.bytesTransferred} transferred
//            out of ${taskSnapshot.totalBytes}`,
//         );
//         console.log(
//           `${taskSnapshot.bytesTransferred} transferred
//            out of ${taskSnapshot.totalBytes}`,
//         );
//       });
//       task.then(() => {
//         alert('Image uploaded to the bucket!');
//         setProcess('');
//       });
//     } catch (error) {
//       console.log('Error->', error);
//       alert(`Error-> ${error}`);
//     }
//     // setLoading(false);
//   };

//   handleSubmit = () => {
//     firebase
//       .auth()
//       .createUserWithEmailAndPassword('maninder.singh@vp.com', 'aiiia')
//       .then(user => {
//         if (user.user) {
//           user.user
//             .updateProfile({
//               displayName: 'maninder',
//             })
//             .then(() => {
//               alert('Item saved successfully');
//             });
//         }
//       })
//       .catch(error => this.setState({errorMessage: error.message}));
//   };
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     backgroundColor: 'black',
//   },
//   preview: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   capture: {
//     flex: 0,
//     backgroundColor: '#fff',
//     borderRadius: 5,
//     padding: 15,
//     paddingHorizontal: 20,
//     alignSelf: 'center',
//     margin: 20,
//   },
// });
// export default App;
// AppRegistry.registerComponent('App', () => ExampleApp);
