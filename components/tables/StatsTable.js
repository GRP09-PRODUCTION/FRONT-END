import { StyleSheet, Text, View } from "react-native";
import { Colors, Sizes } from "../../constants/styles";
import { FlatList } from "react-native-web";


function divisionEuclidienne(divided, divider)
{
	var quotient = 0;
	var rest;
	while (divided >= divider)
	{
		quotient += 1;
		divided -= divider;
	}
	rest = divided;
	return {minutes: quotient, seconds: rest};
}

function StatsTable({ data, selectedRaceHandler }) {

	const renderItem = ({ item }) => (
		<View style={styles.row}>
				<View style={[styles.cell, styles.valueCell]}>
					<Text onPress={() => {selectedRaceHandler(item._id)}} style={styles.cellText}>{new Date(item.start_at).toLocaleDateString()}</Text>
					
				</View>
				<View style={[styles.cell, styles.valueCell]}>
					<Text style={styles.cellText}>{new Date(item.start_at).toLocaleTimeString()}</Text>
				</View>
				<View style={[styles.cell, styles.valueCell]}>
					<Text style={styles.cellText}>{item.duration} s</Text>
				</View>
			</View>
	  );
	
	return (
		<View style={styles.tableContainer}>{ /* Table container */}
			<View style={styles.row}>{ /* One row */}
				<View style={[styles.cell, styles.titleCell]}>{ /* One cell within the row */}
					<Text style={styles.cellText}>Date</Text>
				</View>
				<View style={[styles.cell, styles.titleCell]}>
					<Text style={styles.cellText}>Heure</Text>
				</View>
				<View style={[styles.cell, styles.titleCell]}>
					<Text style={styles.cellText}>Durée</Text>
				</View>
			</View>

			<FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
    />
		</View>
	);
}

export default StatsTable;

const styles = StyleSheet.create({
	tableContainer: {
		justifyContent: "center",
		alignItems: "center",
	},
	row: { 
		flexDirection: 'row' 
	},
	cell: { 
		padding: Sizes.XS,
		width: '33.3%',
	},
	voidCell: { 
		opacity: 0,
	},
	titleCell: { 
		opacity: 1,
		backgroundColor: Colors.primary800,
		borderStyle: 'solid',
		borderWidth: 1,
		borderColor: Colors.primary800,
	},
	valueCell: { 
		opacity: 1,
		borderStyle: 'solid',
		borderWidth: 1,
		borderColor: Colors.primary800,
	},
	cellText: {
		color: "white",
	}
});