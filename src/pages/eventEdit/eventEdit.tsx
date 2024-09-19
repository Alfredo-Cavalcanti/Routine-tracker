import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { doc, getDoc, updateDoc, addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/config_firebase";
import CurrentDate from "@/components/Date/CurrentDate";
import CurrentTime from "@/components/Hour/CurrentTime";
import Edit from "react-native-vector-icons/FontAwesome";
import ButtonSave from "@/components/ButtonSave/ButtonSave";
import ButtonBack from "@/components/ButtonBack/ButtonBack";

export default function EventEdit() {
    const [editingTitle, setEditingTitle] = useState(false);
    const [eventTitle, setEventTitle] = useState("Write your title");
    const [eventNotes, setEventNotes] = useState("");

    const navigation = useNavigation();
    const route = useRoute();
    const { eventId } = route.params;

    const titleInputRef = useRef<TextInput>(null);

    useEffect(() => {
        if (eventId) {
            const fetchEvento = async () => {
                try {
                    const docRef = doc(db, "eventos", eventId);
                    const docSnapshot = await getDoc(docRef);
                    if (docSnapshot.exists()) {
                        const eventData = docSnapshot.data();
                        setEventTitle(eventData.nome || "Título do Evento");
                        setEventNotes(eventData.notas || "");
                    } else {
                        console.log(`Evento com ID ${eventId} não encontrado.`);
                    }
                } catch (error) {
                    console.error("Erro ao buscar dados do evento:", error);
                }};

                fetchEvento();
            } else {
                setEventTitle("Write your title");
                setEventNotes("");
            }
        }, [eventId]);

    useEffect(() => {
        if (editingTitle && titleInputRef.current) {
            titleInputRef.current.focus();
            titleInputRef.current.setSelection(0, eventTitle.length);
        }
    }, [editingTitle]);

    const handleButtonBackPress = () => {
        navigation.navigate("home");};

    const handleEditTitle = () => {
        setEditingTitle(true);};

    const handleTitleChange = (newTitle: string) => {
        setEventTitle(newTitle);};

    const handleSaveTitle = () => {
        setEditingTitle(false);};

    const handleButtonSavePress = async () => {
        try {
            if (eventId) {
                const docRef = doc(db, "eventos", eventId);
                await updateDoc(docRef, { nome: eventTitle, notas: eventNotes });
                console.log(`Evento com ID ${eventId} atualizado no Firestore.`);
            } else {
                const dataAtual = new Date().toLocaleDateString();
                const horaAtual = new Date().toLocaleTimeString();
                const novoEventoData = {
                    nome: eventTitle,
                    notas: eventNotes,
                    data: dataAtual,
                    hora: horaAtual,
                    status: false,};

                const docRef = await addDoc(collection(db, "eventos"), novoEventoData);
                console.log(`Novo evento criado com ID ${docRef.id}`);
                setEventTitle("Write your title");
                setEventNotes("");}

            navigation.navigate("home");
        } catch (error) {
            console.error("Erro ao salvar o evento no Firestore:", error);
        }};

    return (
        <View style={styles.container}>
            <View style={styles.header}></View>

            <View style={styles.eventEditBox}>
                <View style={styles.dateAndHour}>
                    <CurrentDate />
                    <CurrentTime />
                </View>

                <View style={styles.titleBox}>
                    {editingTitle ? (
                        <TextInput
                            ref={titleInputRef}
                            style={styles.editableTitle}
                            value={eventTitle}
                            onChangeText={handleTitleChange}
                            autoFocus
                            onBlur={handleSaveTitle}/>
                    ) : (
                        <Text style={styles.eventTitle}>{eventTitle}</Text>)}
                </View>
                <Pressable style={styles.editButton} onPress={handleEditTitle}>
                    <Edit name={"pencil-square-o"} size={25} color="black" />
                </Pressable>

                <View style={styles.notesBox}>
                    <TextInput
                        style={styles.notesInput}
                        value={eventNotes}
                        onChangeText={setEventNotes}
                        multiline
                        placeholder="Add your notes here..."/>
                </View>
            </View>

            <View style={styles.saveBackButtonsBox}>
                <ButtonSave onPress={handleButtonSavePress} />
                <ButtonBack onPress={handleButtonBackPress} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "white",
        alignItems: "center",
    },
    header: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "orange",
        height: 75,
        justifyContent: "center",
        alignItems: "center",
    },
    eventEditBox: {
        width: "85%",
        height: "70%",
        marginTop: 90,
        backgroundColor: "#D9D8D8",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 6,
        alignItems: "center",
    },
    dateAndHour: {
        flexDirection: "row",
        backgroundColor: "#D9D8D8",
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderRadius: 4,
    },
    titleBox: {
        backgroundColor: "#D9D8D8",
        marginTop: 30,
        alignItems: "center",
        justifyContent: "center",
    },
    eventTitle: {
        fontSize: 23,
    },
    editableTitle: {
        backgroundColor: "#D9D8D8",
        fontSize: 23,
        borderColor: "black",
    },
    editButton: {
        position: "absolute",
        top: 103,
        right: 25,
        backgroundColor: "#D9D8D8",
    },
    notesBox: {
        backgroundColor: "#D9D8D8",
        width: "90%",
        marginTop: 60,
        padding: 10,
        borderRadius: 6,
    },
    notesInput: {
        fontSize: 16,
        height: 320,
        textAlignVertical: "top",
    },
    saveBackButtonsBox: {
        backgroundColor: "white",
        flexDirection: "row",
        width: "85%",
        justifyContent: "space-between",
        paddingBottom: 15,
    },
});
