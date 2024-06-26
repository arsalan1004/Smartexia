import { StatusBar, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS, ON_BOARDING_TEXT } from "./src/constants/colors";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useContext, useEffect, useState } from "react";

import OnBoarding from "./src/screens/onboarding/OnBoarding";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/screens/loggedOutStack/Login";
import Registration from "./src/screens/loggedOutStack/Registration";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import store from "./store";
import LoginContext, { LoginProvider } from "./src/context/LoginContext";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./src/screens/loggedInStack/Home";

SplashScreen.preventAutoHideAsync();

type OnBoardingCompleteType = "true" | "false";

export type RootLoggedOutStackParamList = {
  login: { onLoginComplete: () => void };
  registration: undefined;
};

export type RootLoggedInStackParamList = {
  home: undefined;
};

const loggedOutStack =
  createNativeStackNavigator<RootLoggedOutStackParamList>();

const loggedInStack = createBottomTabNavigator();

function App() {
  // const [fontsLoaded, fontError] = useFonts({
  //   oxygen: require("./assets/fonts/oxygen.ttf"),
  // });

  const [appIsReady, setAppIsReady] = useState(false);
  const [dotSelected, setDotSelected] = useState(1);
  const [onBoardingComplete, setOnBoardingComplete] =
    useState<OnBoardingCompleteType>("false");
  const { isLoggedIn, updateIsLoggedIn } = useContext(LoginContext);

  useEffect(() => {
    const prepare = async () => {
      try {
        // load onBoardingComplete from AsyncStorage

        const isUserLoggedIn = await AsyncStorage.getItem("@isLoggedIn");

        if (isUserLoggedIn !== null) {
          console.log("User is Logged In");
          updateIsLoggedIn(true);
          setOnBoardingComplete("true");
          console.log(isUserLoggedIn);
        } else {
          console.log("User is not Logged In");
        }

        const isOnBoardingComplete: OnBoardingCompleteType | null =
          (await AsyncStorage.getItem(
            "@onBoardingComplete"
          )) as OnBoardingCompleteType | null;

        if (onBoardingComplete !== null) {
          setOnBoardingComplete(isOnBoardingComplete!);
          // setOnBoardingComplete("false");
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
  useEffect(() => {
    console.log("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);
  //useEffect(() => {}, [onBoardingComplete]);

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
      <loggedOutStack.Navigator
        initialRouteName="login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <loggedOutStack.Screen name="login" component={Login as any} />
        <loggedOutStack.Screen name="registration" component={Registration} />
      </loggedOutStack.Navigator>
    );
  };
  const LoggedInStack = () => {
    return (
      <loggedInStack.Navigator>
        <loggedInStack.Screen name="home" component={Home} />
      </loggedInStack.Navigator>
    );
  };

  console.log("hello");

  console.log("isLoggedIn in App", isLoggedIn);
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bgPrimary} />
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
        ) : isLoggedIn ? (
          <LoggedInStack />
        ) : (
          <LoggedOutStack />
        )}
      </NavigationContainer>
    </>
  );
}

export default function Main() {
  return (
    <LoginProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </LoginProvider>
  );
}

const styles = StyleSheet.create({});
