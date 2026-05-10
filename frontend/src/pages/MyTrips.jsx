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
import { getTrips } from "../api/tripService";
import { FiSearch, FiMapPin, FiCalendar, FiDollarSign } from "react-icons/fi";

const MyTrips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const data = await getTrips({ page_size: 1000 });
        setTrips(Array.isArray(data) ? data : data.results || []);
      } catch (error) {
        console.error("Failed to load trips", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  const formatStatus = (trip) => {
    if (!trip) return "Loading";
    const today = new Date().toISOString().slice(0, 10);
    if (!trip.start_date || !trip.end_date) return "Planned";
    if (trip.end_date < today) return "Completed";
    if (trip.start_date > today) return "Upcoming";
    return "Active";
  };

  const getBudgetUsed = (trip) => {
    if (!trip) return "$0";
    const activityCosts = trip.stops?.flatMap((stop) => stop.activities || []) || [];
    const total = activityCosts.reduce((sum, activity) => sum + parseFloat(activity.cost || 0), 0);
    return `$${total.toFixed(0)}`;
  };

  const formatDates = (trip) => {
    if (!trip.start_date || !trip.end_date) return "TBD";
    return `${trip.start_date} - ${trip.end_date}`;
  };

  const tripsList = Array.isArray(trips) ? trips : [];

  const filtered = search.trim()
    ? tripsList.filter((trip) => String(trip?.name || "").toLowerCase().includes(search.toLowerCase()))
    : tripsList;

  const pageBg = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const mutedText = useColorModeValue("gray.600", "gray.300");
  const accentBg = useColorModeValue("gray.100", "gray.700");

  return (
    <Box minH="100vh" bg={pageBg} p={{sm:2,md:6}}>
      <Stack spacing={12}>
        <Box textAlign="center" py={12}>
          <Heading size="2xl" mb={4} color="travel.fg" style={{ fontSize: "2rem", fontWeight:"bold"}}>
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
                p={4}
              />
            </Box>
          </Card.Root>
        </Box>

        {/* Trip Cards */}
        <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={8} mx={{ base: 4, md: 0 }}>
          
          {(loading ? Array.from({ length: 6 }).map(() => ({})) : filtered).map((trip, index) => (
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
                {trip.cover_image ?
                <img src={trip.cover_image} alt="" />
                :
                <Box bg={accentBg} display="flex" alignItems="center" justifyContent="center">
                  <Icon as={FiMapPin} boxSize={16} color={mutedText} />
                </Box>
                }
                
              </AspectRatio>
              <Card.Body p={6}>
                  <Flex justify="space-between" align="start">
                    <Heading size="lg" lineHeight="1.3">{trip?.name || "Untitled trip"}</Heading>
                    <Badge
                      colorScheme={formatStatus(trip) === "Completed" ? "green" : formatStatus(trip) === "Upcoming" ? "blue" : "yellow"}
                      variant="subtle"
                      px={3}
                      py={1}
                    >
                      {formatStatus(trip)}
                    </Badge>
                  </Flex>

                  <VStack spacing={2} align="stretch">
                    <HStack spacing={4}>
                      <HStack spacing={2}>
                        <Icon as={FiMapPin} color={mutedText} boxSize={4} />
                        <Text fontSize="sm" color={mutedText}>
                          {trip?.stops?.length ?? 0} destinations
                        </Text>
                      </HStack>
                      <HStack spacing={2}>
                        <Icon as={FiCalendar} color={mutedText} boxSize={4} />
                        <Text fontSize="sm" color={mutedText}>
                          {formatDates(trip)}
                        </Text>
                      </HStack>
                    </HStack>
                  </VStack>

                  <HStack spacing={2}>
                    <Icon as={FiDollarSign} color="green.600" boxSize={4} />
                    <Text fontWeight="semibold" color="green.600">
                      Budget used: {getBudgetUsed(trip)}
                    </Text>
                  </HStack>

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
              </Card.Body>
            </Card.Root>
          ))}
        </SimpleGrid>

        {!loading && filtered.length === 0 && (
          <Box mx={{ base: 4, md: 0 }} textAlign="center" py={10}>
            <Text color={mutedText} fontSize="lg">
              No trips found yet. Create a new trip to see it here.
            </Text>
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default MyTrips;
