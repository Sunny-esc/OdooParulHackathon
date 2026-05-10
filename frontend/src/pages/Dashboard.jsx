import { useEffect, useState, useContext } from "react";
import {  Badge,
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
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getDashboardData } from "../services/mockData";
import { useColorModeValue } from "../components/ui/color-mode";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const pageBg = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const mutedText = useColorModeValue("gray.600", "gray.300");

  useEffect(() => {
    getDashboardData().then((data) => {
      setDashboard(data);
      setLoading(false);
    });
  }, []);

  return (
    <Box minH="100vh" bg={pageBg} p={{ base: 4, md: 8 }}>
      <Stack spacing={8}>
        <Box
          bg="travel.500"
          color="white"
          rounded="3xl"
          p={{ base: 6, md: 10 }}
          bgImage="linear-gradient(135deg, rgba(14,165,233,0.95), rgba(56,189,248,0.95))"
          overflow="hidden"
          position="relative"
        >
          <Flex direction={{ base: "column", md: "row" }} align="center" justify="space-between" gap={6}>
            <Box maxW={{ base: "100%", md: "55%" }}>
              <Heading size="xl">Welcome back, {user?.username || "Traveler"}</Heading>
              <Text mt={4} fontSize="lg" maxW="xl" opacity={0.92}>
                Your premium travel companion for planning unforgettable itineraries, booking dreamy destinations, and staying on budget.
              </Text>
              <HStack spacing={3} mt={6} wrap="wrap">
                <Button colorScheme="yellow" size="lg" onClick={() => navigate("/create-trip")}>Plan new trip</Button>
                <Button variant="outline" colorScheme="whiteAlpha" size="lg" onClick={() => navigate("/trips")}>View my trips</Button>
              </HStack>
            </Box>
            <Box flex="1" rounded="3xl" bg="rgba(255,255,255,0.08)" p={6}>
              <Text fontSize="lg" fontWeight="semibold" mb={4}>Premium summary</Text>
              <VStack spacing={4} align="stretch">
                <Box rounded="2xl" bg="rgba(255,255,255,0.12)" p={4}>
                  <Text fontSize="sm" opacity={0.8}>Upcoming plan</Text>
                  <Text fontSize="2xl" fontWeight="bold">Lisbon Weekend</Text>
                </Box>
                <Box rounded="2xl" bg="rgba(255,255,255,0.12)" p={4}>
                  <Text fontSize="sm" opacity={0.8}>Saved destinations</Text>
                  <Text fontSize="2xl" fontWeight="bold">12+</Text>
                </Box>
              </VStack>
            </Box>
          </Flex>
        </Box>

        <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={6}>
          <Box bg={cardBg} rounded="3xl" p={6} shadow="sm">
            <Heading size="md" mb={4}>Recommended destinations</Heading>
            <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={4}>
              {(loading ? Array.from({ length: 3 }) : dashboard?.recommended || []).map((destination, index) => (
                <Box
                  key={destination?.id || index}
                  bg={useColorModeValue("gray.50", "gray.700")}
                  rounded="2xl"
                  p={5}
                  shadow="base"
                  transition="all 0.2s"
                  _hover={{ transform: "translateY(-3px)", shadow: "xl" }}
                >
                  <Skeleton isLoaded={!loading} height="120px" rounded="2xl" mb={3} />
                  <Skeleton isLoaded={!loading}>
                    <Heading size="sm" mb={2}>{destination?.name}</Heading>
                  </Skeleton>
                  <Skeleton isLoaded={!loading}>
                    <Text fontSize="sm" mb={2}>{destination?.country}</Text>
                  </Skeleton>
                  <HStack spacing={2} wrap="wrap">
                    <Badge colorScheme="purple">{destination?.cost}</Badge>
                    <Badge colorScheme="green">{destination?.popularity}% Popular</Badge>
                  </HStack>
                </Box>
              ))}
            </SimpleGrid>
          </Box>

          <VStack spacing={4} align="stretch">
            <Box bg={cardBg} rounded="3xl" p={6} shadow="sm">
              <Heading size="md" mb={4}>Budget highlights</Heading>
              <Stack spacing={4}>
                <Box rounded="2xl" p={4} bg={useColorModeValue("gray.50", "gray.700")}
                  display="grid" gridTemplateColumns="1fr auto" gap={4}>
                  <Box>
                    <Text fontSize="sm" color={mutedText}>Total budget</Text>
                    <Text fontSize="2xl" fontWeight="bold">$4,200</Text>
                  </Box>
                  <Badge colorScheme="blue" alignSelf="center">Stable</Badge>
                </Box>
                <Box rounded="2xl" p={4} bg={useColorModeValue("gray.50", "gray.700")}
                  display="grid" gridTemplateColumns="1fr auto" gap={4}>
                  <Box>
                    <Text fontSize="sm" color={mutedText}>Remaining</Text>
                    <Text fontSize="2xl" fontWeight="bold">$1,650</Text>
                  </Box>
                  <Badge colorScheme="green" alignSelf="center">On track</Badge>
                </Box>
              </Stack>
            </Box>
            <Box bg={cardBg} rounded="3xl" p={6} shadow="sm">
              <Heading size="md" mb={4}>Quick actions</Heading>
              <VStack spacing={3} align="stretch">
                {(loading ? Array.from({ length: 3 }) : dashboard?.quickActions || []).map((action, index) => (
                  <Box key={action?.id || index} bg={useColorModeValue("gray.50", "gray.700")} rounded="2xl" p={4}>
                    <Text fontWeight="semibold" mb={1}>{action?.title}</Text>
                    <Text fontSize="sm" color={mutedText}>{action?.description}</Text>
                  </Box>
                ))}
              </VStack>
            </Box>
          </VStack>
        </Grid>

        <Box bg={cardBg} rounded="3xl" p={6} shadow="sm">
          <Heading size="md" mb={4}>Recent itineraries</Heading>
          <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={4}>
            {(loading ? Array.from({ length: 3 }) : dashboard?.previousTrips || []).map((trip, index) => (
              <><Box
                    key={trip?.id || index}
                    bg={useColorModeValue("gray.50", "gray.700")}
                    rounded="2xl"
                    p={5}
                    shadow="base"
                    borderWidth="1px"
                    borderColor={useColorModeValue("gray.200", "gray.700")}
                >
                    <Flex justify="space-between" mb={3}>
                        <Badge colorScheme={trip?.status === "Planned" ? "yellow" : trip?.status === "Upcoming" ? "blue" : "green"}>
                            {trip?.status}
                        </Badge>
                        <Text fontSize="sm" color={mutedText}>{trip?.destinationCount} destinations</Text>
                    </Flex>
                    <Heading size="sm" mb={2}>{trip?.name}</Heading>
                    <Text fontSize="sm" mb={4}>{trip?.dates}</Text>
                    <Button size="sm" variant="outline" colorScheme="blue" onClick={() => navigate("/trips")}>View trip</Button>
                    <Text size="sm" mb={4}>{trip?.dates}</Text><Button size="sm" variant="outline" onClick={() => navigate("/trips")}>View trip</Button>
              </Box></>
            ))}
          </SimpleGrid>
        </Box>
      </Stack>
    </Box>
  );
};

export default Dashboard;
