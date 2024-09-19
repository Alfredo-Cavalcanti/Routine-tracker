import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useState, useEffect } from "react";

export default function WeekContainer() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [weekDays, setWeekDays] = useState<Date[]>([]);

    useEffect(() => {
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
        const days: Date[] = [];
        for (let i = 0; i < 7; i++) {
            const day = new Date(startOfWeek);
            day.setDate(startOfWeek.getDate() + i);
            days.push(day);
        }
        setWeekDays(days);
    }, [currentDate]);

    return (
        <View style={styles.Container}>
            <View style={styles.daysWeekContainer}>
                {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day, index) => (
                    <Text key={index} style={styles.dayWeek}>{day}</Text>
                ))}
            </View>
            <View style={styles.daysMonthContainer}>
                {weekDays.map((day, index) => (
                    <View key={index} style={[styles.dayContainer, day.getDate() === currentDate.getDate() ? styles.currentDay : null]}>
                        <Text style={styles.dayMonth}>{day.getDate()}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        position: "absolute",
        top: 85,
        left: 0,
        right: 0,
        backgroundColor: "#999999",
        height: 75,
        justifyContent: "center",
        alignItems: "center",
    },
    daysWeekContainer: {
        width: 240,
        bottom: 5,
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    dayWeek: {
        color: "white",
        textAlign: "center",
        width: 35,
    },
    daysMonthContainer: {
        width: 240,
        bottom: 2,
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    dayContainer: {
        width: 35,
        alignItems: "center",
    },
    dayMonth: {
        color: "white",
        textAlign: "center",
    },
    currentDay: {
        backgroundColor: "orange",
        borderRadius: 20,
        padding: 2,
    },
});
