import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useCalendar } from "../../components";
import { formaDate } from "../../utils/formatDate";

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
  } = useCalendar("Eventos", "#E47915", "Marcadores");
  // Arrumar para aparecer o titulo na agenda conforme o que eu escolher

  const createCalAndEvent = async () => {
    const granted = await getPermission();

    const dateString = "2024-04-09 13:30:00";

    const { start, end } = formaDate(dateString);

    await createCalendar();

    if (granted) {
      try {
        await addEventsToCalendar("Gus", start, end, "asdadasdasdasdasd");
        console.log("Sucess");
      } catch (e) {
        console.error("Falha");
      }
    }
  };

  const removeCalendar = () => deleteCalendar();

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
