import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { CheckBox } from "react-native-elements";

interface SeeAllProps {
    eventos: Evento[];
    setEventos: (eventos: Evento[]) => void;
    onToggleSeeAll: (showAll: boolean) => void;
}

const SeeAll: React.FC<SeeAllProps> = ({ eventos, setEventos, onToggleSeeAll }) => {
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        onToggleSeeAll(checked);
    }, [checked, onToggleSeeAll]);

    const handleToggleAll = () => {
        setChecked(!checked);
    };

    return (
        <View style={styles.checkAllContainer}>
            <CheckBox
                checked={checked}
                onPress={handleToggleAll}
                containerStyle={styles.checkbox}
            />
            <Text style={styles.label}>Ver Todos os Eventos</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    checkAllContainer: {
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
        marginTop: 1,
        marginBottom: 10,
        height: 50,
    },
    checkbox: {
        marginRight: 10,
        alignSelf: "flex-end",
        padding: 0,
    },
    label: {
        fontSize: 16,
    },
});

export default SeeAll;
