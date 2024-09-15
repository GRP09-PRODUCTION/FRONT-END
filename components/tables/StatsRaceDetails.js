import { StyleSheet, Text, View } from "react-native";
import { Colors, Sizes } from "../../constants/styles";


function divisionEuclidienne(divided, divider) {
	var quotient = 0;
	var rest;
	while (divided >= divider) {
		quotient += 1;
		divided -= divider;
	}
	rest = divided;
	return { minutes: quotient, seconds: rest };
}

function StatsRaceDetails({ data }) {

	return (
		<View style={styles.tableContainer}>{ /* Table container */}
			<View style={styles.row}>{ /* One row */}
				<View style={[styles.cell, styles.titleCell]}>{ /* One cell within the row */}
					<Text style={styles.cellText}>Date de début</Text>
				</View>
				<View style={[styles.cell, styles.valueCell]}>{ /* One cell within the row */}
					<Text style={styles.cellText}>{data.start_at ? new Date(data.start_at).toLocaleString() : "Aucune donée"}</Text>
				</View>
			</View>

			<View style={styles.row}>{ /* One row */}
				<View style={[styles.cell, styles.titleCell]}>
					<Text style={styles.cellText}>Date de fin</Text>
				</View>
				<View style={[styles.cell, styles.valueCell]}>
					<Text style={styles.cellText}>{data.end_at ? new Date(data.end_at).toLocaleString() : "Aucune donnée"}</Text>
				</View>
			</View>

			<View style={styles.row}>{ /* One row */}
				<View style={[styles.cell, styles.titleCell]}>
					<Text style={styles.cellText}>Durée</Text>
				</View>
				<View style={[styles.cell, styles.valueCell]}>
					<Text style={styles.cellText}>{data.duration || "0"}</Text>
				</View>
			</View>

			<View style={styles.row}>{ /* One row */}
				<View style={[styles.cell, styles.titleCell]}>
					<Text style={styles.cellText}>Vitesse max</Text>
				</View>
				<View style={[styles.cell, styles.valueCell]}>
					<Text style={styles.cellText}>{data.v_max || "0"} m/s</Text>
				</View>
			</View>

			<View style={styles.row}>{ /* One row */}
				<View style={[styles.cell, styles.titleCell]}>
					<Text style={styles.cellText}>Vitesse min</Text>
				</View>
				<View style={[styles.cell, styles.valueCell]}>
					<Text style={styles.cellText}>{data.v_min || "0"} m/s</Text>
				</View>
			</View>

			<View style={styles.row}>{ /* One row */}
				<View style={[styles.cell, styles.titleCell]}>
					<Text style={styles.cellText}>Vitesse moyenne</Text>
				</View>
				<View style={[styles.cell, styles.valueCell]}>
					<Text style={styles.cellText}>{data.v_moyen || "0"} m/s</Text>
				</View>
			</View>

			<View style={styles.row}>{ /* One row */}
				<View style={[styles.cell, styles.titleCell]}>
					<Text style={styles.cellText}>Mode</Text>
				</View>
				<View style={[styles.cell, styles.valueCell]}>
					<Text style={styles.cellText}>{data.mode || "Aucun"}</Text>
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