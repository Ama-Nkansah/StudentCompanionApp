import React, { useMemo, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import SearchBar from '@/components/searchBar';

import {
	SafeAreaView,
	View,
	Text,
	FlatList,
	TextInput,
	TouchableOpacity,
	ScrollView,
	StyleSheet,
	Platform,
	StatusBar,
} from "react-native";

type ClassSession = {
	id: string;
	course: string;
	startTime: string;
	endTime: string;
	location: string;
	isCompleted: boolean;
};

type Assignment = {
	id: string;
	title: string;
	course: string;
	dueDateISO: string;
	isCompleted: boolean;
};

const initialClasses: ClassSession[] = [
	{ id: "c1", course: "Math 101", startTime: "09:00", endTime: "10:30", location: "Room B2", isCompleted: false },
	{ id: "c2", course: "Intro to CS", startTime: "11:00", endTime: "12:30", location: "Lab 3", isCompleted: false },
	{ id: "c3", course: "History", startTime: "14:00", endTime: "15:00", location: "Room A1", isCompleted: false },
];

const initialAssignments: Assignment[] = [
	{ id: "a1", title: "Problem Set 3", course: "Math 101", dueDateISO: new Date(Date.now() + 86400000).toISOString(), isCompleted: false },
	{ id: "a2", title: "Read Ch. 2-3", course: "History", dueDateISO: new Date(Date.now() + 2 * 86400000).toISOString(), isCompleted: false },
];

function formatPrettyDate(iso: string): string {
	const date = new Date(iso);
	return date.toLocaleDateString(undefined, {
		weekday: "short",
		month: "short",
		day: "numeric",
	});
}

export default function IndexScreen() {
	const [classes, setClasses] = useState<ClassSession[]>(initialClasses);
	const [assignments, setAssignments] = useState<Assignment[]>(initialAssignments);
 
  const [searchQuery, setSearchQuery] = useState("");
	const [newTitle, setNewTitle] = useState("");
	const [newCourse, setNewCourse] = useState("");
	const [newDueDate, setNewDueDate] = useState("");

	const todayLabel = useMemo(() => {
		const now = new Date();
		return now.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
	}, []);

	const upcomingAssignments = useMemo(
		() =>
			[...assignments]
				.filter(a => !a.isCompleted)
				.sort((a, b) => +new Date(a.dueDateISO) - +new Date(b.dueDateISO)),
		[assignments]
	);

	function toggleClass(id: string) {
		setClasses(prev => prev.map(c => (c.id === id ? { ...c, isCompleted: !c.isCompleted } : c)));
	}

	function toggleAssignment(id: string) {
		setAssignments(prev => prev.map(a => (a.id === id ? { ...a, isCompleted: !a.isCompleted } : a)));
	}

	function addAssignment() {
		if (!newTitle.trim() || !newCourse.trim()) return;
		const dueISO = newDueDate ? new Date(newDueDate).toISOString() : new Date().toISOString();
		const created: Assignment = {
			id: Math.random().toString(36).slice(2),
			title: newTitle.trim(),
			course: newCourse.trim(),
			dueDateISO: dueISO,
			isCompleted: false,
		};
		setAssignments(prev => [created, ...prev]);
		setNewTitle("");
		setNewCourse("");
		setNewDueDate("");
	}

	return (
		<SafeAreaView style={styles.safe}>
			<ScrollView contentContainerStyle={styles.container}>
				<View style={styles.headerRow}>
					<Text style={styles.header}>Learnly</Text>
					<FontAwesome name="graduation-cap" size={22} color="#b6c2ff" style={styles.headerIcon} />
				</View>
				<Text style={styles.subheader}>{todayLabel}</Text>
        <SearchBar 
					searchQuery={searchQuery}
					onSearchChange={setSearchQuery}
				/>


				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Today's Classes</Text>
					<FlatList
						data={classes}
						keyExtractor={item => item.id}
						scrollEnabled={false}
						ItemSeparatorComponent={() => <View style={styles.separator} />}
						renderItem={({ item }) => (
							<View style={styles.card}>
								<Checkbox
									value={item.isCompleted}
									onValueChange={() => toggleClass(item.id)}
									color="#5063ff"
									style={styles.checkbox}
								/>
								<View style={{ flex: 1 }}>
									<Text style={[styles.cardTitle, item.isCompleted && styles.strike]}>
										{item.course}
									</Text>
									<Text style={styles.cardMeta}>
										{item.startTime} - {item.endTime} • {item.location}
									</Text>
								</View>
							</View>
						)}
					/>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Assignments</Text>

					<View style={styles.inputRow}>
						<TextInput
							value={newTitle}
							onChangeText={setNewTitle}
							placeholder="Title (e.g., Lab Report)"
							placeholderTextColor="#999"
							style={styles.input}
						/>
						<TextInput
							value={newCourse}
							onChangeText={setNewCourse}
							placeholder="Course (e.g., Chem 102)"
							placeholderTextColor="#999"
							style={styles.input}
						/>
						<TextInput
							value={newDueDate}
							onChangeText={setNewDueDate}
							placeholder="Due (YYYY-MM-DD)"
							placeholderTextColor="#999"
							keyboardType="numbers-and-punctuation"
							style={styles.input}
						/>
						<TouchableOpacity onPress={addAssignment} style={styles.addButton}>
							<Text style={styles.addButtonText}>Add</Text>
						</TouchableOpacity>
					</View>

					{upcomingAssignments.length === 0 ? (
						<Text style={styles.emptyText}>No upcoming assignments. You're all caught up!</Text>
					) : (
						<FlatList
							data={upcomingAssignments}
							keyExtractor={item => item.id}
							scrollEnabled={false}
							ItemSeparatorComponent={() => <View style={styles.separator} />}
							renderItem={({ item }) => (
								<View style={styles.card}>
									<Checkbox
										value={item.isCompleted}
										onValueChange={() => toggleAssignment(item.id)}
										color="#5063ff"
										style={styles.checkbox}
									/>
									<View style={{ flex: 1 }}>
										<Text style={[styles.cardTitle, item.isCompleted && styles.strike]}>
											{item.title}
										</Text>
										<Text style={styles.cardMeta}>
											{item.course} • Due {formatPrettyDate(item.dueDateISO)}
										</Text>
									</View>
									<View style={[styles.pill, item.isCompleted ? styles.pillDone : styles.pillTodo]}>
										<Text style={styles.pillText}>{item.isCompleted ? "Done" : "Todo"}</Text>
									</View>
								</View>
							)}
						/>
					)}
				</View>

				<View style={{ height: 24 }} />
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safe: {
		flex: 1,
		backgroundColor: "#011e1fff",
		paddingTop: Platform.OS === "android" ? (StatusBar.currentHeight ?? 0) : 0,
	},
	container: {
		padding: 16,
		paddingBottom: 32,
	},
	headerRow: {
	flexDirection: "row",
	alignItems: "center",
  justifyContent: "center",
	marginBottom: 4,
},
	header: {
		color: "white",
		fontSize: 30,
		fontWeight: "700",
	},
	headerIcon: {
	marginLeft: 8,
},
	subheader: {
		color: "#b6c2ff",
		fontSize: 14,
		marginBottom: 16,
	},
	section: {
		backgroundColor: "rgba(255,255,255,0.06)",
		borderRadius: 14,
		padding: 12,
		marginBottom: 16,
	},
	sectionTitle: {
		color: "white",
		fontSize: 16,
		fontWeight: "700",
		marginBottom: 8,
	},
	card: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "rgba(255,255,255,0.06)",
		borderRadius: 12,
		paddingVertical: 12,
		paddingHorizontal: 12,
	},
	cardTitle: {
		color: "white",
		fontSize: 16,
		fontWeight: "600",
	},
	cardMeta: {
		color: "#c5d0ff",
		fontSize: 12,
		marginTop: 2,
	},
	separator: {
		height: 10,
	},
	inputRow: {
		gap: 8,
	},
	input: {
		backgroundColor: "rgba(255,255,255,0.08)",
		borderRadius: 10,
		paddingHorizontal: 12,
		paddingVertical: 10,
		color: "white",
	},
	addButton: {
		alignSelf: "flex-start",
		backgroundColor: "#136666ff",
		borderRadius: 10,
		paddingHorizontal: 16,
		paddingVertical: 8,
    marginVertical: 10,
	},
	addButtonText: {
		color: "white",
		fontWeight: "700",
	},
	checkbox: {
		marginRight: 10,
	},
	pill: {
		paddingHorizontal: 10,
		paddingVertical: 6,
		borderRadius: 999,
	},
	pillTodo: {
		backgroundColor: "rgba(80, 99, 255, 0.2)",
	},
	pillDone: {
		backgroundColor: "rgba(34, 197, 94, 0.25)",
	},
	pillText: {
		color: "white",
		fontWeight: "700",
		fontSize: 12,
	},
	strike: {
		textDecorationLine: "line-through",
		color: "#a7b2ff",
	},
	emptyText: {
		color: "#c5d0ff",
		fontSize: 14,
		opacity: 0.9,
		textAlign: "center",
		paddingVertical: 8,
	},
});


