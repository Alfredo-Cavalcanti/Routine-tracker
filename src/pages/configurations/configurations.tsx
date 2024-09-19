import { Image, StyleSheet, View, Text } from "react-native";

export default function ConfigScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.header}></View>
        </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "white",
    },
    header: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "orange",
        height: 75,
        justifyContent: "center",
        alignItems: "center",
    },
});