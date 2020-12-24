import React, { Component, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  YellowBox,
  TextInput,
  TouchableOpacity,ActivityIndicator
} from "react-native";


//import { FontAwesome5 } from "@expo/vector-icons";
import firebase from "firebase";
import _ from "lodash";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
//import Loader from "./loader";

class LoginScreen extends Component {
  constructor() {
    super();
  }

  state = {
    email: "",
    password: "",
    loading: false,
  };
//   handleLogin=()=>{
//       console.log("login pressed")
//       this.props.navigation.navigate("List")
//   }
  handleLogin = () => {
    this.setState({
      email: "",
      password: "",
      loading: true,
    });
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.replace("List"))
      .then(() => {
        alert("Login Success!");
        this.setState({
          loading: false,
        });
      })
      .catch(() => {
        this.setState({
          loading: false,
        });
        alert("Authentication Failed");
      });
  };


  handleFocus = () => this.setState({ isFocused: true });
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.Welcome}>
          <Text style={styles.texts}>Hello.</Text>
          <Text style={styles.texts}>Welcome Back</Text>
        </View>
        <View>
          <FontAwesome5 name="user-circle" size={50} color="#3498DB" />
        </View>
        <TextInput
          selectionColor={"#3498DB"}
          style={styles.inputBox}
          value={this.state.email}
          onChangeText={(email) => this.setState({ email })}
          placeholder="user@gmail.com"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.inputBox}
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          placeholder="Password"
          secureTextEntry={true}
        />
    
        <TouchableOpacity style={styles.buttonStyle} onPress={this.handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        {this.state.loading ? <ActivityIndicator loading={this.state.loading} /> : <></>}
        <TouchableOpacity
          onPress={() => this.props.navigation.replace("Signup")}
        >
          <Text style={{ fontWeight: "bold", fontSize: 16, color: "#3498DB" }}>
            Create Account
          </Text>
        </TouchableOpacity>
     
      </View>
    );
  }
}
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    //backgroundColor:"gray"
  },
  Welcome: {
    width: "90%",
    marginBottom: 30,
  },
  inputBox: {
    width: "85%",
    margin: 5,
    padding: 12,
    fontSize: 16,
    borderColor: "#3498DB",
    borderBottomWidth: 2,
    borderTopWidth: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    textAlign: "center",
  },
  buttonStyle: {
    marginTop: 20,
    marginBottom: 20,
    paddingVertical: 5,
    alignItems: "center",
    backgroundColor: "#3498DB",
    borderColor: "#3498DB",
    borderWidth: 1,
    borderRadius: 5,
    width: 200,
  },
  forgot: {
    width: "85%",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  forgotStyle: {
    alignItems: "flex-end",
  },
  texts: {
    fontSize: 35,
    color: "black",
    fontWeight: "bold",
  },
});
