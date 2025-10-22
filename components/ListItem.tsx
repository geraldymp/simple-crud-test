import { IEmployee } from "@/types/IEmployee";
import React, { memo } from "react";
import { Text, View, StyleSheet } from "react-native";
import Button from "./Button";

interface ListItemProps {
  data: IEmployee;
  onEdit: () => void;
  onDelete: () => void;
}

const ListItem: React.FC<ListItemProps> = ({ data, onEdit, onDelete }) => {
  return (
    <View style={styles.container}>
      <Text>{data.id}.</Text>
      <Text style={{ fontWeight: "bold" }}>{data.employee_name}</Text>
      <Text>employee age: {data.employee_age}</Text>
      <Text>employee salary: {data.employee_salary}</Text>
      <View style={styles.buttonsWrapper}>
        <Button title="Edit" onPress={onEdit} />
        <Button title="Delete" onPress={onDelete} type="secondary" />
      </View>
    </View>
  );
};

export default memo(ListItem);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderWidth: 0.1,
    borderRadius: 6,
    borderColor: "black",
    backgroundColor: "white",
    elevation: 5,
  },
  buttonsWrapper: {
    flexDirection: "row",
    marginTop: 8,
    gap: 8,
  },
});
