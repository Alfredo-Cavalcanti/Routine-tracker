import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ButtonCreate: React.FC = () => {
  const navigation = useNavigation();

  const handleNovoEventoPress = () => {
    navigation.navigate("eventEdit", { eventId: null });
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleNovoEventoPress}>
      <Text style={styles.text}>Create new event</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 30,
    backgroundColor: 'orange',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 19,
    fontWeight: 'bold',
  },
});

export default ButtonCreate;