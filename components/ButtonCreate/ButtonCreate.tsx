import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // Usando FontAwesome
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from "../../src/firebase/config_firebase";

interface ButtonCreateProps {
  userEmail: string | null;
}

const ButtonCreate: React.FC<ButtonCreateProps> = ({ userEmail }) => {
  const navigation = useNavigation();

  const findNextAvailableId = async () => {
    if (!userEmail) throw new Error("Usuário não autenticado.");

    try {
      const userCollection = collection(db, userEmail);
      const querySnapshot = await getDocs(userCollection);
      const ids = querySnapshot.docs.map(doc => parseInt(doc.id, 10)).sort((a, b) => a - b);

      let newId = 1;
      for (let i = 0; ids.length > i; i++) {
        if (ids[i] !== newId) {
          break;
        }
        newId++;
      }

      return newId.toString().padStart(2, '0');
    } catch (error) {
      console.error("Erro ao buscar IDs dos eventos:", error);
      return "01";
    }
  };

  const handleNovoEventoPress = async () => {
    try {
      const nextId = await findNextAvailableId();
      navigation.navigate("eventEdit", { eventId: nextId, isNewEvent: true, userEmail });
    } catch (error) {
      console.error("Erro ao gerar novo ID para evento:", error);
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleNovoEventoPress}>
      <FontAwesome name="plus" size={30} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#5271ff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center', // Centraliza horizontalmente
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5, // Sombras em dispositivos Android
  },
});

export default ButtonCreate;
