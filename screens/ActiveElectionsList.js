import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  FlatList,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import db from "../config";
import firebase from "firebase";
import {
  Feather,
  Fontisto,
  EvilIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
export default class ActiveElectionsList extends React.Component {
  constructor() {
    super();
    this.state = {
      activeElections: [],
      secretCode: "",

      emailId: firebase.auth().currentUser.email,
    };
  }
  getRecords = async () => {
    await db
      .collection("elections")
      .where("secretCode", "==", this.state.secretCode)
      .where("isActive", "==", true)
      .onSnapshot((snapshot) => {
        var elections = [];
        snapshot.docs.map((doc) => {
          console.log(doc.data());
          var election = doc.data();
          election["docId"] = doc.id;
          //
          console.log(doc.data().voters + this.state.emailId);
          if (doc.data().voters.includes(this.state.emailId)) {
            election["allowVote"] = false;
          } else {
            election["allowVote"] = true;
          }
          elections.push(election);
        });

        this.setState({ activeElections: elections });
      });
  };

  render() {
    if (this.state.activeElections.length !== 0) {
      return (
        <View style={styles.container}>
          <View style={styles.heading}>
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Active Elections
            </Text>
            <Text style={{ color: "white", textAlign: "center" }}>
              Start Voting
            </Text>
          </View>

          <FlatList
            data={this.state.activeElections}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  item.allowVote
                    ? this.props.navigation.navigate("ActiveElectionDet", {
                        details: item,
                      })
                    : alert("You have registered your vote for this election");
                }}
                style={{
                  height: 100,
                  borderWidth: 1,
                  borderRadius: 10,
                  margin: 10,
                  alignItems: "center",
                  overflow: "hidden",
                }}
              >
                <LinearGradient
                  // Button Linear Gradient
                  colors={["#8CACE5", "#9ADAE9"]}
                  start={{ x: -1, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    flex: 1,
                    width: "100%",
                    padding: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <View style={{ flexDirection: "row" }}>
                      <Fontisto name="person" size={22} color="white" />
                      <Text
                        style={{
                          color: "#fff",
                          fontWeight: "bold",
                          fontSize: 20,
                          marginLeft: 20,
                        }}
                      >
                        {item.postTitle}
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: 10,
                        alignItems: "center",
                      }}
                    >
                      <Fontisto name="date" size={16} color="white" />
                      <Text
                        style={{ color: "#fff", fontSize: 16, marginLeft: 20 }}
                      >
                        {item.lastDate}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ color: "#fff", fontSize: 16 }}>
                      Total Votes
                    </Text>
                    <ImageBackground
                      source={require("../votebg.jpg")}
                      style={{
                        borderRadius: 20,
                        width: 40,
                        height: 40,
                        backgroundColor: "white",
                        alignItems: "center",
                        overflow: "hidden",
                        justifyContent: "center",
                      }}
                      resizeMode="cover"
                    >
                      <Text style={{ color: "#000" }}>{item.totalVotes}</Text>
                    </ImageBackground>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      );
    } else {
      return (
        <LinearGradient
          // Button Linear Gradient
          colors={["#8CACE5", "#9ADAE9"]}
          start={{ x: -1, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            flex: 1,
            width: "100%",
            padding: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "black", marginBottom: 15 }}>
            Ask the organization for their secret code and enter it below to get
            started{" "}
          </Text>

          <TextInput
            onChangeText={(e) => {
              this.setState({ secretCode: e });
            }}
            value={this.state.secretCode}
            placeholder="Secret Code"
            style={{
              width: "85%",
              borderRadius: 10,
              borderWidth: 2,
              borderColor: "#000000aa",
              padding: 10,
            }}
          />
          <TouchableOpacity
            style={{
              backgroundColor: "#7864D0",
              width: "70%",
              height: 40,
              marginTop: 10,
              borderRadius: 10,
              alignSelf: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              this.getRecords();
            }}
          >
            <Text style={{ color: "white" }}>Submit</Text>
          </TouchableOpacity>
        </LinearGradient>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    justifyContent: "center",
    alignItems: "center",
    height: 150,
    padding: 10,
    backgroundColor: "#8CACE5",
  },
});
