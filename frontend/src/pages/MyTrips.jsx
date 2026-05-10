import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  SimpleGrid,
  Stack,
  Text,
  Badge,
  Skeleton,
  Card,
  AspectRatio,
  Icon,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { useColorModeValue } from "../components/ui/color-mode";
import { getTrips } from "../services/mockData";
import { FiSearch, FiMapPin, FiCalendar, FiDollarSign } from "react-icons/fi";

const MyTrips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getTrips().then((data) => {
      setTrips(data);
      setLoading(false);
    });
  }, []);

  const filtered = trips.filter((trip) =>
    trip.name.toLowerCase().includes(search.toLowerCase())
  );

  const pageBg = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const mutedText = useColorModeValue("gray.600", "gray.300");
  const accentBg = useColorModeValue("gray.100", "gray.700");

  return (
    <Box minH="100vh" bg={pageBg}>
      <Stack spacing={12}>
        <Box textAlign="center" py={12}>
          <Heading size="2xl" mb={4} color="blue.600">
            My Travel Adventures
          </Heading>
          <Text fontSize="xl" color={mutedText} maxW="2xl" mx="auto">
            Browse your itineraries and manage trip details with ease.
          </Text>
        </Box>

        {/* Search Bar */}
        <Box mx={{ base: 4, md: 0 }}>
          <Card.Root bg={cardBg} shadow="sm" borderRadius="2xl" p={6}>
            <Box position="relative" maxW="md" mx="auto">
              <Icon as={FiSearch} position="absolute" left={4} top="50%" transform="translateY(-50%)" color={mutedText} />
              <Input
                placeholder="Search your trips..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                pl={12}
                bg={useColorModeValue("gray.50", "gray.700")}
                border="none"
                _focus={{ bg: useColorModeValue("white", "gray.600") }}
                size="lg"
                borderRadius="xl"
              />
            </Box>
          </Card.Root>
        </Box>

        {/* Trip Cards */}
        <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={8} mx={{ base: 4, md: 0 }}>
          {(loading ? Array.from({ length: 6 }) : filtered).map((trip, index) => (
            <Card.Root
              key={trip?.id || index}
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
                <Skeleton isLoaded={!loading} mb={4}>
                  <Flex justify="space-between" align="start">
                    <Heading size="lg" lineHeight="1.3">{trip?.name}</Heading>
                    <Badge
                      colorScheme={trip?.status === "Completed" ? "green" : trip?.status === "Upcoming" ? "blue" : "yellow"}
                      variant="subtle"
                      px={3}
                      py={1}
                    >
                      {trip?.status}
                    </Badge>
                  </Flex>
                </Skeleton>

                <Skeleton isLoaded={!loading} mb={4}>
                  <VStack spacing={2} align="stretch">
                    <HStack spacing={4}>
                      <HStack spacing={2}>
                        <Icon as={FiMapPin} color={mutedText} boxSize={4} />
                        <Text fontSize="sm" color={mutedText}>
                          {trip?.destinationCount} destinations
                        </Text>
                      </HStack>
                      <HStack spacing={2}>
                        <Icon as={FiCalendar} color={mutedText} boxSize={4} />
                        <Text fontSize="sm" color={mutedText}>
                          {trip?.dates}
                        </Text>
                      </HStack>
                    </HStack>
                  </VStack>
                </Skeleton>

                <Skeleton isLoaded={!loading} mb={6}>
                  <HStack spacing={2}>
                    <Icon as={FiDollarSign} color="green.600" boxSize={4} />
                    <Text fontWeight="semibold" color="green.600">
                      Budget used: {trip?.budgetUsed}
                    </Text>
                  </HStack>
                </Skeleton>

                <Skeleton isLoaded={!loading}>
                  <VStack spacing={3}>
                    <Button size="sm" variant="outline" colorScheme="blue" w="full" borderRadius="xl">
                      View details
                    </Button>
                    <HStack spacing={3} w="full">
                      <Button size="sm" variant="outline" colorScheme="purple" flex="1" borderRadius="xl">
                        Edit
                      </Button>
                      <Button size="sm" colorScheme="red" variant="ghost" flex="1" borderRadius="xl">
                        Delete
                      </Button>
                    </HStack>
                  </VStack>
                </Skeleton>
              </Card.Body>
            </Card.Root>
          ))}
        </SimpleGrid>
      </Stack>
    </Box>
  );
};

export default MyTrips;
