import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  Badge,
  Tabs,
} from "@chakra-ui/react";
import { useColorModeValue } from "../components/ui/color-mode";
import { getItineraryData } from "../services/mockData";

const ItineraryView = () => {
  const [itinerary, setItinerary] = useState([]);

  useEffect(() => {
    getItineraryData().then(setItinerary);
  }, []);

  return (
    <Box p={{ base: 4, md: 8 }}>
      <Stack spacing={6}>
        <Box>
          <Heading size="lg">Itinerary overview</Heading>
          <Text color={useColorModeValue("gray.600", "gray.300")}>Browse the read-only view of your itinerary, organized by day and city.</Text>
        </Box>

        <Box bg={useColorModeValue("white", "gray.700")} rounded="3xl" p={6} shadow="sm">
          <Tabs.Root defaultValue="timeline" colorScheme="blue">
            <Tabs.List>
              <Tabs.Trigger value="timeline">Timeline</Tabs.Trigger>
              <Tabs.Trigger value="list">List</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="timeline">
              <Stack spacing={5}>
                {itinerary.map((day) => (
                  <Box key={day.id} p={5} bg={useColorModeValue("gray.50", "gray.800")} rounded="2xl" borderWidth="1px" borderColor={useColorModeValue("gray.200", "gray.600")}>
                    <Flex justify="space-between" align="center" mb={3}>
                      <Heading size="sm">{day.day}</Heading>
                      <Badge colorScheme="purple">{day.city}</Badge>
                    </Flex>
                    <Text mb={2}>{day.highlights.join(" • ")}</Text>
                    <Text fontSize="sm" mb={2} color={useColorModeValue("gray.600", "gray.400")}>Activities: {day.activities.join(", ")}</Text>
                    <Text fontWeight="semibold">Daily budget: {day.budget}</Text>
                  </Box>
                ))}
              </Stack>
            </Tabs.Content>
            <Tabs.Content value="list">
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={5}>
                {itinerary.map((day) => (
                  <Box key={day.id} p={5} bg={useColorModeValue("gray.50", "gray.800")} rounded="2xl" borderWidth="1px" borderColor={useColorModeValue("gray.200", "gray.600")}>
                    <Heading size="sm" mb={2}>{day.day}</Heading>
                    <Text fontSize="sm" color={useColorModeValue("gray.600", "gray.400")}>{day.city}</Text>
                    <Text mb={3}>{day.notes}</Text>
                    <Button size="sm" variant="outline">View details</Button>
                  </Box>
                ))}
              </SimpleGrid>
            </Tabs.Content>
          </Tabs.Root>
        </Box>
      </Stack>
    </Box>
  );
};

export default ItineraryView;
