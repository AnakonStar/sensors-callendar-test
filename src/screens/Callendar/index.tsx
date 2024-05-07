import useCalendar from "@atiladev/usecalendar";
import * as Calendar from "expo-calendar";
import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export function CalendarScreen() {
  const [eventId, setEventId] = useState<string>("");

  const {
    addEventsToCalendar,
    createCalendar,
    deleteCalendar,
    getCalendarId,
    getEvents,
    getPermission,
    isThereEvents,
    openSettings,
  } = useCalendar("Eventos", "#BADA55", "Marcadores");
  // Arrumar para aparecer o titulo na agenda conforme o que eu escolher

  const createCalAndEvent = async () => {
    const granted = await getPermission();
    await createCalendar();

    if (granted) {
      try {
        await addEventsToCalendar(
          "Reunião",
          new Date("2024-05-08T11:26:00.000-03:00"),
          new Date("2024-05-08T11:27:00.000-03:00")
        );
        console.log("Sucess");
      } catch (e) {
        console.error("Falha");
      }
    }
  };

  const removeCalendar = () => deleteCalendar();

  async function openEvent() {
    try {
      Calendar.openEventInCalendar(eventId);
    } catch (error) {
      console.error("Não foi possivel abrir evento", error);
    }
  }

  return (
    <View style={styles.container}>
      <Text>Calendar Module Example</Text>
      <Button title="Create event" onPress={createCalAndEvent} />
      <Button title="Open" onPress={removeCalendar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
