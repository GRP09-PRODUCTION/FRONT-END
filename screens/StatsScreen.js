import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, ImageBackground, SafeAreaView, ScrollView } from "react-native";

import IconButton from "../components/ui/IconButton";
import { AuthContext } from "../store/authContext";
import StatsTable from "../components/tables/StatsTable";
import StatsRaceDetails from "../components/tables/StatsRaceDetails";
import { Colors, Sizes, FullMenuStyles } from "../constants/styles";
import { getRaceList, getRace } from "../util/auth";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../constants/messages";

function StatsScreen({ navigation }) {
	const [isGettingRaceList, setIsGettingRaceList] = useState(false);
	const [message, setMessage] = useState("");
	const [error, setError] = useState(null);
	const [racesList, setRacesList] = useState([]);
	const [selectedRaceData, setSelectedRaceData] = useState([]);


	async function raceListHandler() {
		//setIsAuthenticating(true);
		try {
		  const data = await getRaceList();
		  setRacesList(data.payload.races);
		  
		  const successMessage =
			SUCCESS_MESSAGES[data.message] || "List récupérée avec succès !";
		  setMessage(successMessage);
		} catch (error) {
		  let errorMessage;
	
		  if (error?.data?.message) {
			errorMessage = ERROR_MESSAGES[error.data.message] || "Impossible de récupérer la liste, veuillez réessayer plus tard !";
		  } else {
			errorMessage =
			  "Impossible de récupérer la liste, veuillez réessayer plus tard !";
		  }
		  setError(errorMessage);
		} 
	  }

	  async function selectedRaceHandler(raceId) {
		//setIsAuthenticating(true);
		try {
			console.log("ok");
			console.log(raceId);
			
			
		  const data = await getRace(raceId);
		  console.log(data);

		  setSelectedRaceData(data.payload.race);
		  console.log(data);
		  
		  
		  const successMessage =
			SUCCESS_MESSAGES[data.message] || "Cours récupérée avec succès !";
		  setMessage(successMessage);
		} catch (error) {
		  let errorMessage;
	
		  if (error?.data?.message) {
			errorMessage = ERROR_MESSAGES[error.data.message] || "Impossible de récupérer la cours, veuillez réessayer plus tard !";
		  } else {
			errorMessage =
			  "Impossible de récupérer la cours, veuillez réessayer plus tard !";
		  }
		  setError(errorMessage);
		} 
	  }

	useEffect(() => {
		raceListHandler();
	}, []);

  	const authCtx = useContext(AuthContext);
	// fake data we will need to get in some other way
	const fakeManualRaceNumber = racesList.length;
	const fakeAutoRaceNumber = new Date(selectedRaceData.start_at).toDateString();

	// end of fake data

	return (
		
		 <View style={FullMenuStyles.rootContainer}>
		 	<ImageBackground source={require("../assets/image_fond_menu.jpg")} resizeMode="cover" style={FullMenuStyles.backgroundImage}>
		 		<SafeAreaView style={FullMenuStyles.generalContainer}>
		 			<ScrollView>
		 				<View style={FullMenuStyles.menuContainer}>
		 					<View style={styles.iconContainer}>
		 						<IconButton
		 							icon={"arrow-back"}
		 							color={Colors.primary300}
		 							size={32}
		 							onPress={() => authCtx.isAuthenticated ? navigation.replace("AuthMainMenu") : navigation.replace("MainMenu")}
		 							library={"Ionicons"}
		 						/>
		 					</View>
		 					<Text style={[FullMenuStyles.title]}>Statistiques</Text>
		 					<Text style={[FullMenuStyles.subTitle, styles.subTitle]}>Liste des courses</Text>
		 					<Text style={styles.text}>{fakeManualRaceNumber} courses effectuées</Text>
		 					<StatsTable
		 						data={racesList}
								 selectedRaceHandler={selectedRaceHandler}
		 					/>
		 					<Text style={[FullMenuStyles.subTitle, styles.subTitle]}>Détail de la course</Text>
		 					<Text style={styles.text}>Courses effectuée le {fakeAutoRaceNumber}</Text>
		 					<StatsRaceDetails
		 						data={selectedRaceData}
		 					/>
		 				</View>
		 			</ScrollView>
		 		</SafeAreaView>
		 	</ImageBackground>
		 </View>
	);
}

export default StatsScreen;

const styles = StyleSheet.create({
	iconContainer:{
		flexDirection: "row",
		justifyContent: "flex-start",
		width: Sizes.full,
	},
	subTitle:{
		marginTop: Sizes.M,
	},
	text:{
		marginBottom: Sizes.M,
		color: "white",
	}
});
