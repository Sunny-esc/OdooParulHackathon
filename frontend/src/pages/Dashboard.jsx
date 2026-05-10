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
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getDashboardData } from "../services/mockData";
import { useColorModeValue } from "../components/ui/color-mode";
import { FiMapPin, FiCalendar, FiDollarSign, FiTrendingUp, FiPlus, FiSearch, FiCreditCard } from "react-icons/fi";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const pageBg = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const mutedText = useColorModeValue("gray.600", "gray.300");
  const accentBg = useColorModeValue("gray.100", "gray.700");

  useEffect(() => {
    getDashboardData().then((data) => {
      setDashboard(data);
      setLoading(false);
    });
  }, []);

  return (
    <Box minH="100vh" bg={pageBg}>
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
            {(loading ? Array.from({ length: 3 }) : dashboard?.recommended || []).map((destination, index) => (
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
                  <Box bg={accentBg} display="flex" alignItems="center" justifyContent="center">
                    <Icon as={FiMapPin} boxSize={12} color={mutedText} />
                  </Box>
                </AspectRatio>
                <Card.Body p={6}>
                  <Skeleton isLoaded={!loading}>
                    <Flex justify="space-between" align="start" mb={3}>
                      <Box>
                        <Heading size="md" mb={1}>{destination?.name}</Heading>
                        <Text color={mutedText}>{destination?.country}</Text>
                      </Box>
                      <Badge colorScheme="purple" variant="subtle" px={3} py={1}>
                        {destination?.cost}
                      </Badge>
                    </Flex>
                  </Skeleton>
                  <Skeleton isLoaded={!loading}>
                    <Text fontSize="sm" color={mutedText} mb={4} lineHeight="1.5">
                      {destination?.details}
                    </Text>
                  </Skeleton>
                  <Skeleton isLoaded={!loading}>
                    <HStack spacing={2}>
                      <Badge colorScheme="green" variant="subtle">
                        {destination?.popularity}% Popular
                      </Badge>
                    </HStack>
                  </Skeleton>
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
                      <Text fontSize="2xl" fontWeight="bold">$4,200</Text>
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
                      <Text fontSize="2xl" fontWeight="bold">$2,930</Text>
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
                      <Text fontSize="2xl" fontWeight="bold">$1,270</Text>
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
              {(loading ? Array.from({ length: 3 }) : dashboard?.quickActions || []).map((action, index) => (
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
                    <Skeleton isLoaded={!loading}>
                      <Text fontWeight="semibold" mb={1} fontSize="lg">{action?.title}</Text>
                    </Skeleton>
                    <Skeleton isLoaded={!loading}>
                      <Text fontSize="sm" color={mutedText}>{action?.description}</Text>
                    </Skeleton>
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
            {(loading ? Array.from({ length: 3 }) : dashboard?.previousTrips || []).map((trip, index) => (
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
                  <Box bg={accentBg} display="flex" alignItems="center" justifyContent="center">
                    <Icon as={FiMapPin} boxSize={12} color={mutedText} />
                  </Box>
                </AspectRatio>
                <Card.Body p={6}>
                  <Skeleton isLoaded={!loading} mb={4}>
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
                  </Skeleton>
                  <Skeleton isLoaded={!loading} mb={3}>
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
                  </Skeleton>
                  <Skeleton isLoaded={!loading} mb={4}>
                    <Text fontWeight="semibold" color="green.600">
                      Budget used: {trip?.budgetUsed}
                    </Text>
                  </Skeleton>
                  <Skeleton isLoaded={!loading}>
                    <Button size="sm" variant="outline" colorScheme="blue" w="full">
                      View trip details
                    </Button>
                  </Skeleton>
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
