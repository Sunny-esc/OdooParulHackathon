import { useEffect, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Input,
  NativeSelect,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";

import { getActivities } from "../services/mockData";
import { useColorModeValue } from "../components/ui/color-mode";

const activityTypes = [
  { label: "All", value: "" },
  { label: "Adventure", value: "Adventure" },
  { label: "Culture", value: "Culture" },
  { label: "Relaxation", value: "Relaxation" },
];

const ActivitySearch = () => {
  const [activities, setActivities] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    getActivities().then(setActivities);
  }, []);

  const filteredActivities = activities.filter((activity) => {
    const matchesQuery =
      activity.title.toLowerCase().includes(query.toLowerCase()) ||
      activity.description.toLowerCase().includes(query.toLowerCase());

    const matchesCategory = category
      ? activity.category === category
      : true;

    return matchesQuery && matchesCategory;
  });

  const pageBg = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const mutedText = useColorModeValue("gray.600", "gray.300");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box minH="100vh" bg={pageBg} p={{ base: 4, md: 8 }}>
      <Stack gap={8}>
        <Box>
          <Heading size="lg" mb={2}>
            Activity Search
          </Heading>

          <Text color={mutedText} maxW="3xl">
            Find curated experiences, guided tours, and premium
            activities to enrich your next itinerary.
          </Text>
        </Box>

        <Flex
          direction={{ base: "column", md: "row" }}
          gap={4}
          align="center"
        >
          <Input
            placeholder="Search activities"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            bg={cardBg}
          />

          <NativeSelect.Root maxW={{ base: "100%", md: "240px" }}>
            <NativeSelect.Field
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              bg={cardBg}
            >
              {activityTypes.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </NativeSelect.Field>

            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Flex>

        <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={6}>
          {filteredActivities.map((activity) => (
            <Box
              key={activity.id}
              bg={cardBg}
              rounded="3xl"
              p={6}
              shadow="sm"
              borderWidth="1px"
              borderColor={borderColor}
              transition="all 0.2s"
              _hover={{
                transform: "translateY(-3px)",
                shadow: "xl",
              }}
            >
              <Flex justify="space-between" align="center" mb={4}>
                <Heading size="md">
                  {activity.title}
                </Heading>

                <Badge colorPalette="teal">
                  {activity.category}
                </Badge>
              </Flex>

              <Text
                fontSize="sm"
                color={mutedText}
                mb={4}
              >
                {activity.description}
              </Text>

              <Flex justify="space-between" mb={3}>
                <Text fontWeight="semibold">
                  Duration
                </Text>

                <Text>{activity.duration}</Text>
              </Flex>

              <Flex justify="space-between" mb={5}>
                <Text fontWeight="semibold">
                  Cost
                </Text>

                <Text>{activity.cost}</Text>
              </Flex>

              <Button colorPalette="blue" w="full">
                Add to itinerary
              </Button>
            </Box>
          ))}
        </SimpleGrid>
      </Stack>
    </Box>
  );
};

export default ActivitySearch;