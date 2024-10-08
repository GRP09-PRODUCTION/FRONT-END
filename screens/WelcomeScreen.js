import { View, StyleSheet } from "react-native";

import { Colors } from "../constants/styles";
import Button from "../components/ui/Button";
import SwitchLink from "../components/ui/SwitchLink";

function WelcomeScreen({ navigation }) {
  function switchAuthModeHandler() {
    navigation.navigate("Login");
  }

  return (
    <View style={styles.rootContainer}>
      <View style={styles.contentStyle}>
        <Button
          text={styles.buttonText}
          size={styles.buttonSize}
          onPress={() => navigation.replace("MainMenu")}
        >
          Invité
        </Button>
        <SwitchLink
          question={"Vous avez un compte ? "}
          link={"Connectez-vous"}
          onPress={switchAuthModeHandler}
        ></SwitchLink>
      </View>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.primary800,
  },
  buttonSize: {
    width: 150,
    paddingVertical: 12,
    marginBottom: 20,
  },
  contentStyle: {
    alignItems: "center",
    marginTop: 160,
  },
  buttonText: {
    fontSize: 22,
  },
});
