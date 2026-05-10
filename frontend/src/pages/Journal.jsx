import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Field,
  Heading,
  Input,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useColorModeValue } from "../components/ui/color-mode";
import { getJournalNotes } from "../services/mockData";

const Journal = () => {
  const [entries, setEntries] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [newDay, setNewDay] = useState("");

  useEffect(() => {
    getJournalNotes().then(setEntries);
  }, []);

  const addEntry = () => {
    if (!newNote || !newDay) return;
    setEntries((prev) => [
      { id: Date.now(), day: newDay, timestamp: new Date().toLocaleDateString(), note: newNote },
      ...prev,
    ]);
    setNewNote("");
    setNewDay("");
  };

  const deleteEntry = (id) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  return (
    <Box p={{ base: 4, md: 8 }}>
      <Stack spacing={6}>
        <Box>
          <Heading size="lg">Trip journal</Heading>
          <Text color={useColorModeValue("gray.600", "gray.300")}>Capture your travel memories and day-wise reflections.</Text>
        </Box>

        <Box bg={useColorModeValue("white", "gray.700")} rounded="3xl" p={6} shadow="sm">
          <Stack spacing={4}>
            <Field.Root>
              <Field.Label>Day</Field.Label>
              <Input value={newDay} onChange={(e) => setNewDay(e.target.value)} placeholder="Day 1" />
            </Field.Root>
            <Field.Root>
              <Field.Label>Note</Field.Label>
              <Textarea value={newNote} onChange={(e) => setNewNote(e.target.value)} minH="140px" placeholder="Write your travel journal entry" />
            </Field.Root>
            <Button colorScheme="blue" onClick={addEntry}>Add note</Button>
          </Stack>
        </Box>

        <Stack spacing={4}>
          {entries.map((entry) => (
            <Box key={entry.id} bg={useColorModeValue("white", "gray.700")} rounded="3xl" p={6} shadow="sm">
              <Flex justify="space-between" align="flex-start" mb={3}>
                <Box>
                  <Heading size="md">{entry.day}</Heading>
                  <Text color={useColorModeValue("gray.500", "gray.400")}>{entry.timestamp}</Text>
                </Box>
                <Button size="sm" variant="ghost" colorScheme="red" onClick={() => deleteEntry(entry.id)}>Delete</Button>
              </Flex>
              <Text>{entry.note}</Text>
            </Box>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
};

export default Journal;
