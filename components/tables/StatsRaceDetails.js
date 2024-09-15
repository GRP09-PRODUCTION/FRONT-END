import { StyleSheet, Text, View } from "react-native";
import { Colors, Sizes } from "../../constants/styles";


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

function StatsRaceDetails({ data }) {
	
	return (
		<View style={styles.tableContainer}>{ /* Table container */}
			<View style={styles.row}>{ /* One row */}
				<View style={[styles.cell, styles.titleCell]}>{ /* One cell within the row */}
					<Text style={styles.cellText}>Date de début</Text>
				</View>
				<View style={[styles.cell, styles.titleCell]}>
					<Text style={styles.cellText}>Date de fin</Text>
				</View>
				<View style={[styles.cell, styles.titleCell]}>
					<Text style={styles.cellText}>Durée</Text>
				</View>
				<View style={[styles.cell, styles.titleCell]}>
					<Text style={styles.cellText}>Vitesse max</Text>
				</View>
				<View style={[styles.cell, styles.titleCell]}>
					<Text style={styles.cellText}>Vitesse min</Text>
				</View>
				<View style={[styles.cell, styles.titleCell]}>
					<Text style={styles.cellText}>Vitesse moyenne</Text>
				</View>
				<View style={[styles.cell, styles.titleCell]}>
					<Text style={styles.cellText}>Mode</Text>
				</View>
			</View>

			<View style={styles.row}>{ /* One row */}
				<View style={[styles.cell, styles.valueCell]}>{ /* One cell within the row */}
					<Text style={styles.cellText}>{new Date(data.start_at).toLocaleString()}</Text>
				</View>
				<View style={[styles.cell, styles.valueCell]}>
					<Text style={styles.cellText}>{new Date(data.end_at).toLocaleString()}</Text>
				</View>
				<View style={[styles.cell, styles.valueCell]}>
					<Text style={styles.cellText}>{data.duration}</Text>
				</View>
				<View style={[styles.cell, styles.valueCell]}>
					<Text style={styles.cellText}>{data.v_max}</Text>
				</View>
				<View style={[styles.cell, styles.valueCell]}>
					<Text style={styles.cellText}>{data.v_min}</Text>
				</View>
				<View style={[styles.cell, styles.valueCell]}>
					<Text style={styles.cellText}>{data.v_moyen}</Text>
				</View>
				<View style={[styles.cell, styles.valueCell]}>
					<Text style={styles.cellText}>{data.mode}</Text>
				</View>
			</View>

		</View>
	);
}

export default StatsRaceDetails;

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