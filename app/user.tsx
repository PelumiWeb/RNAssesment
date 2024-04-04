import axios from "axios";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TextInput,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  FlatList,
} from "react-native";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = React.useState("");
  const [show, setShow] = useState(false);
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => console.log(error));
      setLoading(false);
    };
    fetchData();
  }, []);

  const filteredData = React.useCallback(() => {
    return data.map((data) => ({
      name: data?.name,
      company: data?.company?.name,
      status: Math.random() < 0.5,
    }));
  }, [data]);

  const getFirstLetterOfFirstName = (data: any) => {
    const firstSplit = data?.split(" ");
    const SecondSplit = firstSplit[0]?.split("");
    return SecondSplit[0];
  };

  const getFirstLetterOfLastName = (data: any) => {
    const firstSplit = data?.split(" ");
    const SecondSplit = firstSplit[1].split("");
    return SecondSplit[0];
  };

  const UserComponent = ({ data }) => {
    const firstNameletter = getFirstLetterOfFirstName(data?.name);
    const secondNameletter = getFirstLetterOfLastName(data?.name);

    return (
      <View style={styles.userComponentWrapper}>
        {/* Left */}
        <View style={styles.userComponentLeft}>
          {/* Icon */}
          <View style={styles.icon}>
            <Text style={styles.iconText}>
              {`${firstNameletter} ${secondNameletter}`}
            </Text>
          </View>
          {/* Text */}
          <View>
            <Text style={styles.name1}>{data?.name}</Text>
            <Text style={styles.name2}>{data?.company}</Text>
          </View>
        </View>
        {/* Right */}
        <TouchableOpacity
          style={[
            styles.status,
            { backgroundColor: data?.status ? "#E1EAD6" : "#EFF2F7" },
          ]}>
          <Text style={[styles.statusText]}>
            {data?.status ? "Active" : "Pending"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Link href={"/"}>
        <Text style={{ color: "red" }}>Go back</Text>
      </Link>
      <Text style={styles.hearderText}>USERS</Text>

      <SafeAreaView style={styles.container}>
        {loading ? (
          <Text>Loading</Text>
        ) : (
          <FlatList
            data={filteredData()}
            renderItem={({ item }) => <UserComponent data={item} />}
            keyExtractor={(item) => item.name}
            showsVerticalScrollIndicator={false}
          />
        )}
      </SafeAreaView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: 'center',
    paddingTop: hp(5),
    // padding: 10,
    // paddingHorizontal: 50,
  },
  userComponentWrapper: {
    width: wp(90),
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#EFF2F7",
    padding: 10,
    marginBottom: 5,
  },
  hearderText: {
    //     Font
    // Satoshi
    fontWeight: "700",
    fontSize: 24,
    lineHeight: 32,
    // textAlign: "left",
    fontFamily: "Satoshi-medium",

    width: "100%",
    marginBottom: 10,
    marginLeft: 50,
  },
  userComponentLeft: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  icon: {
    width: wp(15),
    height: hp(5),
    borderRadius: 10,
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    marginRight: 10,
  },
  iconText: {
    textAlign: "center",
  },
  status: {
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderColor: "#FFFFFF",
    borderWidth: 1,
    width: 75,
  },
  statusText: {
    fontFamily: "Satoshi-medium",
  },
  name1: {
    color: "#08080C",
    fontWeight: "500",
    fontSize: 12,
    lineHeight: 16,
    fontFamily: "Satoshi-medium",
  },
  name2: {
    fontWeight: "400",
    fontSize: 11,
    lineHeight: 14,
    fontFamily: "Satoshi",
  },
});
