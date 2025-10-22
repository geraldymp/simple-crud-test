import { Text, View, StyleSheet } from "react-native";
import useAddEmployee from "./useAddEmployee";
import TextInput from "@/components/TextInput";
import Button from "@/components/Button";

export default function AddEmployee() {
  const { actions, states } = useAddEmployee();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Employee</Text>

      <View style={styles.inputWrapper}>
        <TextInput
          value={states.fullName}
          onChangeText={actions.onChangeName}
          placeholder="Full Name"
        />
        <TextInput
          value={states.salary}
          onChangeText={actions.onChangeSalary}
          placeholder="Salary"
        />
        <TextInput
          value={states.age}
          onChangeText={actions.onChangeAge}
          placeholder="Age"
        />
      </View>

      <Text
        style={[styles.errorText, { opacity: states.error !== "" ? 1 : 0 }]}
      >
        {states.error}
      </Text>

      <View style={styles.buttonWrapper}>
        <Button title="Submit" onPress={actions.onSubmit} />
        <Button title="Cancel" onPress={actions.onCancel} type="secondary" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  title: {
    marginBottom: 16,
    fontSize: 20,
    fontWeight: "bold",
    color: "gray",
  },
  inputWrapper: {
    gap: 12,
    marginBottom: 12,
  },
  errorText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
    marginBottom: 12,
  },
  buttonWrapper: {
    flexDirection: "row",
    gap: 12,
  },
});
