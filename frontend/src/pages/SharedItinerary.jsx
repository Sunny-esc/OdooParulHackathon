import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  Badge,
} from "@chakra-ui/react";
import { useColorModeValue } from "../components/ui/color-mode";
import { getSharedItinerary } from "../services/mockData";

const SharedItinerary = () => {
  const [itinerary, setItinerary] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    getSharedItinerary().then(setItinerary);
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText("https://traveloop.app/share/savvy-bali-retreat");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  if (!itinerary) return <Text p={8}>Loading shared itinerary...</Text>;

  return (
    <Box p={{ base: 4, md: 8 }}>
      <Stack spacing={6}>
        <Box>
          <Heading size="lg">Shared itinerary</Heading>
          <Text color={useColorModeValue("gray.600", "gray.300")}>This view is read-only for shared trips. Copy the link or preview the itinerary details.</Text>
        </Box>
        {copied && (
          <Alert.Root status="success" rounded="2xl">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Description>Shared itinerary link copied to clipboard.</Alert.Description>
            </Alert.Content>
          </Alert.Root>
        )}
        <Box bg={useColorModeValue("white", "gray.700")} rounded="3xl" p={6} shadow="sm">
          <Flex justify="space-between" align="center" mb={4}>
            <Box>
              <Heading size="lg">{itinerary.title}</Heading>
              <Text mt={2}>{itinerary.description}</Text>
            </Box>
            <Button colorScheme="blue" onClick={handleCopy}>Copy itinerary</Button>
          </Flex>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
            {itinerary.days.map((day) => (
              <Box key={day.id} bg={useColorModeValue("gray.50", "gray.800")} rounded="2xl" p={4} borderWidth="1px" borderColor={useColorModeValue("gray.200", "gray.600")}> 
                <Flex justify="space-between" mb={3}>
                  <Heading size="sm">{day.day}</Heading>
                  <Badge colorScheme="purple">{day.city}</Badge>
                </Flex>
                <Text mb={2}>{day.highlights.join(" • ")}</Text>
                <Text fontSize="sm" mb={2} color={useColorModeValue("gray.600", "gray.400")}>Budget: {day.budget}</Text>
                <Text fontSize="sm">{day.notes}</Text>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Stack>
    </Box>
  );
};

export default SharedItinerary;
