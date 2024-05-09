import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Calendar from "expo-calendar";
import * as Localization from "expo-localization";
import { Linking, Platform } from "react-native";

export const useCalendar = (
  title: string,
  color: string,
  storeName: string
) => {
  const _getDefaultCalendarSource = async () => {
    const defaultCalendar = await Calendar.getDefaultCalendarAsync();
    return defaultCalendar.source;
  };

  const _storeCalendar = async (storeName: string, calendarId: string) => {
    try {
      await AsyncStorage.setItem(storeName, calendarId);
    } catch (e) {}
  };

  const _getCalendarStored = async (storeName: string) => {
    try {
      const calendarStored = await AsyncStorage.getItem(storeName);
      console.log(calendarStored);
      if (calendarStored !== null) return calendarStored;
    } catch (e) {}
  };

  const openSettings = () => Linking.openSettings();

  const getPermission = async () => {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status === "granted") {
      const calendars = await Calendar.getCalendarsAsync(
        Calendar.EntityTypes.EVENT
      );
      return calendars;
    }
  };

  const createCalendar = async () => {
    const defaultCalendarSource =
      Platform.OS === "ios"
        ? await _getDefaultCalendarSource()
        : { isLocalAccount: true, name: storeName };

    const thereIsACalendar = await _getCalendarStored(storeName);

    if (!thereIsACalendar) {
      const newCalendarID = await Calendar.createCalendarAsync({
        title,
        color,
        entityType: Calendar.EntityTypes.EVENT,
        // @ts-ignore
        sourceId: defaultCalendarSource.id,
        source: defaultCalendarSource as any,
        name: storeName,
        ownerAccount: "personal",
        accessLevel: Calendar.CalendarAccessLevel.OWNER,
      });
      _storeCalendar(storeName, newCalendarID);
    }
  };

  const deleteCalendar = async () => {
    try {
      const calendarId = await _getCalendarStored(storeName);
      if (calendarId) {
        await Calendar.deleteCalendarAsync(calendarId);
        await AsyncStorage.removeItem(storeName);
      }
    } catch (e) {}
  };

  const addEventsToCalendar = async (
    eventTitle: string,
    eventStartDate: Date,
    eventEndDate: Date,
    descript?: string
  ) => {
    const thereIsACalendar = await _getCalendarStored(storeName);

    if (thereIsACalendar) {
      const event = {
        title: eventTitle,
        startDate: eventStartDate,
        endDate: eventEndDate,
        notes: descript || "",
        timeZone: Localization.timezone,
        alarms: [
          {
            relativeOffset: -1,
            method: Calendar.AlarmMethod.ALERT,
          },
        ],
      };

      try {
        await Calendar.createEventAsync(thereIsACalendar, event);
      } catch (e) {}
    }
  };

  const isThereEvents = async () => {
    const thereIsACalendar = await _getCalendarStored(storeName);
    let thereIs: Calendar.Event[] = [];
    if (thereIsACalendar) {
      thereIs = await Calendar.getEventsAsync(
        [thereIsACalendar],
        new Date(2021, 0),
        new Date(new Date().getFullYear() + 1, 0)
      );
    }
    return thereIs.length !== 0;
  };

  const getEvents = async () => {
    const thereIsACalendar = await _getCalendarStored(storeName);
    let thereIs: Calendar.Event[] = [];
    if (thereIsACalendar) {
      thereIs = await Calendar.getEventsAsync(
        [thereIsACalendar],
        new Date(2021, 0),
        new Date(new Date().getFullYear() + 1, 0)
      );
    }
    return thereIs;
  };

  const getCalendarId = async () => {
    return await _getCalendarStored(storeName);
  };

  return {
    addEventsToCalendar,
    createCalendar,
    deleteCalendar,
    getCalendarId,
    getEvents,
    getPermission,
    isThereEvents,
    openSettings,
  };
};
