import InputNewPassword from "@/components/InputNewPassword/InputNewPassword";
import InputRepeatNewPassword from "@/components/InputRepeatNewPassword/InputRepeatNewPassword";
import { Link } from "expo-router";
import { Image, StyleSheet, Platform, View, Text } from "react-native";
import ButtonSave from "@/components/ButtonSave/ButtonSave";

export default function RecoverPassword() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {/* Adiciona a logo no cabeçalho */}
                <Image
                    source={require('@/assets/images/logo.png')}
                    style={styles.logo}
                />
            </View>
            <View style={styles.box}>
                <View style={styles.stepContainer}>
                    <InputNewPassword />
                </View>
                <View style={styles.stepContainer}>
                    <InputRepeatNewPassword />
                </View>
                <View style={styles.stepButtonContainer}>
                    <ButtonSave />
                </View>
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
    logo: {
        marginTop: 320,
        width: 300,
        height: 500,
        resizeMode: "contain",
    },
    box: {
        marginTop: 250,
        alignItems: "center",
        backgroundColor: "white",
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
        width: 315,
    },
    stepButtonContainer: {
        gap: 8,
        marginTop: 45,
        marginBottom: 8,
        width: 315,
    },
    default: {
        fontSize: 16,
        lineHeight: 24,
    },
    defaultSemiBold: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: "600",
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        lineHeight: 32,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
    linktext: {
        marginTop: 35,
        textAlign: "center",
    },
    link: {
        fontSize: 16,
        color: "#5271ff",
        fontWeight: "bold",
    },
});