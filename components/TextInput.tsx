import React, { memo } from "react";
import { TextInput as RNTextInput } from "react-native";

interface ButtonProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
}

const TextInput: React.FC<ButtonProps> = ({
  value,
  onChangeText,
  placeholder,
}) => {
  return (
    <RNTextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      style={{
        paddingVertical: 12,
        paddingHorizontal: 8,
        borderRadius: 6,
        borderColor: "gray",
        borderWidth: 0.5,
        fontSize: 16,
      }}
      placeholderTextColor="gray"
    />
  );
};

export default memo(TextInput);
