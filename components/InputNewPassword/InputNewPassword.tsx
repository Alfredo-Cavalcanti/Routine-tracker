import React, { useState } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

function InputNewPassword () {

    const [password, setPassword] = useState("");
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!isPasswordVisible);
    };

    return (
        <View style={styles.container}>
            <Icon name="lock-open" size={24} color="grey" style={styles.lockIcon} />
            <TextInput 
            style={styles.input}
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={setPassword}
            placeholder="Digitar Nova Senha"
            
            />
            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
                <Icon
                    name={isPasswordVisible ? "eye-off" : "eye"}
                    size={24}
                    color="grey"
                />
            </TouchableOpacity>
        </View>
    )

    
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        borderColor: "#ccc",
        borderRadius: 10,
        paddingHorizontal: 10,
        width: '90%',
        margin: 10,
        position: "relative",
        
    },
    input: {
        flex: 1,
        height: 40,
        paddingRight: 40,
        paddingHorizontal: 40,
        fontSize: 18,
        borderBottomWidth: 1,
        borderColor: '#CCC'
    },
    lockIcon: {
        
        position: "absolute",
        left: 10,
        
    },
    iconContainer: {
        position: "absolute",
        right: 10,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default InputNewPassword;