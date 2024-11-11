import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/src/firebase/config_firebase';
import { collection, doc, setDoc, getDocs } from 'firebase/firestore';
import { db } from '@/src/firebase/config_firebase';

interface ButtonProps {
  onPress?: (event: GestureResponderEvent) => void;
  email: string;
  password: string;
}

const ButtonRegister: React.FC<ButtonProps> = ({ onPress, email, password }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user.email) {
        const userCollectionRef = collection(db, user.email);
        const userDocs = await getDocs(userCollectionRef);

        if (userDocs.empty) {
          await setDoc(doc(userCollectionRef), { /* Dados iniciais */ });
          console.log("Coleção criada com sucesso.");
        } else {
          console.log("Coleção já existe, pulando criação.");
        }
      } else {
        throw new Error("Erro ao obter o email do usuário.");
      }

      Alert.alert("Sucesso", "Usuário cadastrado com sucesso!");
      navigation.navigate("login");
    } catch (error) {
      const errorMessage = error.code === 'auth/email-already-in-use'
        ? "Este e-mail já está em uso. Tente outro."
        : error.code === 'auth/invalid-email'
        ? "Email inválido. Verifique e tente novamente."
        : error.code === 'auth/weak-password'
        ? "A senha deve ter pelo menos 6 caracteres."
        : "Falha ao cadastrar usuário. Verifique os dados e tente novamente.";
      Alert.alert("Erro", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
      {loading ? (
        <ActivityIndicator size="small" color="#FFF" />
      ) : (
        <Text style={styles.text}>Cadastrar</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 30,
    backgroundColor: '#5271ff',
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

export default ButtonRegister;