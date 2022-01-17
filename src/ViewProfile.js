import React, {PureComponent} from 'react';
import {
  ActivityIndicator,
  Alert,
  Text,
  ToastAndroid,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import database from '@react-native-firebase/database';
import storage, {firebase} from '@react-native-firebase/storage';
import {parseString} from 'react-native-xml2js';

class ViewProfile extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      enableCamera: false,
      loading: false,
      isSelfieUploaded: false,
      mAadhaarData: '',
      profileUrl:
        'https://www.propertytwinsswfl.com/wp-content/uploads/2018/09/dummy-profile-pic-male.jpg',
      userData: '',
    };
  }

  componentDidMount() {
    this.getProfileData();
    this.getStorageImage();
  }

  getStorageImage() {
    let imageRef = storage().ref('/' + 'userImage');
    imageRef
      .getDownloadURL()
      .then(url => {
        this.setState({profileUrl: url});
      })
      .catch(e => console.log('getting downloadURL of image error => ', e));
  }
  getProfileData() {
    database()
      .ref(`AadharCard/`)
      .on('value', snapshot => {
        this.setState({userData: snapshot.val()});
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}></View>
        <Image style={styles.avatar} source={{uri: this.state.profileUrl}} />

        <View style={styles.body}>
          {/* <View style={styles.bodyContent}> */}
          <Text style={styles.name}>
            {this.state.userData &&
              this.state.userData.userDetail &&
              this.state.userData.userDetail.name}
          </Text>

          <View>
            <Text style={styles.info}>
              {this.state.userData &&
                this.state.userData.userDetail &&
                this.state.userData.userDetail.co}
            </Text>

            <Text style={styles.description}>
              Gender :{' '}
              {this.state.userData &&
                this.state.userData.userDetail &&
                this.state.userData.userDetail.gender}
            </Text>
            <Text style={styles.description}>
              {this.state.userData &&
                this.state.userData.userDetail &&
                this.state.userData.userDetail.street}
            </Text>

            <Text style={styles.description}>
              {this.state.userData &&
                this.state.userData.userDetail &&
                this.state.userData.userDetail.loc}
            </Text>
            <Text style={styles.description}>
              {this.state.userData &&
                this.state.userData.userDetail &&
                this.state.userData.userDetail.dist}
              /
              {this.state.userData &&
                this.state.userData.userDetail &&
                this.state.userData.userDetail.state}
            </Text>
          </View>
          {/* </View> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#009688',
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130,
  },
  name: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  body: {
    marginTop: 60,
    flexDirection: 'column',
    alignItems: 'center',
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: '#696969',
    fontWeight: '600',
  },
  info: {
    fontSize: 16,
    color: '#009688',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: '#696969',

    textAlign: 'left',
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#00BFFF',
  },
});

export default ViewProfile;
