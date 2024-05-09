import { Accelerometer } from "expo-sensors";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export function PedometerScreen() {
  const [passos, setPassos] = useState<number>(0);

  useEffect(() => {
    const verificaPermissao = async () => {
      const { status } = await Accelerometer.getPermissionsAsync();
      if (status !== "granted") {
        alert("Permissão para acessar os sensores não concedida");
      }
    };

    const contarPassos = async () => {
      await verificaPermissao();
      Accelerometer.setUpdateInterval(1000); // Define o intervalo de atualização para 1 segundo
      Accelerometer.addListener(({ x, y, z }) => {
        const magnitude = Math.sqrt(x * x + y * y + z * z);
        if (magnitude > 1.1) {
          setPassos((prevPassos) => prevPassos + 1);
        }
      });
    };

    contarPassos();

    return () => {
      Accelerometer.removeAllListeners();
    };
  }, []);

  return (
    <View>
      <Text>Número de Passos: {passos}</Text>
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
