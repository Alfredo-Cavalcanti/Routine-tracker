import { Image, StyleSheet, View, ScrollView } from "react-native";
import Event, { Evento } from "@/components/Event/Event";
import WeekContainer from "@/components/WeekContainer/WeekContainerAlt";
import ButtonCreate from "@/components/ButtonCreate/ButtonCreate";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { auth, db } from '@/src/firebase/config_firebase';
import { collection, getDocs, onSnapshot  } from 'firebase/firestore';

export default function HomeScreen() {

    const [eventos, setEventos] = useState<Evento[]>([]);
    const [selectedDate, setSelectedDate] = useState(format(new Date(), "dd/MM/yyyy"));

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            console.log("Usuário logado:", user.email);
        } else {
            console.error("Nenhum usuário logado.");
        }
    }, []);

    useEffect(() => {
        const user = auth.currentUser;
        const userCollectionRef = user && user.email ? collection(db, user.email) : null;

        if (userCollectionRef) {
            const unsubscribe = onSnapshot(userCollectionRef, (snapshot) => {
                const userEvents: Evento[] = snapshot.docs.map(doc => {
                    const data = doc.data() as Evento;
                    return {
                        ...data,
                        id: doc.id,
                    };
                });

                setEventos(userEvents);
            });

            return () => unsubscribe();
        } else {
            console.warn("Usuário não autenticado. Redirecionar para a tela de login.");
        }
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}></View>

            <View style={styles.weekContainerWrapper}>
                <WeekContainer eventos={eventos.map(evento => ({ data: evento.data || "" }))} onDateSelect={setSelectedDate}/>
            </View>

            <ScrollView style={styles.eventContainer}>
                <Event setEventos={setEventos} eventos={eventos} selectedDate={selectedDate} />
            </ScrollView>

            <View style={styles.buttonCreateWrapper}>
                <ButtonCreate userEmail={auth.currentUser?.email ?? null} />
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
    weekContainerWrapper: {
        marginTop: 5,
        zIndex: 1,
    },
    eventContainer: {
        // top: 1,
        //Bug analisar
        bottom: 60,
        flex: 1,
        marginTop: 210,
    },
    buttonCreateWrapper: {
        position: "absolute",
        bottom: 20,
        left: 0,
        right: 0,
        alignItems: "center",
        zIndex: 5,
    },
});