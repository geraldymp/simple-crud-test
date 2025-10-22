import React from "react";
import { Modal, StyleSheet, Text, View } from "react-native";

interface DeleteConfirmationModalProps {
  visible: boolean;
  onAgree: () => void;
  onDisagree: () => void;
  employeeName: string;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  visible,
  onAgree,
  onDisagree,
  employeeName,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
            Would you like to delete employee named ({employeeName}) ?
          </Text>
          <Text>
            If you sure to delete this employee then click Agree button or if
            you are not willing to delete just click Disagree
          </Text>
          <View style={styles.buttonsWrapper}>
            <Text style={{ color: "tomato" }} onPress={onAgree}>
              Agree
            </Text>
            <Text style={{ color: "dodgerblue" }} onPress={onDisagree}>
              Disagree
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default React.memo(DeleteConfirmationModal);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    width: "80%",
    elevation: 3,
  },
  buttonsWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
  },
});
