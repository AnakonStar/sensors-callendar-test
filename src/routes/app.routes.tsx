import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { CalendarScreen, PedometerScreen } from "../screens";

type ScreensProps = {
  Pedometer: undefined;
  Calendar: undefined;
};

export type AppNavigationProps = BottomTabNavigationProp<ScreensProps>;

const { Screen, Navigator } = createBottomTabNavigator<ScreensProps>();

export function AppRoutes() {
  return (
    <Navigator initialRouteName="Pedometer">
      <Screen component={PedometerScreen} name="Pedometer" />
      <Screen component={CalendarScreen} name="Calendar" />
    </Navigator>
  );
}
