import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import useHome from "./useHome";
import ListItem from "@/components/ListItem";
import Button from "@/components/Button";
import DeleteModal from "@/components/DeleteModal";

export default function Home() {
  const { actions, states } = useHome();
  return (
    <View style={styles.container}>
      <Button
        title="Add employee"
        onPress={actions.goToAddEmployee}
        customStyle={{
          marginTop: 16,
          marginLeft: 16,
        }}
      />

      <Text style={styles.employeeListText}>Employee Lists:</Text>

      {states.loading && (
        <ActivityIndicator size={50} color="blue" style={{ marginTop: 12 }} />
      )}

      {!states.loading && states.error && (
        <View style={styles.reloadWrapper}>
          <Text>Please try again in a few seconds</Text>
          <Button
            title="Reload"
            onPress={actions.reload}
            customStyle={{ alignSelf: "center" }}
          />
        </View>
      )}

      {!states.loading && !states.error && (
        <FlatList
          data={states.employees}
          renderItem={({ item }) => (
            <ListItem
              data={item}
              onDelete={() => actions.onPressDelete(item)}
              onEdit={() => actions.goToEditEmployee(item)}
            />
          )}
          contentContainerStyle={styles.flatListContent}
        />
      )}

      <DeleteModal
        visible={states.deletionModalVisible}
        onAgree={actions.onAgreeToDelete}
        onDisagree={actions.onDisagreeToDelete}
        employeeName={states.selectedEmployee?.employee_name ?? ""}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  employeeListText: {
    marginTop: 16,
    marginLeft: 16,
  },
  reloadWrapper: {
    marginTop: 24,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  flatListContent: {
    marginTop: 8,
    paddingHorizontal: 16,
    gap: 12,
    paddingBottom: 18,
  },
});
