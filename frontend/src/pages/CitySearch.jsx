import { useEffect, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Input,
  SimpleGrid,
  Stack,
  Text,
  Select,
  createListCollection,
  Card,
  AspectRatio,
  Icon,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { getDestinations } from "../services/mockData";
import { useColorModeValue } from "../components/ui/color-mode";
import { FiMapPin, FiSearch, FiStar } from "react-icons/fi";
import CityMap from "../components/CityMap";

const costOptions = createListCollection({
  items: [
    { label: "$$", value: "$$" },
    { label: "$$$", value: "$$$" },
    { label: "$$$$", value: "$$$$" },
  ],
});

const CitySearch = () => {
  const [cities, setCities] = useState([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    getDestinations().then(setCities);
  }, []);

  const filteredCities = cities.filter((city) => {
    const matchesQuery = city.name.toLowerCase().includes(query.toLowerCase()) || city.country.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter ? city.cost === filter : true;
    return matchesQuery && matchesFilter;
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
            Discover Destinations
          </Heading>
          <Text fontSize="xl" color={mutedText} maxW="2xl" mx="auto">
            Explore cities around the world, compare costs, and add destinations to your travel plans.
          </Text>
        </Box>

        {/* Search and Filter */}
        <Box mx={{ base: 4, md: 0 }}>
          <Card.Root bg={cardBg} shadow="sm" borderRadius="2xl" p={6}>
            <Flex
              direction={{ base: "column", md: "row" }}
              gap={4}
              align="center"
            >
              <Flex flex="1" gap={4} w="full">
                <Box position="relative" flex="1">
                  <Icon as={FiSearch} position="absolute" left={4} top="50%" transform="translateY(-50%)" color={mutedText} />
                  <Input
                    placeholder="Search cities and countries..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    pl={12}
                    bg={useColorModeValue("gray.50", "gray.700")}
                    border="none"
                    _focus={{ bg: useColorModeValue("white", "gray.600") }}
                    size="lg"
                    borderRadius="xl"
                  />
                </Box>
                <Select.Root
                  collection={costOptions}
                  value={filter ? [filter] : []}
                  onValueChange={(details) =>
                    setFilter(details.value[0] || "")
                  }
                  maxW={{ base: "100%", md: "200px" }}
                >
                  <Select.HiddenSelect />
                  <Select.Control>
                    <Select.Trigger
                      bg={useColorModeValue("gray.50", "gray.700")}
                      border="none"
                      _focus={{ bg: useColorModeValue("white", "gray.600") }}
                      size="lg"
                      borderRadius="xl"
                    >
                      <Select.ValueText placeholder="Filter by cost" />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                      <Select.Indicator />
                    </Select.IndicatorGroup>
                  </Select.Control>
                  <Select.Positioner>
                    <Select.Content>
                      {costOptions.items.map((item) => (
                        <Select.Item item={item} key={item.value}>
                          {item.label}
                          <Select.ItemIndicator />
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Positioner>
                </Select.Root>
              </Flex>
            </Flex>
          </Card.Root>
        </Box>

        {/* City Cards */}
        <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={8} mx={{ base: 4, md: 0 }}>
          {filteredCities.map((city) => (
            <Card.Root
              key={city.id}
              bg={cardBg}
              shadow="sm"
              borderRadius="2xl"
              overflow="hidden"
              transition="all 0.3s"
              _hover={{ transform: "translateY(-6px)", shadow: "xl" }}
              cursor="pointer"
              onClick={() => setSelectedCity(city)}
            >
              <AspectRatio ratio={16 / 10}>
                <Box bg={accentBg} display="flex" alignItems="center" justifyContent="center">
                  <Icon as={FiMapPin} boxSize={16} color={mutedText} />
                </Box>
              </AspectRatio>
              <Card.Body p={6}>
                <Flex justify="space-between" align="start" mb={3}>
                  <Box>
                    <Heading size="lg" mb={1} lineHeight="1.3">
                      {city.name}
                    </Heading>
                    <Text color={mutedText} fontSize="md">{city.country}</Text>
                  </Box>
                  <Badge colorScheme="green" variant="subtle" px={3} py={1} fontSize="sm">
                    {city.cost}
                  </Badge>
                </Flex>

                <Text color={mutedText} mb={6} lineHeight="1.6">
                  {city.details}
                </Text>

                <VStack spacing={3} align="stretch" mb={6}>
                  <HStack spacing={4}>
                    <HStack spacing={2}>
                      <Icon as={FiStar} color="yellow.500" boxSize={4} />
                      <Text fontSize="sm" color={mutedText}>
                        {city.popularity}% Popular
                      </Text>
                    </HStack>
                  </HStack>
                </VStack>

                <Button colorScheme="blue" size="lg" w="full" borderRadius="xl">
                  Add to trip
                </Button>
              </Card.Body>
            </Card.Root>
          ))}
        </SimpleGrid>

        {/* Selected City Details and Map */}
        {selectedCity && (
          <Box mx={{ base: 4, md: 0 }}>
            <Card.Root bg={cardBg} shadow="sm" borderRadius="2xl" p={6}>
              <Flex direction={{ base: "column", md: "row" }} gap={6}>
                <Box flex="1">
                  <Flex justify="space-between" align="start" mb={4}>
                    <Box>
                      <Heading size="xl" mb={2} lineHeight="1.3">
                        {selectedCity.name}
                      </Heading>
                      <Text color={mutedText} fontSize="lg" mb={2}>
                        {selectedCity.country}
                      </Text>
                      <Badge colorScheme="green" variant="subtle" px={3} py={1} fontSize="sm">
                        {selectedCity.cost}
                      </Badge>
                    </Box>
                  </Flex>

                  <Text color={mutedText} mb={6} lineHeight="1.6" fontSize="md">
                    {selectedCity.details}
                  </Text>

                  <HStack spacing={4} mb={6}>
                    <HStack spacing={2}>
                      <Icon as={FiStar} color="yellow.500" boxSize={4} />
                      <Text fontSize="sm" color={mutedText}>
                        {selectedCity.popularity}% Popular
                      </Text>
                    </HStack>
                  </HStack>

                  <Button colorScheme="blue" size="lg" borderRadius="xl">
                    Add to trip
                  </Button>
                </Box>

                <Box flex="1" minH="400px">
                  <CityMap city={selectedCity} />
                </Box>
              </Flex>
            </Card.Root>
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default CitySearch;
