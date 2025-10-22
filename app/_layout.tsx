import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { Provider } from "react-redux";
import { store } from "@/store";

export default function RootLayoutNav() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <SafeAreaView style={styles.container}>
          <Stack screenOptions={{ headerShown: false }} />
        </SafeAreaView>
      </Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
