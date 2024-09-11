import { View, Text, TouchableOpacity } from "react-native";

import { styles } from "./styles";

type ParticipantProps = {
  participantName: string;
  onRemove: () => void;
};

export function Participant({ participantName, onRemove }: ParticipantProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{participantName}</Text>
      <TouchableOpacity style={styles.button} onPress={onRemove}>
        <Text style={styles.textButton}>-</Text>
      </TouchableOpacity>
    </View>
  );
}
