import React, { memo } from "react";
import {
  StyleProp,
  Text,
  TouchableOpacity,
  ViewStyle,
  StyleSheet,
} from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  type?: "primary" | "secondary";
  customStyle?: StyleProp<ViewStyle>;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  type = "primary",
  customStyle,
}) => {
  const bgColor = type === "primary" ? "gray" : "tomato";
  return (
    <TouchableOpacity
      style={[{ backgroundColor: bgColor }, styles.container, customStyle]}
      onPress={onPress}
    >
      <Text style={{ color: "white" }}>{title}</Text>
    </TouchableOpacity>
  );
};

export default memo(Button);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignSelf: "baseline",
    borderRadius: 4,
  },
});
