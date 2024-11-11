import { Image, StyleSheet, View, Text } from "react-native";

export default function ConfigScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {/* <Text style={styles.headerText}>Configurações</Text> */}
            </View>
            <View style={styles.content}>
                <Text style={styles.constructionText}>Esta página está em construção</Text>
            </View>
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
        backgroundColor: "#5271ff",
        height: 80,
        justifyContent: "center",
        alignItems: "center",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    headerText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    constructionText: {
        fontSize: 18,
        color: "gray",
        fontStyle: "italic",
    },
});
