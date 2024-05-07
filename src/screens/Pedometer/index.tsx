import * as Location from "expo-location";
import { Pedometer } from "expo-sensors";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export function PedometerScreen() {
  const [isPedometerAvailable, setIsPedometerAvailable] =
    useState<string>("checking");
  const [currentStepCount, setCurrentStepCount] = useState<number>(0);

  const subscribe = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      const isAvailable = await Pedometer.isAvailableAsync();
      setIsPedometerAvailable(String(isAvailable));

      if (isAvailable) {
        return Pedometer.watchStepCount((result) => {
          setCurrentStepCount(result.steps || 0);
        });
      }
    } else {
      console.log("Permissão de localização negada");
    }
  };

  useEffect(() => {
    subscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Pedometer.isAvailableAsync(): {isPedometerAvailable}</Text>
      <Text>Walk! And watch this go up: {currentStepCount}</Text>
      <Button title="Request Location Permission" onPress={subscribe} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
  },
});
