import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ImageBackground,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import firebase from 'firebase';
import { Header, Icon, Badge } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      mobileNumber: '',
      userId: '',
      image: '',
    };
  }

  render() {
    return (
      <SafeAreaProvider
        style={{ flex: 1, flexDirection: 'column', backgroundColor: 'black' }}>
        <Header
          backgroundColor="black"
          leftComponent={
            <Icon
              name="arrow-back"
              color="white"
              onPress={() => this.props.navigation.navigate('HomeScreen')}
            />
          }
          rightComponent={
            <Icon
              name="logout"
              color="white"
              onPress={() => {
                firebase
                  .auth()
                  .signOut()
                  .then(() => {
                    this.props.navigation.navigate('MainScreen');
                  })
                  .catch((error) => {});
              }}
            />
          }
          centerComponent={{ text: 'Settings', style: { color: 'white' } }}
        />

        <View
          style={{ marginTop: -5, flex: 1, justifyContent: 'space-evenly' }}>
          <LinearGradient
            // Button Linear Gradient
            colors={['#5d34a5', '#482980', '#000']}
            start={{ x: -1, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ flex: 0.2, padding: 10, justifyContent: 'center' }}>
            <View
              style={{
                paddingLeft: 5,
                marginTop: 10,
                flexDirection: 'row',
                alignItems:"center",
                justifyContent:"center"
              }}>
              <Image
                style={{
                  width: 70,
                  height: 70,
                  marginLeft: 20,
                  borderColor: 'black',
                  padding: 5,
                  borderWidth: 2,
                  borderRadius: 40,
                  flex:0.2
                }}
                source={{
                  uri: this.state.image,
                }}
              />

              <View
                style={{
                  alignItems: 'flex-start',
                  marginLeft:10,
                  flex:0.8
                }}>
                <Text
                  style={{ fontSize: 17, fontWeight: 'bold', color: 'white' }}>
                  {this.state.firstName + ' ' + this.state.lastName}
                </Text>

                <Text style={{marginTop:5, color: 'white' }}> {this.state.userId}</Text>
              </View>
            </View>
          </LinearGradient>

          <View
            style={{
              flex: 0.7,
              padding: 10,
              justifyContent: 'space-around',
              alignItems:"center"
            }}>
            <TouchableOpacity
              style={{
                width: '70%',
                borderRadius: 10,
                borderWidth: 2,
                borderColor: 'white',
                padding: 15,
              }}
              onPress={() => {
                this.props.navigation.navigate('EditScreen');
              }}>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                }}>
                EDIT PROFILE
              </Text>
            </TouchableOpacity>
            <LinearGradient
              colors={['#5d34a5', '#482980']}
              start={{ x: -1, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.button]}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('AboutScreen');
                }}>
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                  }}>
                  ABOUT US
                </Text>
              </TouchableOpacity>
            </LinearGradient>

            <TouchableOpacity
              style={{
                width: '70%',
                borderRadius: 10,
                borderWidth: 2,
                borderColor: 'white',
                padding: 15,
              }}
              onPress={() => {
                this.props.navigation.navigate('FeedbackScreen');
              }}>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                
                }}>
                FEEDBACK & QUERIES
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 0.1 }}></View>
        </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: '70%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    alignSelf: 'center',
  },
});
