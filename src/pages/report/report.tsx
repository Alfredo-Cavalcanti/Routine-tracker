import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { db, auth } from "../../firebase/config_firebase";
import { collection, onSnapshot } from "firebase/firestore";

export default function PixChart() {
  const [approvedCount, setApprovedCount] = useState(0);
  const [failedCount, setFailedCount] = useState(0);

  useEffect(() => {
    const user = auth.currentUser;

    if (user && user.email) {
      const userCollectionRef = collection(db, user.email);

      const unsubscribe = onSnapshot(userCollectionRef, (snapshot) => {
        let approved = 0;
        let failed = 0;

        snapshot.forEach((doc) => {
          const data = doc.data();
          if (data.status === true) {
            approved += 1;
          } else if (data.status === false) {
            failed += 1;
          }
        });

        setApprovedCount(approved);
        setFailedCount(failed);
      });

      // Limpar a assinatura ao desmontar o componente
      return () => unsubscribe();
    } else {
      console.warn("Usuário não autenticado.");
    }
  }, []);

  const screenWidth = Dimensions.get("window").width;

  const pieChartData = [
    {
      name: "Realizado",
      count: approvedCount,
      color: "#4CAF50",
    },
    {
      name: "Não Realizado",
      count: failedCount,
      color: "#FF5252",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}></Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.title}>Realizado x Não Realizados</Text>
        <Text style={styles.subtitle}>
          Percentual de hábitos realizados e não realizados ao longo do uso
        </Text>

        <View style={[styles.chartContainer, { width: screenWidth * 0.9 }]}>
          <PieChart
            data={pieChartData}
            width={screenWidth * 0.9}
            height={220}
            chartConfig={{
              backgroundColor: "#f5f5f5",
              color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor="count"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
            hasLegend={false}
          />
        </View>

        <View style={styles.legendContainer}>
          {pieChartData.map((item, index) => (
            <View key={index} style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: item.color }]} />
              <Text style={styles.legendText}>
                {item.name}: {item.count}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  scrollViewContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 100, // Ajustado para ficar abaixo do header
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
    color: "#7F7F7F",
  },
  chartContainer: {
    marginTop: 20,
    backgroundColor: "#f0f0f0", // Cor de fundo do container
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  legendContainer: {
    marginTop: 20,
    flexDirection: "column",
    alignItems: "center",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  legendColor: {
    width: 16,
    height: 16,
    marginRight: 10,
    borderRadius: 8,
  },
  legendText: {
    fontSize: 16,
    color: "#333",
  },
});
