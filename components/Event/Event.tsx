import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, Modal, TouchableOpacity} from "react-native";
import Trash from "react-native-vector-icons/Fontisto";
import Edit from "react-native-vector-icons/FontAwesome";
import { CheckBox } from "react-native-elements";
import { db, auth } from "../../src/firebase/config_firebase";
import { collection, onSnapshot, deleteDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import CheckAll from "../CheckAll/CheckAll";
import SeeAll from "../SeeAll/SeeAll";
import ShowCompleted from "../ShowCompleted/ShowCompleted";
import ShowNotCompleted from "../ShowNotCompleted/ShowNotCompleted";

export interface Evento {
    id: string;
    nome: string;
    data: string;
    hora: string;
    checked?: boolean;
    status?: boolean;}

    interface EventProps {
        setEventos: React.Dispatch<React.SetStateAction<Evento[]>>;
        eventos: Evento[];
        selectedDate: string; // Adicione este prop
    }

export default function Event({ setEventos, eventos, selectedDate }: EventProps) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [eventToDeleteIndex, setEventToDeleteIndex] = useState<number | null>(null);
    const [showAll, setShowAll] = useState(false); // Novo estado para controlar a exibição de todos os eventos
    const [showCompleted, setShowCompleted] = useState(false);
    const [showNotCompleted, setShowNotCompleted] = useState(false);
    const userId = auth.currentUser?.email ?? null;

    useEffect(() => {
        if (!userId) return;

        const unsubscribe = onSnapshot(collection(db, userId), (snapshot) => {
            const eventosList: Evento[] = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Evento[];
            setEventos(eventosList);});

        return () => unsubscribe();}, [setEventos, userId]);

    const handleExcluirEvento = async (index: number) => {
        if (!userId) return; // Verifica se userId é válido
        const updatedEventos = [...eventos];
        const eventIdToDelete = updatedEventos[index].id;

        updatedEventos.splice(index, 1);
        setEventos(updatedEventos);

        try {
            await deleteDoc(doc(db, userId, eventIdToDelete));
            console.log(`Evento com ID ${eventIdToDelete} excluído do Firestore.`);
        } catch (error) {
            console.error("Erro ao excluir o evento do Firestore:", error);}};

    const handleCheckboxToggle = async (index: number) => {
        if (!userId) return; // Verifica se userId é válido
        const updatedEventos = [...eventos];
        const evento = updatedEventos[index];
        evento.checked = !evento.checked;
        evento.status = evento.checked;

        setEventos(updatedEventos);

        try {
            await updateDoc(doc(db, userId, evento.id), { 
                checked: evento.checked, 
                status: evento.status});
            console.log(`Status do evento com ID ${evento.id} atualizado no Firestore.`);
        } catch (error) {
            console.error("Erro ao atualizar o status do evento no Firestore:", error);}};

    const navigation = useNavigation();

    const handleEventEditPress = (eventId: string) => {
        const evento = eventos.find(e => e.id === eventId);
        if (evento) {
            navigation.navigate("eventEdit", { 
                eventId, 
                isNewEvent: false, 
                date: evento.data, 
                time: evento.hora});}};

    const handleToggleSeeAll = (showAll: boolean) => {
        setShowAll(showAll);
    };

    const handleToggleShowCompleted = (show: boolean) => {
        setShowCompleted(show);
        if (show) setShowNotCompleted(false);
    };

    const handleToggleShowNotCompleted = (show: boolean) => {
        setShowNotCompleted(show);
        if (show) setShowCompleted(false);
    };

    const eventosToDisplay = eventos.filter(evento => {
        if (showAll) return true;
        if (showCompleted) return evento.status === true;
        if (showNotCompleted) return evento.status === false;
        return evento.data === selectedDate;
    });

    return (
        <View style={styles.scrollViewContent}>
            <CheckAll eventos={eventos} setEventos={setEventos} />
            <SeeAll eventos={eventos} setEventos={setEventos} onToggleSeeAll={handleToggleSeeAll} />
            <ShowCompleted eventos={eventos} setEventos={setEventos} onToggleShowCompleted={handleToggleShowCompleted} />
            <ShowNotCompleted eventos={eventos} setEventos={setEventos} onToggleShowNotCompleted={handleToggleShowNotCompleted} />
            {eventosToDisplay.map((evento, index) => (
                <View key={index} style={styles.containerEvento}>
                    <View style={styles.backgroundNumeroOrdem}>
                        <Text style={styles.numeroOrdem}>{evento.id}</Text>
                    </View>

                    <Text
                        style={[
                            styles.textoEvento,
                            evento.checked && styles.checkedText,]}>
                        {evento.nome}
                    </Text>

                    <Pressable
                        style={styles.backgroundIcones}
                        onPress={() => handleEventEditPress(evento.id)}>
                        <Edit
                            name={"pencil-square-o"}
                            size={25}
                            color="black"/>
                    </Pressable>

                    <CheckBox
                        checked={evento.checked || false}
                        onPress={() => handleCheckboxToggle(index)}
                        containerStyle={styles.checkbox}/>

                    <Pressable
                        style={styles.backgroundIcones}
                        onPress={() => {
                            setEventToDeleteIndex(index);
                            setShowDeleteModal(true);}}>
                        <Trash name={"trash"} size={25} color="black" />
                    </Pressable>
                </View>
            ))}

            <Modal visible={showDeleteModal} transparent animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>
                            Deseja realmente excluir?
                        </Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                onPress={() => {
                                    setShowDeleteModal(false);
                                    if (eventToDeleteIndex !== null) {
                                        handleExcluirEvento(eventToDeleteIndex);}}}>
                                <Text style={styles.confirmButton}>Sim</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => setShowDeleteModal(false)}>
                                <Text style={styles.cancelButton}>Não</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

        </View>
    );
}

const styles = StyleSheet.create({
    scrollViewContent: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
    },
    containerEvento: {
        backgroundColor: "#f9f9f9",
        flexDirection: "row",
        padding: 15,
        borderWidth: 1,
        borderColor: "#ddd",
        alignItems: "center",
        marginBottom: 10,
        width: "100%",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    backgroundNumeroOrdem: {
        backgroundColor: "#bdc3c7",
        borderRadius: 40,
        width: 40,
        height: 40,
        padding: 2,
        marginRight: 10,
    },
    numeroOrdem: {
        color: "#fff",
        textAlign: "center",
        fontSize: 25,
    },
    textoEvento: {
        fontSize: 18,
        flex: 1,
    },
    checkedText: {
        textDecorationLine: "line-through",
        color: "gray",
    },
    backgroundIcones: {
        backgroundColor: "white",
    },
    checkbox: {
        backgroundColor: "white",
        borderWidth: 0,
        padding: 0,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
    },
    modalText: {
        fontSize: 16,
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: "row",
    },
    confirmButton: {
        marginRight: 5,
        backgroundColor: "#5271ff",
        color: "white",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
    },
    cancelButton: {
        marginLeft: 5,
        backgroundColor: "#5271ff",
        color: "white",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
    },
});