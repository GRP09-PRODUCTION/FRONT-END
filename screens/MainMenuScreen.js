import { useContext, useState, useEffect } from "react";
import { Pressable, StyleSheet, Text, View, ImageBackground, Alert } from "react-native";

import { Colors, BackgroundImage, Sizes } from "../constants/styles";

import { AuthContext } from "../store/auth-context";
import { signOut } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../constants/messages";
import Button from "../components/ui/Button";

function MainMenuScreen({ navigation }) {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  	const authCtx = useContext(AuthContext);

async function signOutHandler() {
  setIsSigningOut(true);
  try {
      const res = await signOut(authCtx);
      const successMessage = SUCCESS_MESSAGES[res.message] || res.message;
      setMessage(successMessage);
    } catch (error) {
      const errorMessage = ERROR_MESSAGES[error.data.message] || "Une erreur est survenue lors de la déconnexion. Veuillez réessayer plus tard!";
      setError(errorMessage);
    } finally {
      setIsSigningOut(false);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Welcome' }],
        });
	}
}

useEffect(() => {
    if (message) {
      Alert.alert(message);
      setMessage("");
    }
    if (error) {
      Alert.alert(error);
      setError(null);
    }
  }, [message, error]);

if(isSigningOut){
  return <LoadingOverlay message={"Déconnexion en cours..."}></LoadingOverlay>
}
	var userName = "";
	if (authCtx.user)
	{
		userName = (authCtx.user.username ?? " " + authCtx.user.username);
	}
	return (
		<View style={styles.rootContainer}>
			<ImageBackground source={BackgroundImage} resizeMode="cover" style={styles.generalContainer}>
				<View style={styles.menuContainer}>
					<Text style={styles.title}>Bonjour{userName} !</Text>
					<View
					style={[
						styles.buttonContainer
					]}
					>
						<Button
							children="Statistiques"
							left={true}
							onPress={() => navigation.replace("Stats")}
						></Button>
						<Button
							children= "Paramètres"
							left={false}
							onPress={() => navigation.replace("Settings")}
						></Button>
					</View>

					<Text style={styles.subTitle}>Nouvelle course</Text>
					<View
					style={[
						styles.buttonContainer
					]}
					>
						<Button
							children="Mode manuel"
							left={true}
							onPress={() => navigation.replace(userName === "" ? "Game" : "AuthGame")}
						></Button>
						<Button
							children="Mode automatique"
							left={false}
							onPress={() => navigation.replace(userName === "" ? "Game" : "AuthGame")}
						></Button>
					</View>
				
					<Pressable 
						style={[styles.linkButtons]}
						onPress={() => signOutHandler()}
					>
						<Text style={[styles.linkText]}>Se déconnecter</Text>
					</Pressable>
				</View>
			</ImageBackground>
		</View>
	);
}

export default MainMenuScreen;

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		height: Sizes.full,
	},
	generalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: Sizes.XXL,
		height: Sizes.full,
	},
	menuContainer: {
		backgroundColor: Colors.menuTransparentBlack,
		padding: Sizes.L,
		borderRadius: Sizes.S,
		justifyContent: "center",
		alignItems: "center",
	},
	title: {
		fontSize: Sizes.XL,
		fontWeight: "bold",
		marginBottom: Sizes.S,
		color: "white",
	},
	subTitle: {
		fontSize: Sizes.L,
		fontWeight: "bold",
		marginBottom: Sizes.S,
		color: "white",
	},
	buttonContainer: {
		marginTop: Sizes.L,
		marginBottom: Sizes.L,
		justifyContent: "space-between",
		flexDirection: "row",
		width: Sizes.full,
	},
	mainButtons: {
		borderRadius: Sizes.S,
		backgroundColor: "#B1B1B1",
		padding: Sizes.S,
	},
	linkButtons: {
		alignSelf: "flex-end",
	},
	linkText: {
		color: "#888888",
		textDecorationLine: "underline",
	}
});
