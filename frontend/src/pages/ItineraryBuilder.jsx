import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Field,
  Grid,
  Heading,
  HStack,
  IconButton,
  Input,
  Stack,
  Text,
  Textarea,
  Badge,
  Separator,
} from "@chakra-ui/react";
import { useColorModeValue } from "../components/ui/color-mode";
import { FiChevronUp, FiChevronDown, FiPlus } from "react-icons/fi";
import { getItineraryData } from "../services/mockData";

const ItineraryBuilder = () => {
  const [itinerary, setItinerary] = useState([]);
  const [notes, setNotes] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newStop, setNewStop] = useState("");

  useEffect(() => {
    getItineraryData().then(setItinerary);
  }, []);

  const moveDay = (index, direction) => {
    const next = [...itinerary];
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setItinerary(next);
  };

  const addStop = () => {
    if (!newStop) return;
    setItinerary((prev) => [
      ...prev,
      { id: Date.now(), day: `Day ${prev.length + 1}`, city: newCity || "New city", highlights: [newStop], activities: [], budget: "$0", notes: "" },
    ]);
    setNewStop("");
    setNewCity("");
  };

  const updateDayNotes = (id, value) => {
    setItinerary((prev) => prev.map((item) => item.id === id ? { ...item, notes: value } : item));
  };

  return (
    <Box p={{ base: 4, md: 8 }}>
      <Stack spacing={8}>
        <Box>
          <Heading size="lg" mb={2}>Itinerary Builder</Heading>
          <Text color={useColorModeValue("gray.600", "gray.300")}>Craft each day with stops, city additions, and activity assignments.</Text>
        </Box>

        <Grid templateColumns={{ base: "1fr", lg: "1.4fr 0.6fr" }} gap={6}>
          <Box bg={useColorModeValue("white", "gray.700")} rounded="3xl" p={6} shadow="sm">
            <Flex justify="space-between" align="center" mb={6}>
              <Heading size="md">Daily roadmap</Heading>
              <Button leftIcon={<FiPlus />} size="sm" onClick={addStop}>Add stop</Button>
            </Flex>
            <Stack spacing={5}>
              {itinerary.map((day, index) => (
                <Box key={day.id} bg={useColorModeValue("gray.50", "gray.800")} rounded="2xl" p={5} borderWidth="1px" borderColor={useColorModeValue("gray.200", "gray.600")}>
                  <Flex justify="space-between" align="center" mb={4}>
                    <Box>
                      <Heading size="sm">{day.day}</Heading>
                      <Text fontSize="sm" color={useColorModeValue("gray.600", "gray.400")}>{day.city}</Text>
                    </Box>
                    <HStack spacing={2}>
                      <IconButton size="sm" icon={<FiChevronUp />} aria-label="Move up" onClick={() => moveDay(index, -1)} />
                      <IconButton size="sm" icon={<FiChevronDown />} aria-label="Move down" onClick={() => moveDay(index, 1)} />
                    </HStack>
                  </Flex>
                  <Stack spacing={3}>
                    <Flex gap={2} wrap="wrap">
                      {day.highlights.map((highlight, idx) => (
                        <Badge key={idx} colorScheme="teal">{highlight}</Badge>
                      ))}
                    </Flex>
                    <Text fontSize="sm">Activities: {day.activities.join(", ") || "No activities assigned yet"}</Text>
                    <Flex justify="space-between" align="center">
                      <Text fontWeight="bold">Budget target: {day.budget}</Text>
                      <Text fontSize="sm" color={useColorModeValue("gray.600", "gray.400")}>Notes</Text>
                    </Flex>
                    <Textarea value={day.notes} minH="120px" onChange={(e) => updateDayNotes(day.id, e.target.value)} placeholder="Add notes for this day" />
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Box>

          <Box bg={useColorModeValue("white", "gray.700")} rounded="3xl" p={6} shadow="sm">
            <Heading size="md" mb={4}>Add city / stop</Heading>
            <Stack spacing={4}>
              <Field.Root>
                <Field.Label>City name</Field.Label>
                <Input value={newCity} onChange={(e) => setNewCity(e.target.value)} placeholder="e.g. Santorini" />
              </Field.Root>
              <Field.Root>
                <Field.Label>Stop description</Field.Label>
                <Input value={newStop} onChange={(e) => setNewStop(e.target.value)} placeholder="e.g. Sunset dinner" />
              </Field.Root>
              <Button colorScheme="cyan" onClick={addStop}>Add to itinerary</Button>
            </Stack>
            <Separator my={6} />
            <Heading size="md" mb={4}>Budget indicators</Heading>
            <Stack spacing={3}>
              <Box rounded="2xl" bg={useColorModeValue("gray.50", "gray.800")} p={4}>
                <Text fontSize="sm" color={useColorModeValue("gray.500", "gray.400")}>Weekly target</Text>
                <Text fontWeight="bold" mt={2}>$1,860</Text>
              </Box>
              <Box rounded="2xl" bg={useColorModeValue("gray.50", "gray.800")} p={4}>
                <Text fontSize="sm" color={useColorModeValue("gray.500", "gray.400")}>Estimated day spend</Text>
                <Text fontWeight="bold" mt={2}>$245</Text>
              </Box>
            </Stack>
          </Box>
        </Grid>
      </Stack>
    </Box>
  );
};

export default ItineraryBuilder;
