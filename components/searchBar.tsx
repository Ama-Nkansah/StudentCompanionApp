import React from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

interface SearchBarProps {
	searchQuery: string;
	onSearchChange: (query: string) => void;
	placeholder?: string;
}

export default function SearchBar({ 
	searchQuery, 
	onSearchChange, 
	placeholder = "Search classes, assignments, courses..." 
}: SearchBarProps) {
	return (
		<View style={styles.searchContainer}>
			<View style={styles.searchInputContainer}>
				<FontAwesome name="search" size={16} color="#999" style={styles.searchIcon} />
				<TextInput
					value={searchQuery}
					onChangeText={onSearchChange}
					placeholder={placeholder}
					placeholderTextColor="#999"
					style={styles.searchInput}
				/>
				{searchQuery.length > 0 && (
					<TouchableOpacity onPress={() => onSearchChange("")} style={styles.clearButton}>
						<FontAwesome name="times" size={14} color="#999" />
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	searchContainer: {
		marginBottom: 16,
	},
	searchInputContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "rgba(255,255,255,0.08)",
		borderRadius: 12,
		paddingHorizontal: 12,
		paddingVertical: 12,
	},
	searchIcon: {
		marginRight: 10,
	},
	searchInput: {
		flex: 1,
		color: "white",
		fontSize: 16,
	},
	clearButton: {
		padding: 4,
		marginLeft: 8,
	},
});