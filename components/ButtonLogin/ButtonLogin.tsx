import React, { useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent, ActivityIndicator, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/src/firebase/config_firebase';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/src/firebase/config_firebase';

interface ButtonProps {
  onPress?: (event: GestureResponderEvent) => void;
  email: string;
  password: string;
}

const ButtonLogin: React.FC<ButtonProps> = ({ onPress, email, password }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (loading) {
      console.log("Login já em andamento, ignorando clique.");
      return;
    }

    console.log("handleLogin foi chamado");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      const userCollectionRef = collection(db, email);
      const userDocs = await getDocs(userCollectionRef);
      
      if (!userDocs.empty) {
        console.log("Eventos Completos do Usuário:", userDocs.docs.map(doc => doc.data()));
      } else {
        console.log("Nenhum dado encontrado para o usuário.");
      }

      navigation.navigate("home");
    } catch (error) {
      Alert.alert("Erro", "E-mail ou senha incorretos. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
      {loading ? (
        <ActivityIndicator size="small" color="#FFF" />
      ) : (
        <Text style={styles.text}>Entrar</Text>
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

export default ButtonLogin;