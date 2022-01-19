import React, {PureComponent} from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import database from '@react-native-firebase/database';
import storage, {firebase} from '@react-native-firebase/storage';
import {parseString} from 'react-native-xml2js';
import BarcodeMask from 'react-native-barcode-mask';

class HomeScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      enableCamera: false,
      loading: false,
      isSelfieUploaded: false,
      mAadhaarData: '',
      isBarcodeRead: true,
      disableSelfie: false,
    };

    // this.onBarCodeRead = this.onBarCodeRead.bind(this);
  }

  componentWillUnmount() {
    database().ref(`AadharCard/`).remove();
  }
  /**handle register button */
  onPressRegister = () => {
    this.setState({enableCamera: true});
  };

  /**handle view profile button */
  onPressViewProfile = () => {
    // Alert.alert('on Press!');

    navigation('Profile');
  };

  takePicture = async () => {
    this.setState({loading: true, disableSelfie: true});
    // addItem();
    if (this.camera) {
      const options = {quality: 0.5, base64: true};
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);

      this.uploadImageToFirebase(data.uri);

      // this._uploadFile(data);
    }
  };

  uploadImageToFirebase = uploadUri => {
    storage()
      .ref('userImage')
      .putFile(uploadUri)
      .then(snapshot => {
        console.log('fefef', snapshot);
        this.setState({loading: false, isSelfieUploaded: true});
        ToastAndroid.show('Selfie Uploaded Successfully', ToastAndroid.SHORT);
      })
      .catch(e => console.log('uploading image error => ', e));
  };

  renderLoading = () => {
    if (this.state.loading) {
      return (
        <ActivityIndicator size="large" color="black" style={styles.loading} />
      );
    } else {
      return null;
    }
  };

  updateCardData = xml => {
    this.setState({loading: true});

    try {
      var data;
      parseString(xml, function (err, result) {
        data = result.PrintLetterBarcodeData.$;
      });

      /**Upload data to firebase */
      database()
        .ref('AadharCard/')
        .set({
          userDetail: data,
        })
        .then(data => {
          //success callback

          ToastAndroid.show(
            'Aadhar Details Uploaded Successfully',
            ToastAndroid.SHORT,
          );
          this.setState({
            loading: false,
            enableCamera: false,
            isSelfieUploaded: false,
            isBarcodeRead: true,
            disableSelfie: false,
          });
        })
        .catch(error => {
          //error callback
          console.log('error ', error);
        });
    } catch (error) {
      console.log('error', error);

      alert(error);
    }
  };

  // onBarCodeRead = event => {
  //   if (this.state.isBarcodeRead) {
  //     // code //

  //     console.log('print data', event.data);
  //     //   alert(event.data);
  //     this.setState({
  //       isBarcodeRead: false,
  //     });

  //     var xml = event.data;
  //     var data;
  //     parseString(xml, function (err, result) {
  //       console.dir(result.PrintLetterBarcodeData.$);
  //       data = result.PrintLetterBarcodeData.$;
  //     });
  //     this.updateCardData(data);
  //   }
  //   // if (this.state.alertPresent) {
  //   //   this.setState({showAlert: false});
  //   //   Alert.alert(
  //   //     'Barcode type is ' + e.type,
  //   //     'Barcode value is ' + e.data,
  //   //     [{text: 'OK', onPress: () => console.log('ok')}],
  //   //     {cancelable: false},
  //   //   );
  //   // }
  // };

  barcodeRecognized = ({barcodes}) => {
    // barcodes.forEach(barcode => console.warn(barcode.data));
    if (
      this.state.isSelfieUploaded &&
      barcodes.length > 0 &&
      this.state.isBarcodeRead
    ) {
      this.setState({
        isBarcodeRead: false,
      });
      var xml = barcodes[0].data;
      Alert.alert('Success', JSON.stringify(xml), [
        {
          text: 'Cancel',
          onPress: () => {
            this.setState({
              isBarcodeRead: true,
            });

            console.log('Cancel Pressed');
          },
          style: 'cancel',
        },
        {text: 'Upload', onPress: () => this.updateCardData(xml)},
      ]);
    }
  };

  showCamera = () => {
    return (
      <View style={styles.cameraStyle}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={
            this.state.isSelfieUploaded
              ? RNCamera.Constants.Type.back
              : RNCamera.Constants.Type.front
          }
          flashMode={RNCamera.Constants.FlashMode.off}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onGoogleVisionBarcodesDetected={this.barcodeRecognized}
          googleVisionBarcodeType={
            RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeType.QR_CODE
          }

          // onBarCodeRead={this.onBarCodeRead.bind(this)}
          //   onGoogleVisionBarcodesDetected={({barcodes}) => {
          //     if (barcodes.length > 0) {
          //       var xml = barcodes[0].data;
          //       var data;
          //       parseString(xml, function (err, result) {
          //         console.dir(result.PrintLetterBarcodeData.$);
          //         data = result.PrintLetterBarcodeData.$;
          //       });
          //       this.updateCardData(data);
          //     }
          //   }}
        />
        {this.state.isSelfieUploaded && <BarcodeMask />}
        {this.state.isSelfieUploaded ? (
          <View style={styles.cameraButtonStyle}>
            <TouchableOpacity style={styles.capture}>
              <Text style={{fontSize: 14}}> SCAN AADHAR </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.cameraButtonStyle}>
            <TouchableOpacity
              onPress={this.takePicture.bind(this)}
              disabled={this.state.disableSelfie}
              style={styles.capture}>
              <Text style={{fontSize: 14}}> SELFIE </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        {!this.state.enableCamera && (
          <View style={styles.buttonViewStyle}>
            <TouchableOpacity
              onPress={this.onPressRegister}
              style={styles.appButtonContainer}>
              <Text style={styles.appButtonText}>Register</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Profile');
              }}
              style={styles.appButtonContainer}>
              <Text style={styles.appButtonText}>View Profile</Text>
            </TouchableOpacity>
          </View>
        )}

        {this.state.enableCamera && this.showCamera()}

        {this.renderLoading()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
  },
  appButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraStyle: {flex: 1, flexDirection: 'column', backgroundColor: 'black'},
  cameraButtonStyle: {flex: 0, flexDirection: 'row', justifyContent: 'center'},
  buttonViewStyle: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
export default HomeScreen;
