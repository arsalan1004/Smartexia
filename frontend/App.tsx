import { StatusBar, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS, ON_BOARDING_TEXT } from "./src/constants/colors";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";

import OnBoarding from "./src/screens/onboarding/OnBoarding";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/screens/loggedOutStack/Login";
import Registration from "./src/screens/loggedOutStack/Registration";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import store from "./store";

SplashScreen.preventAutoHideAsync();

type OnBoardingCompleteType = "true" | "false";

const Stack = createNativeStackNavigator();

export default function App() {
  // const [fontsLoaded, fontError] = useFonts({
  //   oxygen: require("./assets/fonts/oxygen.ttf"),
  // });

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
          setOnBoardingComplete(isOnBoardingComplete!);
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

  // useEffect(() => {
  //   console.log("Fonts Loaded: ", fontsLoaded);
  //   console.log("Fonts Error: ", fontError);
  // }, [fontsLoaded, fontError]);

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

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: COLORS.bgPrimary,
    },
  };

  const LoggedOutStack = () => {
    return (
      <Stack.Navigator
        initialRouteName="login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="registration" component={Registration} />
      </Stack.Navigator>
    );
  };

  console.log("hello");

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bgPrimary} />
      <Provider store={store}>
        <NavigationContainer onReady={onLayoutRootView} theme={navTheme}>
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
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({});
