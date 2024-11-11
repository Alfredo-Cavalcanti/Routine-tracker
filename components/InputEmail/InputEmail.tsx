import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { styles } from './InputEmailStyle';
import { MaterialIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface InputEmailProps {
  value: string;
  onChangeText: (text: string) => void;
}

const InputEmail: React.FC<InputEmailProps> = ({ value, onChangeText }) => {
  return (
    <View style={styles.container}>
          <MaterialIcons name="email" size={24} color="black" style={styles.lockIcon} />
            <TextInput 
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            value={value}
            onChangeText={onChangeText}
            />
        </View>
  );
};


export default InputEmail;
