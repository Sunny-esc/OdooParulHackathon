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
  Card,
  Icon,
  VStack,
  AspectRatio,
} from "@chakra-ui/react";
import { useColorModeValue } from "../components/ui/color-mode";
import { FiChevronUp, FiChevronDown, FiPlus, FiMapPin, FiCalendar, FiDollarSign, FiEdit } from "react-icons/fi";
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

  const pageBg = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const mutedText = useColorModeValue("gray.600", "gray.300");
  const accentBg = useColorModeValue("gray.100", "gray.700");

  return (
    <Box minH="100vh" bg={pageBg}>
      <Stack spacing={12}>
        <Box textAlign="center" py={12}>
          <Heading size="2xl" mb={4} color="blue.600">
            Build Your Itinerary
          </Heading>
          <Text fontSize="xl" color={mutedText} maxW="2xl" mx="auto">
            Craft each day with stops, city additions, and activity assignments for the perfect travel experience.
          </Text>
        </Box>

        <Grid templateColumns={{ base: "1fr", lg: "1.4fr 0.6fr" }} gap={8} mx={{ base: 4, md: 0 }}>
          {/* Main Itinerary Timeline */}
          <Box>
            <Flex justify="space-between" align="center" mb={8}>
              <Heading size="lg">Daily roadmap</Heading>
              <Button leftIcon={<FiPlus />} colorScheme="blue" size="lg" borderRadius="xl" onClick={addStop}>
                Add stop
              </Button>
            </Flex>

            <VStack spacing={6} align="stretch">
              {itinerary.map((day, index) => (
                <Card.Root
                  key={day.id}
                  bg={cardBg}
                  shadow="sm"
                  borderRadius="2xl"
                  overflow="hidden"
                  transition="all 0.3s"
                  _hover={{ transform: "translateY(-4px)", shadow: "xl" }}
                >
                  <Card.Body p={6}>
                    <Flex justify="space-between" align="start" mb={6}>
                      <Box>
                        <Flex align="center" gap={3} mb={2}>
                          <Box bg="blue.100" p={2} rounded="xl">
                            <Icon as={FiCalendar} color="blue.600" boxSize={5} />
                          </Box>
                          <Heading size="lg" color="blue.600">{day.day}</Heading>
                        </Flex>
                        <HStack spacing={2}>
                          <Icon as={FiMapPin} color={mutedText} boxSize={4} />
                          <Text fontSize="lg" fontWeight="semibold">{day.city}</Text>
                        </HStack>
                      </Box>
                      <VStack spacing={2}>
                        <IconButton
                          size="sm"
                          icon={<FiChevronUp />}
                          aria-label="Move up"
                          onClick={() => moveDay(index, -1)}
                          variant="ghost"
                          isDisabled={index === 0}
                        />
                        <IconButton
                          size="sm"
                          icon={<FiChevronDown />}
                          aria-label="Move down"
                          onClick={() => moveDay(index, 1)}
                          variant="ghost"
                          isDisabled={index === itinerary.length - 1}
                        />
                      </VStack>
                    </Flex>

                    <VStack spacing={4} align="stretch">
                      <Box>
                        <Text fontSize="sm" color={mutedText} mb={2}>Highlights</Text>
                        <Flex gap={2} wrap="wrap">
                          {day.highlights.map((highlight, idx) => (
                            <Badge key={idx} colorScheme="teal" variant="subtle" px={3} py={1}>
                              {highlight}
                            </Badge>
                          ))}
                        </Flex>
                      </Box>

                      <Box>
                        <Text fontSize="sm" color={mutedText} mb={2}>Activities</Text>
                        <Text fontSize="md">
                          {day.activities.join(", ") || "No activities assigned yet"}
                        </Text>
                      </Box>

                      <HStack spacing={4}>
                        <HStack spacing={2}>
                          <Icon as={FiDollarSign} color="green.600" boxSize={4} />
                          <Text fontWeight="semibold" color="green.600">
                            Budget: {day.budget}
                          </Text>
                        </HStack>
                      </HStack>

                      <Box>
                        <Flex align="center" gap={2} mb={3}>
                          <Icon as={FiEdit} color={mutedText} boxSize={4} />
                          <Text fontSize="sm" color={mutedText}>Day notes</Text>
                        </Flex>
                        <Textarea
                          value={day.notes}
                          minH="120px"
                          onChange={(e) => updateDayNotes(day.id, e.target.value)}
                          placeholder="Add notes for this day..."
                          bg={accentBg}
                          border="none"
                          _focus={{ bg: useColorModeValue("white", "gray.600") }}
                          borderRadius="xl"
                        />
                      </Box>
                    </VStack>
                  </Card.Body>
                </Card.Root>
              ))}
            </VStack>
          </Box>

          {/* Sidebar */}
          <VStack spacing={6} align="stretch">
            {/* Add City/Stop Card */}
            <Card.Root bg={cardBg} shadow="sm" borderRadius="2xl">
              <Card.Body p={6}>
                <Heading size="lg" mb={6}>Add city / stop</Heading>
                <VStack spacing={4} align="stretch">
                  <Field.Root>
                    <Field.Label fontSize="sm" fontWeight="semibold">City name</Field.Label>
                    <Input
                      value={newCity}
                      onChange={(e) => setNewCity(e.target.value)}
                      placeholder="e.g. Santorini"
                      bg={accentBg}
                      border="none"
                      _focus={{ bg: useColorModeValue("white", "gray.600") }}
                      borderRadius="xl"
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label fontSize="sm" fontWeight="semibold">Stop description</Field.Label>
                    <Input
                      value={newStop}
                      onChange={(e) => setNewStop(e.target.value)}
                      placeholder="e.g. Sunset dinner"
                      bg={accentBg}
                      border="none"
                      _focus={{ bg: useColorModeValue("white", "gray.600") }}
                      borderRadius="xl"
                    />
                  </Field.Root>
                  <Button colorScheme="blue" size="lg" borderRadius="xl" onClick={addStop}>
                    Add to itinerary
                  </Button>
                </VStack>
              </Card.Body>
            </Card.Root>

            {/* Budget Indicators Card */}
            <Card.Root bg={cardBg} shadow="sm" borderRadius="2xl">
              <Card.Body p={6}>
                <Heading size="lg" mb={6}>Budget indicators</Heading>
                <VStack spacing={4} align="stretch">
                  <Box bg={accentBg} p={5} rounded="xl">
                    <Flex align="center" gap={3} mb={2}>
                      <Box bg="green.100" p={2} rounded="xl">
                        <Icon as={FiDollarSign} color="green.600" boxSize={5} />
                      </Box>
                      <Box>
                        <Text fontSize="sm" color={mutedText}>Weekly target</Text>
                        <Text fontSize="2xl" fontWeight="bold" color="green.600">$1,860</Text>
                      </Box>
                    </Flex>
                  </Box>
                  <Box bg={accentBg} p={5} rounded="xl">
                    <Flex align="center" gap={3} mb={2}>
                      <Box bg="blue.100" p={2} rounded="xl">
                        <Icon as={FiCalendar} color="blue.600" boxSize={5} />
                      </Box>
                      <Box>
                        <Text fontSize="sm" color={mutedText}>Estimated day spend</Text>
                        <Text fontSize="2xl" fontWeight="bold" color="blue.600">$245</Text>
                      </Box>
                    </Flex>
                  </Box>
                </VStack>
              </Card.Body>
            </Card.Root>
          </VStack>
        </Grid>
      </Stack>
    </Box>
  );
};

export default ItineraryBuilder;
