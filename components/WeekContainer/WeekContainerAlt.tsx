import { StyleSheet, View, Text, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/FontAwesome';
import { format } from "date-fns";

interface WeekContainerProps {
    eventos: { data: string }[];
    onDateSelect: (date: string) => void;
}

export default function WeekContainer({ eventos, onDateSelect  }: WeekContainerProps) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [weekDays, setWeekDays] = useState<Date[]>([]);
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState(currentDate);

    const updateWeekDays = (date: Date) => {
        const startOfWeek = new Date(date);
        startOfWeek.setDate(date.getDate() - date.getDay());
        const days: Date[] = [];
        for (let i = 0; i < 7; i++) {
            const day = new Date(startOfWeek);
            day.setDate(startOfWeek.getDate() + i);
            days.push(day);
        }
        setWeekDays(days);
    };

    useEffect(() => {
        // Atualiza os dias da semana sempre que currentDate mudar
        updateWeekDays(currentDate);
    }, [currentDate]);

    useEffect(() => {
        // Atualiza os dias da semana sempre que selectedDate mudar
        updateWeekDays(selectedDate);
    }, [selectedDate]);

    const handleCalendarPress = () => {
        setShowCalendar(true);
    };

    const handleDateChange = (event: any, date?: Date) => {
        console.log("Data selecionada:", date);
        if (date) {
            setSelectedDate(date);
            onDateSelect(format(date, "dd/MM/yyyy"));

            const startOfCurrentWeek = new Date(currentDate);
            startOfCurrentWeek.setDate(currentDate.getDate() - currentDate.getDay());
            const endOfCurrentWeek = new Date(startOfCurrentWeek);
            endOfCurrentWeek.setDate(startOfCurrentWeek.getDate() + 6);

            if (date < startOfCurrentWeek || date > endOfCurrentWeek) {
                const startOfSelectedWeek = new Date(date);
                startOfSelectedWeek.setDate(date.getDate() - date.getDay());
                setCurrentDate(startOfSelectedWeek);
            }
        }
        setShowCalendar(false);
    };

    const onDayPress = (day: { dateString: string }) => {
        const [year, month, dayOfMonth] = day.dateString.split('-').map(Number);
        const selected = new Date(year, month - 1, dayOfMonth, 12); // Define a hora para meio-dia
        setSelectedDate(selected);
        onDateSelect(format(selected, "dd/MM/yyyy"));
        setCurrentDate(selected);
        setShowCalendar(false);
    };

    const diasComEventos = eventos.map(evento => {
        const [dia, mes, ano] = evento.data.split('/');
        const formattedDate = new Date(parseInt(ano), parseInt(mes) - 1, parseInt(dia));
        return formattedDate instanceof Date && !isNaN(formattedDate.getTime()) 
            ? format(formattedDate, "dd/MM/yyyy") 
            : null;
    }).filter(Boolean);
    console.log('Eventos:', eventos);
    console.log('Dias com eventos formatados:', diasComEventos);

    return (
        <View style={styles.Container}>
            <View style={styles.daysWeekContainer}>
                {["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"].map((day, index) => (
                    <Text key={index} style={styles.dayWeek}>{day}</Text>
                ))}
            </View>
            <View style={styles.daysMonthContainer}>
                {weekDays.map((day, index) => {
                    const isToday  = 
                        day.getDate() === new Date().getDate() && 
                        day.getMonth() === new Date().getMonth() && 
                        day.getFullYear() === new Date().getFullYear();
                    
                    const isSelectedDay = 
                        day.getDate() === selectedDate.getDate() && 
                        day.getMonth() === selectedDate.getMonth() && 
                        day.getFullYear() === selectedDate.getFullYear();

                    const dataFormatada = format(day, "dd/MM/yyyy");
                    const temEvento = diasComEventos.includes(dataFormatada);

                    const dayStyle = 
                        isToday ? styles.currentDay : 
                        isSelectedDay ? styles.selectedDay : 
                        temEvento ? styles.eventDay : 
                        null;

                    return (
                        <View 
                            key={index} 
                            style={[styles.dayContainer, dayStyle]}>
                            <Text style={styles.dayMonth}>{day.getDate()}</Text>
                        </View>
                    );
                })}
            </View>

            <Pressable onPress={handleCalendarPress} style={styles.calendarIconContainer}>
                    <Icon name="calendar" size={25} color="white" />
            </Pressable>

            {showCalendar  && (
                <Calendar
                markedDates={eventos.reduce((acc, evento) => {
                    const [dia, mes, ano] = evento.data.split('/');
                    const formattedDate = `${ano}-${mes}-${dia}`;
                    acc[formattedDate] = { marked: true, dotColor: 'purple' };
                    return acc;
                }, {} as { [key: string]: { marked: boolean; dotColor: string } })}
                onDayPress={onDayPress}
                theme={{
                    todayTextColor: '#5271ff',
                    selectedDayBackgroundColor: 'red',
                    arrowColor: 'white',
                    monthTextColor: 'white',
                    textDayFontFamily: 'monospace',
                    textMonthFontFamily: 'monospace',
                    textDayFontSize: 16,
                    textMonthFontSize: 18,
                }}
                style={styles.calendar}
            />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        position: "absolute",
        top: 85,
        left: 0,
        right: 0,
        backgroundColor: "#999999",
        height: 75,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 3,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        margin: 4
    },
    daysWeekContainer: {
        width: 240,
        bottom: 5,
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    dayWeek: {
        color: "white",
        textAlign: "center",
        width: 35,
    },
    daysMonthContainer: {
        width: 240,
        bottom: 2,
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    dayContainer: {
        width: 35,
        alignItems: "center",
    },
    dayMonth: {
        color: "white",
        textAlign: "center",
    },
    currentDay: {
        backgroundColor: "#5271ff", // cor para o dia atual
        borderRadius: 20,
        padding: 2,
    },
    selectedDay: {
        backgroundColor: "red", // cor para o dia selecionado no calendário
        borderRadius: 20,
        padding: 2,
    },
    eventDay: {
        backgroundColor: "purple", // cor para o dia com evento
        borderRadius: 20,
        padding: 2,
    },
    calendarIconContainer: {
        width: 35,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        left: 315,
        bottom: 23,
    },
    calendar: {
        position: "absolute",
        top: 20,
        paddingBottom : 10,
        backgroundColor: "#5271ff",
        color: "white",
        borderRadius: 10,
        width: '80%',
        zIndex: 1,
        right: -150,
    },
});
