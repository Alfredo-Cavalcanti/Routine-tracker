import React from 'react';
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from 'react-native';

interface ButtonProps {
  onPress?: (event: GestureResponderEvent) => void;
}

const ButtonLogin: React.FC<ButtonProps> = ({ onPress }) => {
  const navigation = useNavigation();

    const handleHomePress = () => {
        navigation.navigate("home");
    };

  return (
    <TouchableOpacity style={styles.button} onPress={handleHomePress}>
      <Text style={styles.text}>Login</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 30,
    backgroundColor: 'orange',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ButtonLogin;