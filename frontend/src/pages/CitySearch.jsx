import { useEffect, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Card,
  Heading,
  HStack,
  Icon,
  Input,
  InputGroup,
  NativeSelect,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  Flex,
  Skeleton,
} from "@chakra-ui/react";

import {
  FiMapPin,
  FiSearch,
  FiStar,
} from "react-icons/fi";

import { getCities } from "../api/cityService";
import CityMap from "../components/CityMap";

const costOptions = ["$", "$$", "$$$"];

const CitySearch = () => {
  const [cities, setCities] = useState([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCities = async (searchTerm = "") => {
    setLoading(true);

    try {
      const data = await getCities({
        search: searchTerm,
        page_size: 100,
      });

      setCities(
        Array.isArray(data)
          ? data
          : data.results || []
      );
    } catch (error) {
      console.error("Failed to fetch cities", error);
      setCities([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCities(query);
  }, [query]);

  const filteredCities = cities.filter((city) => {
    if (!filter) return true;
    return city.cost_level === filter;
  });

  return (
    <Box
      minH="100vh"
      bg="bg.canvas"
      px={{ base: 4, md: 6 }}
      py={10}
    >
      <Stack gap={10}>
        {/* Hero */}
        <Box textAlign="center">
          <Heading
            size="3xl"
            color="travel.fg"
            mb={4}
            style={{ fontSize: "2rem", fontWeight:"bold"}}
          >
            Discover Destinations
          </Heading>

          <Text
            maxW="2xl"
            mx="auto"
            fontSize="lg"
            color="gray.500"
          >
            Explore cities around the world,
            compare costs, and add destinations
            to your travel plans.
          </Text>
        </Box>

        {/* Search */}
        <Card.Root>
          <Card.Body>
            <Flex
              direction={{
                base: "column",
                md: "row",
              }}
              gap={4}
            >
              <InputGroup
                flex="1"
                startElement={<FiSearch />}
              >
                <Input
                  placeholder="Search cities and countries..."
                  value={query}
                  onChange={(e) =>
                    setQuery(e.target.value)
                  }
                  size="lg"
                  bg="bg.surface"
                />
              </InputGroup>

              <NativeSelect.Root
                maxW={{
                  base: "full",
                  md: "220px",
                }}
              >
                <NativeSelect.Field
                  placeholder="Filter by cost"
                  value={filter}
                  onChange={(e) =>
                    setFilter(e.target.value)
                  }
                >
                  {costOptions.map((option) => (
                    <option
                      key={option}
                      value={option}
                    >
                      {option}
                    </option>
                  ))}
                </NativeSelect.Field>

                <NativeSelect.Indicator />
              </NativeSelect.Root>
            </Flex>
          </Card.Body>
        </Card.Root>

        {/* Loading */}
        {loading ? (
          <SimpleGrid
            columns={{
              base: 1,
              md: 2,
              xl: 3,
            }}
            gap={6}
          >
            {Array.from({ length: 6 }).map(
              (_, index) => (
                <Card.Root key={index}>
                  <Card.Body>
                    <Stack gap={4}>
                      <Skeleton height="220px" />
                      <Skeleton height="24px" />
                      <Skeleton height="18px" />
                      <Skeleton height="40px" />
                    </Stack>
                  </Card.Body>
                </Card.Root>
              )
            )}
          </SimpleGrid>
        ) : (
          <>
            {/* City Cards */}
            <SimpleGrid
              columns={{
                base: 1,
                md: 2,
                xl: 3,
              }}
              gap={6}
            >
              {filteredCities.slice(0, 6).map((city) => (
                <Card.Root
                  key={city.id}
                  overflow="hidden"
                  cursor="pointer"
                  transition="all 0.2s"
                  _hover={{
                    translateY: "-4px",
                    shadow: "lg",
                  }}
                  onClick={() =>
                    setSelectedCity(city)
                  }
                >
                  <Box
                    h="220px"
                    bg="travel.subtle"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Icon
                      as={FiMapPin}
                      boxSize={14}
                      color="travel.fg"
                    />
                  </Box>

                  <Card.Body>
                    <Stack gap={5}>
                      <Flex
                        justify="space-between"
                        align="start"
                      >
                        <Box>
                          <Heading
                            size="lg"
                            mb={1}
                          >
                            {city.name}
                          </Heading>

                          <Text color="gray.500">
                            {city.country}
                          </Text>
                        </Box>

                        <Badge
                          colorPalette="green"
                          variant="subtle"
                          px={3}
                          py={1}
                          rounded="full"
                        >
                          {city.cost_level}
                        </Badge>
                      </Flex>

                      <Text
                        color="gray.500"
                        lineHeight="tall"
                      >
                        Population:{" "}
                        {city.population?.toLocaleString() ??
                          "—"}
                        <br />
                        Rating:{" "}
                        {city.tourism_rating ?? "—"}
                      </Text>

                      <VStack
                        align="stretch"
                        gap={3}
                      >
                        <HStack>
                          <Icon
                            as={FiStar}
                            color="yellow.400"
                          />

                          <Text
                            fontSize="sm"
                            color="gray.500"
                          >
                            {city.popularity_score?.toFixed(
                              0
                            ) ?? "—"}
                            % Popular
                          </Text>
                        </HStack>
                      </VStack>

                      <Button
                        colorPalette="travel"
                        size="lg"
                      >
                        Add to Trip
                      </Button>
                    </Stack>
                  </Card.Body>
                </Card.Root>
              ))}
            </SimpleGrid>

            {/* Empty State */}
            {filteredCities.length === 0 && (
              <Card.Root>
                <Card.Body py={16}>
                  <Stack
                    align="center"
                    gap={4}
                  >
                    <Icon
                      as={FiSearch}
                      boxSize={10}
                      color="gray.400"
                    />

                    <Text
                      fontSize="lg"
                      color="gray.500"
                      textAlign="center"
                    >
                      No cities match your search.
                    </Text>
                  </Stack>
                </Card.Body>
              </Card.Root>
            )}
          </>
        )}

        {/* Selected City */}
        {selectedCity && (
          <Card.Root overflow="hidden">
            <Card.Body>
              <Flex
                direction={{
                  base: "column",
                  lg: "row",
                }}
                gap={8}
              >
                {/* Details */}
                <Box flex="1">
                  <Stack gap={5}>
                    <Box>
                      <Heading
                        size="2xl"
                        mb={2}
                      >
                        {selectedCity.name}
                      </Heading>

                      <Text
                        fontSize="lg"
                        color="gray.500"
                      >
                        {selectedCity.country}
                      </Text>
                    </Box>

                    <Badge
                      w="fit-content"
                      colorPalette="green"
                      variant="subtle"
                      px={3}
                      py={1}
                      rounded="full"
                    >
                      {selectedCity.cost_level}
                    </Badge>

                    <Text
                      lineHeight="tall"
                      color="gray.500"
                    >
                      Population:{" "}
                      {selectedCity.population?.toLocaleString() ??
                        "—"}
                      <br />
                      Avg food: $
                      {selectedCity.avg_food_cost ??
                        "0"}
                      <br />
                      Avg hotel: $
                      {selectedCity.avg_hotel_cost ??
                        "0"}
                      <br />
                      Avg transport: $
                      {selectedCity.avg_transport_cost ??
                        "0"}
                    </Text>

                    <HStack>
                      <Icon
                        as={FiStar}
                        color="yellow.400"
                      />

                      <Text color="gray.500">
                        {selectedCity.popularity_score?.toFixed(
                          0
                        ) ?? "—"}
                        % Popular
                      </Text>
                    </HStack>

                    <Button
                      colorPalette="travel"
                      size="lg"
                      w="fit-content"
                    >
                      Add to Trip
                    </Button>
                  </Stack>
                </Box>

                {/* Map */}
                <Box
                  flex="1"
                  minH="420px"
                  overflow="hidden"
                  rounded="2xl"
                  borderWidth="1px"
                  borderColor="border.subtle"
                >
                  <CityMap city={selectedCity} />
                </Box>
              </Flex>
            </Card.Body>
          </Card.Root>
        )}
      </Stack>
    </Box>
  );
};

export default CitySearch;