import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Alert,
} from "react-native";
import { styles } from "./styles";

import { Participant } from "../../components/Participant";
import { useState } from "react";

export function Home() {
  const [participants, setParticipants] = useState<string[]>([]);
  const [participantName, setParticipantName] = useState("");

  function handleParticipantAdd() {
    if (participants.includes(participantName)) {
      return Alert.alert(
        `Participante Existente`,
        ` O participante ${participantName} já está na lista de presença!`
      );
    }

    setParticipants((prev) => [...prev, participantName]);
    setParticipantName("");
  }

  function handleParticipantRemove(name: String) {
    return Alert.alert(
      "Remover Participante",
      `Deseja remover ${name} da lista?, `,
      [
        {
          text: "Sim",
          onPress: () => {
            setParticipants((prev) =>
              prev.filter((participant) => participant !== name)
            );
            Alert.alert("Deletado");
          },
        },
        {
          text: "Não",
          style: "cancel",
          onPress: () => Alert.alert("Cancelado"),
        },
      ]
    );
  }

  function handleState(value: string) {
    setParticipantName(value);
    console.log(value);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Nome do evento</Text>
      <Text style={styles.eventDate}>Quinta, 25 de julho de 2024</Text>

      <View style={styles.form}>
        <TextInput
          placeholder="Nome do Participante"
          placeholderTextColor={"#6B6B6B"}
          style={styles.input}
          onChangeText={handleState}
          value={participantName}
        />

        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.textButton}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={participants}
        keyExtractor={(item) => item}
        renderItem={({ item, index }) => (
          <Participant
            key={index}
            participantName={item}
            onRemove={() => handleParticipantRemove(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Ninguém chegou no evento ainda?{"\n"} Adicione participante a sua
            lista de presença.
          </Text>
        )}
      />
    </View>
  );
}
