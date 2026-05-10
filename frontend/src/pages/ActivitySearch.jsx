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
  Card,
  AspectRatio,
  Icon,
  HStack,
  VStack,
} from "@chakra-ui/react";

import { getActivities } from "../services/mockData";
import { useColorModeValue } from "../components/ui/color-mode";
import { FiSearch, FiClock, FiDollarSign, FiMapPin } from "react-icons/fi";

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
  const accentBg = useColorModeValue("gray.100", "gray.700");

  return (
    <Box minH="100vh" bg={pageBg}>
      <Stack spacing={12}>
        <Box textAlign="center" py={12}>
          <Heading size="2xl" mb={4} color="blue.600">
            Discover Experiences
          </Heading>
          <Text fontSize="xl" color={mutedText} maxW="2xl" mx="auto">
            Find curated activities, guided tours, and premium experiences to enrich your next itinerary.
          </Text>
        </Box>

        {/* Search and Filter Bar */}
        <Box mx={{ base: 4, md: 0 }}>
          <Card.Root bg={cardBg} shadow="sm" borderRadius="2xl" p={6}>
            <Flex
              direction={{ base: "column", md: "row" }}
              gap={4}
              align="center"
            >
              <Flex flex="1" gap={4} w="full">
                <Box flex="1" position="relative">
                  <Icon as={FiSearch} position="absolute" left={3} top="50%" transform="translateY(-50%)" color={mutedText} />
                  <Input
                    placeholder="Search activities..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    pl={10}
                    bg={useColorModeValue("gray.50", "gray.700")}
                    border="none"
                    _focus={{ bg: useColorModeValue("white", "gray.600") }}
                    size="lg"
                  />
                </Box>
                <NativeSelect.Root maxW={{ base: "100%", md: "240px" }}>
                  <NativeSelect.Field
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    bg={useColorModeValue("gray.50", "gray.700")}
                    border="none"
                    _focus={{ bg: useColorModeValue("white", "gray.600") }}
                    size="lg"
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
            </Flex>
          </Card.Root>
        </Box>

        {/* Activity Cards */}
        <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={8} mx={{ base: 4, md: 0 }}>
          {filteredActivities.map((activity) => (
            <Card.Root
              key={activity.id}
              bg={cardBg}
              shadow="sm"
              borderRadius="2xl"
              overflow="hidden"
              transition="all 0.3s"
              _hover={{ transform: "translateY(-6px)", shadow: "xl" }}
            >
              <AspectRatio ratio={16 / 10}>
                <Box bg={accentBg} display="flex" alignItems="center" justifyContent="center">
                  <Icon as={FiMapPin} boxSize={16} color={mutedText} />
                </Box>
              </AspectRatio>
              <Card.Body p={6}>
                <Flex justify="space-between" align="start" mb={3}>
                  <Box>
                    <Heading size="lg" mb={2} lineHeight="1.3">
                      {activity.title}
                    </Heading>
                    <Badge colorScheme="blue" variant="subtle" px={3} py={1} fontSize="sm">
                      {activity.category}
                    </Badge>
                  </Box>
                </Flex>

                <Text color={mutedText} mb={6} lineHeight="1.6">
                  {activity.description}
                </Text>

                <VStack spacing={3} align="stretch" mb={6}>
                  <HStack spacing={4}>
                    <HStack spacing={2}>
                      <Icon as={FiClock} color={mutedText} boxSize={4} />
                      <Text fontSize="sm" color={mutedText}>{activity.duration}</Text>
                    </HStack>
                    <HStack spacing={2}>
                      <Icon as={FiDollarSign} color={mutedText} boxSize={4} />
                      <Text fontSize="sm" color={mutedText}>{activity.cost}</Text>
                    </HStack>
                  </HStack>
                </VStack>

                <Button colorScheme="blue" size="lg" w="full" borderRadius="xl">
                  Add to itinerary
                </Button>
              </Card.Body>
            </Card.Root>
          ))}
        </SimpleGrid>
      </Stack>
    </Box>
  );
};

export default ActivitySearch;