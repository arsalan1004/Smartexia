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
import HomeTabs from "./src/navigation/HomeTabs";
import ProductGridScreen from "./src/screens/loggedInStack/ProductGridScreen";
import { ProductType } from "./src/features/products/HomeProductSlice";
import SearchProductGridScreen from "./src/screens/loggedInStack/homeTabs/SearchProductGridScreen";
import FilterScreen from "./src/screens/loggedInStack/FilterScreen";
import SubFilterScreen from "./src/screens/loggedInStack/SubFilterScreen";
import { Filters } from "./src/features/search/SearchProductSlice";

SplashScreen.preventAutoHideAsync();

type OnBoardingCompleteType = "true" | "false";

export type RootLoggedOutStackParamList = {
  login: undefined;
  registration: undefined;
};

export type RootLoggedInStackParamList = {
  homestack: undefined;
  productGridScreen: {
    listData?: ProductType[];
    title: string;
    categoryId?: string;
    // searchQuery?: string;
  };
  searchProductGridScreen: {
    title: string;
    searchQuery: string;
  };
  searchFilters: {
    searchQuery: string;
  };
  searchSubFilters: {
    title: keyof Filters;
  };
};

// export type RootHomeTabsParamList = {
//   home: undefined;
//   search: undefined;
//   orders: undefined;
//   more: undefined;
// };

const loggedOutStack =
  createNativeStackNavigator<RootLoggedOutStackParamList>();

const loggedInStack = createNativeStackNavigator<RootLoggedInStackParamList>();

//const HomeBottomTab = createBottomTabNavigator<RootHomeTabsParamList>();

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
        updateIsLoggedIn(false);
        if (isUserLoggedIn !== null) {
          console.log("User is Logged In");
          //updateIsLoggedIn(true);
          updateIsLoggedIn(false);
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

  // function HomeTabs() {
  //   return (
  //     <HomeBottomTab.Navigator>
  //       <HomeBottomTab.Screen name="home" component={Home} />
  //       <HomeBottomTab.Screen name="search" component={Search} />
  //       <HomeBottomTab.Screen name="orders" component={Cart} />
  //       <HomeBottomTab.Screen name="more" component={More} />
  //     </HomeBottomTab.Navigator>
  //   );
  // }

  const LoggedOutStack = () => {
    return (
      <loggedOutStack.Navigator
        initialRouteName="login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <loggedOutStack.Screen name="login" component={Login} />
        <loggedOutStack.Screen name="registration" component={Registration} />
      </loggedOutStack.Navigator>
    );
  };
  const LoggedInStack = () => {
    return (
      <loggedInStack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.bgPrimary,
            //borderBottomColor: COLORS.fgPrimary,
          },
          headerTintColor: COLORS.fgPrimary,
        }}
      >
        <loggedInStack.Screen
          name="homestack"
          component={HomeTabs}
          options={{ headerShown: false }}
        />
        <loggedInStack.Screen
          name="productGridScreen"
          component={ProductGridScreen}
          options={({ route }) => ({ title: route.params.title })}
        />
        <loggedInStack.Screen
          name="searchProductGridScreen"
          component={SearchProductGridScreen}
          options={({ route }) => ({ title: route.params.title })}
        />
        <loggedInStack.Screen
          name="searchFilters"
          component={FilterScreen}
          options={{ title: "Filter By" }}
        />
        <loggedInStack.Screen
          name="searchSubFilters"
          component={SubFilterScreen}
          options={({ route }) => ({ title: route.params.title })}
        />
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
        ) : true ? (
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
