import { Text, View } from "react-native";
import useEditEmployee from "./useEditEmployee";
import TextInput from "@/components/TextInput";
import Button from "@/components/Button";

export default function EditEmployee() {
  const { actions, states } = useEditEmployee();
  return (
    <View style={{ flex: 1, backgroundColor: "white", padding: 16 }}>
      <Text
        style={{
          marginBottom: 16,
          fontSize: 20,
          fontWeight: "bold",
          color: "gray",
        }}
      >
        Update Employee
      </Text>
      <View style={{ gap: 12, marginBottom: 12 }}>
        <TextInput
          value={states.fullName}
          onChangeText={actions.onChangeName}
          placeholder="Full Name"
        />
        <TextInput
          value={states.salary}
          onChangeText={actions.onChangeSalary}
          placeholder="salary"
        />
        <TextInput
          value={states.age}
          onChangeText={actions.onChangeAge}
          placeholder="Age"
        />
      </View>

      <Text
        style={{
          opacity: states.error !== "" ? 1 : 0,
          fontSize: 16,
          fontWeight: "bold",
          color: "red",
          marginBottom: 12,
        }}
      >
        {states.error}
      </Text>
      <View style={{ flexDirection: "row", gap: 12 }}>
        <Button title="Submit" onPress={actions.onSubmit} />
        <Button title="Cancel" onPress={actions.onCancel} type="secondary" />
      </View>
    </View>
  );
}
