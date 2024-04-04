import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
// import { TouchableOpacity } from "react-native-gesture-handler";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TextInput,
  Button,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";

// import Logo from "../assets/Group 427319746.png";
const EmailIcon = require("../assets/EmailIcon.png");
const PasswordIcon = require("../assets/PasswordIcon.png");
const Logo = require("../assets/Group 427319746.png");
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

// import Login from './screen/login'
// import { Link } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { FloatingLabelInput } from "react-native-floating-label-input";
import { Link, router, SplashScreen } from "expo-router";
import { useFonts } from "expo-font";

type Error =
  | {
      email: string | null;
      password: string | null;
    }
  | any;

export default function App() {
  const [submittedData, setSubmittedData] = React.useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const [fontsLoaded, fontError] = useFonts({
    Satoshi: require("../assets/fonts/Satoshi-Regular.otf"),
    "Satoshi-bold": require("../assets/fonts/Satoshi-Bold.otf"),
    "Satoshi-medium": require("../assets/fonts/Satoshi-Medium.otf"),
  });

  const handleSubmit = () => {
    if (isFormValid) {
      // Form is valid, perform the submission logic
      console.log("Form submitted successfully!");
      router.navigate("/user");
    } else {
      // Form is invalid, display error messages
      console.log("Form has errors. Please correct them.");
    }
  };

  useEffect(() => {
    validateForm();
  }, [email, password]);

  const validateForm = () => {
    let errors: Error = {};

    if (!email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid.";
    }

    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }

    setErrors(errors);
    console.log(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const [show, setShow] = useState(false);
  const onLayoutRootView = React.useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      onLayout={onLayoutRootView}>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <Image style={[styles.image]} source={Logo} />
        <Text
          style={{
            color: "#322B8C",
            fontSize: 32,
            fontWeight: "700",
            lineHeight: 42,
            marginVertical: 10,
            fontFamily: "Satoshi-bold",
          }}>
          Welcome!
        </Text>
        <Text
          style={{
            color: "#6E717C",
            fontSize: 16,
            // lineHeight: 28,
            textAlign: "center",
            fontFamily: "Satoshi",
          }}>
          Sign up or log in to your account to manage access to your users
          smartly.
        </Text>
        {/* Form */}
        <View style={styles.formContainer}>
          <View
            style={{
              paddingHorizontal: 10,
              paddingVertical: 10,
              backgroundColor: "#EFF2F7",
              width: 350,
              marginHorizontal: 20,
              borderRadius: 10,
              marginBottom: 20,
            }}>
            <FloatingLabelInput
              style={{
                height: 200,
              }}
              label={"Email Address"}
              value={email}
              containerStyles={{
                borderColor: "#EFF2F7",
                borderWidth: 1,
              }}
              hintTextColor="#EFF2F7"
              onChangeText={(value) => setEmail(value)}
              labelStyles={{
                backgroundColor: "#EFF2F7",
                paddingHorizontal: 5,
                fontFamily: "Satoshi",
              }}
              customLabelStyles={{
                colorFocused: "#6E717C",
                fontSizeFocused: 12,
              }}
              inputStyles={{
                color: "#25292D",
                paddingTop: 20,
                paddingLeft: 5,
                fontFamily: "Satoshi-medium",
              }}
              leftComponent={
                <Image
                  style={{ width: 20, height: 20, marginRight: 10 }}
                  source={EmailIcon}
                />
              }
            />
          </View>

          <View
            style={{
              paddingHorizontal: 10,
              paddingVertical: 10,
              backgroundColor: "#EFF2F7",
              width: 350,
              marginHorizontal: 20,
              borderRadius: 10,
            }}>
            <FloatingLabelInput
              label={"Password"}
              isPassword
              containerStyles={{
                borderColor: "transparent",
                borderWidth: 1,
              }}
              togglePassword={show}
              value={password}
              onChangeText={(value) => setPassword(value)}
              hintTextColor="#EFF2F7"
              labelStyles={{
                backgroundColor: "#EFF2F7",
                paddingHorizontal: 5,
                fontFamily: "Satoshi",
              }}
              customLabelStyles={{
                colorFocused: "#6E717C",
                fontSizeFocused: 12,
              }}
              inputStyles={{
                color: "#25292D",
                paddingTop: 20,
                paddingLeft: 5,
                fontFamily: "Satoshi-medium",
              }}
              leftComponent={
                <Image
                  style={{ width: 20, height: 20, marginRight: 10 }}
                  source={PasswordIcon}
                />
              }
              // rightComponent={<Text>Forgot?</Text>}
            />
          </View>

          {Object.values(errors).map((error: Error, index) => (
            <Text key={index} style={styles.errorText}>
              {error}
            </Text>
          ))}

          <TouchableOpacity
            style={[styles.button, { opacity: isFormValid ? 1 : 0.5 }]}
            disabled={!isFormValid}
            onPress={handleSubmit}>
            <View>
              <Text style={styles.buttonText}>Login</Text>
            </View>
          </TouchableOpacity>
          {/* <View><Button title="Button"></View> */}

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 10,
            }}>
            <Text
              style={{
                color: "#FF8600",
                textAlign: "center",
                fontSize: 14,
                fontWeight: "400",
                marginRight: 2,
                fontFamily: "Satoshi",
              }}>
              Sign up
            </Text>
            <Text
              style={{
                fontFamily: "Satoshi",
              }}>
              Instead
            </Text>
          </View>
        </View>

        <StatusBar style="auto" />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: 'center',
    paddingTop: hp(10),
    padding: 10,
    paddingHorizontal: 50,
  },
  image: {
    height: hp(4),
    width: wp(60),
    marginBottom: hp(5),
  },
  formContainer: {
    padding: wp(5),
  },
  input: {
    height: hp(50),
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: hp(10),
    padding: 8,
    borderRadius: 10,
    width: wp(300),
  },
  errorText: {
    color: "red",
    // marginTop: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontFamily: "Satoshi",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    marginTop: 20,
    paddingHorizontal: 32,
    marginHorizontal: 30,
    borderRadius: 10,
    elevation: 9,
    backgroundColor: "#FF8600",
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
