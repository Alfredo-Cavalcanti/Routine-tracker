// ShowCompleted.tsx
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { CheckBox } from "react-native-elements";
import { Evento } from "../Event/Event"; // Ajuste o caminho se necessário

interface ShowCompletedProps {
    eventos: Evento[];
    setEventos: (eventos: Evento[]) => void;
    onToggleShowCompleted: (showCompleted: boolean) => void;
}

const ShowCompleted: React.FC<ShowCompletedProps> = ({ eventos, setEventos, onToggleShowCompleted }) => {
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        onToggleShowCompleted(checked);
    }, [checked, onToggleShowCompleted]);

    const handleToggleShowCompleted = () => {
        setChecked(!checked);
    };

    return (
        <View style={styles.checkboxContainer}>
            <CheckBox
                checked={checked}
                onPress={handleToggleShowCompleted}
                containerStyle={styles.checkbox}
            />
            <Text style={styles.label}>Ver Eventos Concluídos</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    checkboxContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        padding: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        width: "100%",
        marginTop: 5,
        marginBottom: 10,
        height: 50,
    },
    checkbox: {
        marginRight: 10,
        padding: 0,
    },
    label: {
        fontSize: 16,
    },
});

export default ShowCompleted;