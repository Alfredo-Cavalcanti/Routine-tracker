import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface CurrentTimeProps {
  onTimeChange: (time: Date) => void;
  selectedTime: Date | null;}

const CurrentTime: React.FC<CurrentTimeProps> = ({ onTimeChange, selectedTime }) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleTimeChange = (event: any, time?: Date) => {
    if (Platform.OS === 'android') setShowPicker(false);
    if (time) {
      onTimeChange(time);}};

  return (
    <View>
      <Pressable onPress={() => setShowPicker(true)} style={styles.container}>
                <Text style={styles.timeText}>
                    {selectedTime
                        ? selectedTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                        : "Definir Hora"}
                </Text>
            </Pressable>

      {showPicker && (
        <DateTimePicker
          value={selectedTime || new Date()}
          mode="time"
          display="default"
          onChange={handleTimeChange}/>)}
    </View>);};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#CCCDCF',
    padding: 10,
    borderRadius: 4,
  },
  timeText: {
    fontSize: 20,
    color: '#1E90FF',
  },
});

export default CurrentTime;
