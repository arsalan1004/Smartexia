import { StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ON_BOARDING_TEXT } from "./src/constants/colors";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";

import OnBoarding from "./src/screens/onboarding/OnBoarding";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/screens/loggedOutStack/Login";
import Registration from "./src/screens/loggedOutStack/Registration";
import { NavigationContainer } from "@react-navigation/native";

SplashScreen.preventAutoHideAsync();

type OnBoardingCompleteType = "true" | "false";

const Stack = createNativeStackNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [dotSelected, setDotSelected] = useState(1);
  const [onBoardingComplete, setOnBoardingComplete] =
    useState<OnBoardingCompleteType>("false");

  useEffect(() => {
    const prepare = async () => {
      try {
        // load onBoardingComplete from AsyncStorage
        const isOnBoardingComplete: OnBoardingCompleteType | null =
          (await AsyncStorage.getItem(
            "@onBoardingComplete"
          )) as OnBoardingCompleteType | null;

        if (onBoardingComplete !== null) {
          //setOnBoardingComplete(isOnBoardingComplete!);
          setOnBoardingComplete("false");
        } else {
          setOnBoardingComplete("false");
        }

        await new Promise((resolve) => setTimeout(resolve, 500));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    };
    prepare();
  }, []);

  useEffect(() => {}, [onBoardingComplete]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  const incrementDotSelected = () => {
    setDotSelected((ds) => ds + 1);
  };

  const compeleteOnBoarding = () => {
    console.log("@onboarding complete!");
    AsyncStorage.setItem("@onBoardingComplete", "true");
    setOnBoardingComplete("true");
    // Save something in Async Storage Which would then be checked on app starts if it is present then onboarding will be skipped
  };

  const LoggedOutStack = () => {
    return (
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="registration" component={Registration} />
      </Stack.Navigator>
    );
  };

  console.log("hello");

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      {onBoardingComplete === "false" ? (
        <OnBoarding
          {...(dotSelected === 1
            ? ON_BOARDING_TEXT.welcome
            : ON_BOARDING_TEXT.shopping)}
          dotSelected={dotSelected}
          buttonAction={
            dotSelected === 2 ? compeleteOnBoarding : incrementDotSelected
          }
        />
      ) : (
        <LoggedOutStack />
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
