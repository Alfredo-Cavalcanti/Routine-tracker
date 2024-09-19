import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CurrentDate = () => {
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getFullYear()}`;

  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>{formattedDate}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#CCCDCF', // Cor cinza
    padding: 10,
    borderRadius: 4,
    marginRight: 10,
  },
  dateText: {
    fontSize: 20,
    color: '#1E90FF',
  },
});

export default CurrentDate;
