import { useEffect, useState, useContext } from "react";
import {
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  HStack,
  Skeleton,
  Card,
  AspectRatio,
  Icon,
  Image,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getTrips, getBudgetReport } from "../api/tripService";
import { getCities } from "../api/cityService";
import { useColorModeValue } from "../components/ui/color-mode";
import { FiMapPin, FiCalendar, FiDollarSign, FiTrendingUp, FiPlus, FiSearch, FiCreditCard } from "react-icons/fi";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [trips, setTrips] = useState([]);
  const [cities, setCities] = useState([]);
  const [budgetReport, setBudgetReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const pageBg = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const mutedText = useColorModeValue("gray.600", "gray.300");
  const accentBg = useColorModeValue("gray.100", "gray.700");

  // Dummy data for demo purposes
  const dummyCities = [
    { id: 1, name: "Paris", country: "France", cost_level: "$$", population: "2.1M", popularity_score: 9.5, tourism_rating: 9.8, image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=400&fit=crop" },
    { id: 2, name: "Tokyo", country: "Japan", cost_level: "$$$", population: "37.4M", popularity_score: 9.2, tourism_rating: 9.6, image: "https://images.unsplash.com/photo-1540959375944-7049f642e9c1?w=600&h=400&fit=crop" },
    { id: 3, name: "Barcelona", country: "Spain", cost_level: "$$", population: "1.6M", popularity_score: 8.9, tourism_rating: 9.4, image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600&h=400&fit=crop" },
  ];

  const dummyTrips = [
    { id: 1, name: "European Summer", status: "Upcoming", destinationCount: 5, dates: "Jun 15 - Jul 30", budgetUsed: "$3,500 / $5,000", image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop" },
    { id: 2, name: "Asian Adventure", status: "Upcoming", destinationCount: 4, dates: "Aug 5 - Sep 15", budgetUsed: "$2,100 / $4,000", image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=400&fit=crop" },
    { id: 3, name: "Beach Getaway", status: "Completed", destinationCount: 2, dates: "Apr 1 - Apr 8", budgetUsed: "$1,200 / $1,500", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop" },
  ];

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const tripsData = await getTrips({ page_size: 6 });
        setTrips(Array.isArray(tripsData) ? tripsData : tripsData.results || dummyTrips);

        const citiesData = await getCities({ page_size: 3 });
        setCities(Array.isArray(citiesData) ? citiesData : citiesData.results || dummyCities);

        if (tripsData.length) {
          const report = await getBudgetReport(tripsData[0].id);
          setBudgetReport(report);
        } else {
          // Dummy budget report
          setBudgetReport({
            total_estimated_cost: 5500,
          });
        }
      } catch (error) {
        console.error("Dashboard fetch failed:", error);
        // Use dummy data on error
        setTrips(dummyTrips);
        setCities(dummyCities);
        setBudgetReport({
          total_estimated_cost: 5500,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <Box minH="100vh" bg={pageBg} p={{sm:2,md:6}}>
      <Stack spacing={12}>
        {/* Hero Section */}
        <Box
          bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          color="white"
          rounded="3xl"
          p={{ base: 8, md: 12 }}
          mx={{ base: 4, md: 0 }}
          position="relative"
          overflow="hidden"
          _before={{
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bg: "rgba(0,0,0,0.1)",
            borderRadius: "3xl",
          }}
        >
          <Flex
            direction={{ base: "column", lg: "row" }}
            align="center"
            justify="space-between"
            gap={8}
            position="relative"
            zIndex={1}
          >
            <Box maxW={{ base: "100%", lg: "60%" }}>
              <Heading size={"2xl"} mb={4} lineHeight="1.2">
                Welcome back, {user?.username || "Traveler"}
              </Heading>
              <Text fontSize="xl" mb={6} opacity={0.9} maxW="xl">
                Your premium travel companion for planning unforgettable itineraries, booking dreamy destinations, and staying on budget.
              </Text>
              <HStack spaceX={8} wrap="wrap">
                <Button
                  size="lg"
                  onClick={() => navigate("/create-trip")}
                  color={"whitesmoke"}
                  shadow="lg"
                  _hover={{ transform: "translateY(-2px)", shadow: "xl" }}
                  transition="all 0.2s"
                  style={{padding:"0.6rem"}}
                >
                  <FiPlus/> Plan new trip
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  colorScheme="whiteAlpha"
                  onClick={() => navigate("/trips")}
                  leftIcon={<FiMapPin />}
                  _hover={{ bg: "whiteAlpha.200" }}
                >
                  View my trips
                </Button>
              </HStack>
            </Box>
            <Box flex="1" maxW={{ base: "100%", lg: "35%" }}>
              <Card.Root bg="rgba(255,255,255,0.1)" backdropFilter="blur(10px)" border="1px solid rgba(255,255,255,0.2)">
                <Card.Body p={6}>
                  <Text fontSize="lg" fontWeight="semibold" mb={4} color="white">
                    Premium summary
                  </Text>
                  <VStack spacing={4} align="stretch">
                    <Box bg="rgba(255,255,255,0.15)" rounded="2xl" p={4}>
                      <Text fontSize="sm" opacity={0.8} color="white">Upcoming plan</Text>
                      <Text fontSize="xl" fontWeight="bold" color="white">Lisbon Weekend</Text>
                    </Box>
                    <Box bg="rgba(255,255,255,0.15)" rounded="2xl" p={4}>
                      <Text fontSize="sm" opacity={0.8} color="white">Saved destinations</Text>
                      <Text fontSize="xl" fontWeight="bold" color="white">12+</Text>
                    </Box>
                  </VStack>
                </Card.Body>
              </Card.Root>
            </Box>
          </Flex>
        </Box>

        {/* Recommended Destinations */}
        <Box>
          <Flex justify="space-between" align="center" mb={8} mx={{ base: 4, md: 0 }}>
            <Box>
              <Heading size="xl" mb={2}>Recommended destinations</Heading>
              <Text color={mutedText} fontSize="lg">
                Curated picks based on your travel preferences
              </Text>
            </Box>
            <Button variant="outline" onClick={() => navigate("/cities")}>
              View all
            </Button>
          </Flex>
          <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={6} mx={{ base: 4, md: 0 }}>
            {(loading ? Array.from({ length: 3 }) : cities.length > 0 ? cities : dummyCities).map((destination, index) => (
              <Card.Root
                key={destination?.id || index}
                bg={cardBg}
                shadow="sm"
                borderRadius="2xl"
                overflow="hidden"
                transition="all 0.3s"
                _hover={{ transform: "translateY(-4px)", shadow: "xl" }}
              >
                <AspectRatio ratio={16 / 9}>
                <Image
                  src={destination?.image || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop"}
                  alt={destination?.name}
                  objectFit="cover"
                  borderTopRadius="2xl"
                />
                </AspectRatio>
                <Card.Body p={6}>
                    <Flex justify="space-between" align="start" mb={3}>
                      <Box>
                        <Heading size="md" mb={1}>{destination?.name}</Heading>
                        <Text color={mutedText}>{destination?.country}</Text>
                      </Box>
                      <Badge colorScheme="purple" variant="subtle" px={3} py={1}>
                        {destination?.cost_level || "—"}
                      </Badge>
                    </Flex>
                    <Text fontSize="sm" color={mutedText} mb={4} lineHeight="1.5">
                      Population: {destination?.population ?? "—"}, Popularity: {destination?.popularity_score ?? "—"}
                    </Text>
                    <HStack spacing={2}>
                      <Badge colorScheme="green" variant="subtle">
                        Rating: {destination?.tourism_rating ?? "—"}
                      </Badge>
                    </HStack>
                </Card.Body>
              </Card.Root>
            ))}
          </SimpleGrid>
        </Box>

        {/* Budget Overview & Quick Actions */}
        <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={8} mx={{ base: 4, md: 0 }}>
          <Box>
            <Heading size="xl" mb={8}>Budget overview</Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
              <Card.Root bg={cardBg} shadow="sm" borderRadius="2xl">
                <Card.Body p={6}>
                  <Flex align="center" gap={3} mb={4}>
                    <Box bg="green.100" p={3} rounded="xl">
                      <Icon as={FiDollarSign} color="green.600" boxSize={6} />
                    </Box>
                    <Box>
                      <Text fontSize="sm" color={mutedText}>Total budget</Text>
                      <Text fontSize="2xl" fontWeight="bold">
                        {budgetReport?.total_estimated_cost ? `$${budgetReport.total_estimated_cost}` : "$0"}
                      </Text>
                    </Box>
                  </Flex>
                  <Badge colorScheme="green" variant="subtle">On track</Badge>
                </Card.Body>
              </Card.Root>
              <Card.Root bg={cardBg} shadow="sm" borderRadius="2xl">
                <Card.Body p={6}>
                  <Flex align="center" gap={3} mb={4}>
                    <Box bg="blue.100" p={3} rounded="xl">
                      <Icon as={FiCreditCard} color="blue.600" boxSize={6} />
                    </Box>
                    <Box>
                      <Text fontSize="sm" color={mutedText}>Spent so far</Text>
                      <Text fontSize="2xl" fontWeight="bold">
                        ${budgetReport?.total_estimated_cost ? Math.floor(budgetReport.total_estimated_cost * 0.7) : 3850}
                      </Text>
                    </Box>
                  </Flex>
                  <Badge colorScheme="blue" variant="subtle">Stable</Badge>
                </Card.Body>
              </Card.Root>
              <Card.Root bg={cardBg} shadow="sm" borderRadius="2xl">
                <Card.Body p={6}>
                  <Flex align="center" gap={3} mb={4}>
                    <Box bg="orange.100" p={3} rounded="xl">
                      <Icon as={FiTrendingUp} color="orange.600" boxSize={6} />
                    </Box>
                    <Box>
                      <Text fontSize="sm" color={mutedText}>Remaining</Text>
                      <Text fontSize="2xl" fontWeight="bold">
                        ${budgetReport ? (budgetReport.total_estimated_cost ? (10000 - budgetReport.total_estimated_cost) : 4500) : 4500}
                      </Text>
                    </Box>
                  </Flex>
                  <Badge colorScheme="orange" variant="subtle">Good progress</Badge>
                </Card.Body>
              </Card.Root>
            </SimpleGrid>
          </Box>

          <Box>
            <Heading size="xl" mb={8}>Quick actions</Heading>
            <VStack spacing={4} align="stretch">
              {(loading ? Array.from({ length: 3 }) : [
              { id: 1, title: "Plan new itinerary", description: "Start a new trip plan from scratch." },
              { id: 2, title: "Search cities", description: "Discover destinations that fit your style." },
              { id: 3, title: "Track spending", description: "Keep your budget aligned with your plan." },
            ]).map((action, index) => (
                <Card.Root
                  key={action?.id || index}
                  bg={cardBg}
                  shadow="sm"
                  borderRadius="2xl"
                  transition="all 0.2s"
                  _hover={{ transform: "translateY(-2px)", shadow: "md" }}
                  cursor="pointer"
                >
                  <Card.Body p={5}>
                      <Text fontWeight="semibold" mb={1} fontSize="lg">{action?.title}</Text>
                  
                      <Text fontSize="sm" color={mutedText}>{action?.description}</Text>
                
                  </Card.Body>
                </Card.Root>
              ))}
            </VStack>
          </Box>
        </Grid>

        {/* Recent Trips */}
        <Box>
          <Flex justify="space-between" align="center" mb={8} mx={{ base: 4, md: 0 }}>
            <Box>
              <Heading size="xl" mb={2}>Recent trips</Heading>
              <Text color={mutedText} fontSize="lg">
                Your latest travel memories and upcoming adventures
              </Text>
            </Box>
            <Button variant="outline" onClick={() => navigate("/trips")}>
              View all trips
            </Button>
          </Flex>
          <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={6} mx={{ base: 4, md: 0 }}>
            {(loading ? Array.from({ length: 3 }) : (Array.isArray(trips) && trips.length > 0) ? trips : dummyTrips).map((trip, index) => (
              <Card.Root
                key={trip?.id || index}
                bg={cardBg}
                shadow="sm"
                borderRadius="2xl"
                overflow="hidden"
                transition="all 0.3s"
                _hover={{ transform: "translateY(-4px)", shadow: "xl" }}
              >
                <AspectRatio ratio={16 / 9}>
                  <Image
                    src={trip?.image || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop"}
                    alt={trip?.name}
                    objectFit="cover"
                    borderTopRadius="2xl"
                  />
                </AspectRatio>
                <Card.Body p={6}>
                    <Flex justify="space-between" align="center">
                      <Heading size="lg">{trip?.name}</Heading>
                      <Badge
                        colorScheme={trip?.status === "Completed" ? "green" : trip?.status === "Upcoming" ? "blue" : "yellow"}
                        variant="subtle"
                        px={3}
                        py={1}
                      >
                        {trip?.status}
                      </Badge>
                    </Flex>
                    <HStack spacing={4} color={mutedText}>
                      <HStack spacing={1}>
                        <Icon as={FiMapPin} boxSize={4} />
                        <Text fontSize="sm">{trip?.destinationCount} destinations</Text>
                      </HStack>
                      <HStack spacing={1}>
                        <Icon as={FiCalendar} boxSize={4} />
                        <Text fontSize="sm">{trip?.dates}</Text>
                      </HStack>
                    </HStack>
                    <Text fontWeight="semibold" color="green.600">
                      Budget used: {trip?.budgetUsed}
                    </Text>
                    <Button size="sm" variant="outline" colorScheme="blue" w="full">
                      View trip details
                    </Button>
                </Card.Body>
              </Card.Root>
            ))}
          </SimpleGrid>
        </Box>
      </Stack>
    </Box>
  );
};

export default Dashboard;
