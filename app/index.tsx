import { Button, Text, TouchableOpacity, View } from "react-native";
import useIndex from "./useIndex";

export default function Starting() {
  const { actions, states } = useIndex();
  return (
    <View style={{ flex: 1, backgroundColor: "cyan" }}>
      <TouchableOpacity
        style={{
          paddingHorizontal: 6,
          paddingVertical: 4,
          backgroundColor: "green",
          alignSelf: "baseline",
        }}
      >
        <Text style={{ color: "white" }}>Add Employee</Text>
      </TouchableOpacity>
      <Text>Employee List</Text>
    </View>
  );
}
