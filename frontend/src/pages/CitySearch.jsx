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
} from "@chakra-ui/react";
import { getDestinations } from "../services/mockData";
import { useColorModeValue } from "../components/ui/color-mode";
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

  useEffect(() => {
    getDestinations().then(setCities);
  }, []);

  const filteredCities = cities.filter((city) => {
    const matchesQuery = city.name.toLowerCase().includes(query.toLowerCase()) || city.country.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter ? city.cost === filter : true;
    return matchesQuery && matchesFilter;
  });

  return (
    <Box p={{ base: 4, md: 8 }}>
      <Stack spacing={6}>
        <Box>
          <Heading size="lg">City search</Heading>
          <Text color={useColorModeValue("gray.600", "gray.300")}>Discover destinations, compare cost insights and add cities to your trip plan.</Text>
        </Box>
        <Flex gap={4} direction={{ base: "column", md: "row" }}>
          <Input placeholder="Search cities" value={query} onChange={(e) => setQuery(e.target.value)} />
          <Select.Root
  collection={costOptions}
  value={filter ? [filter] : []}
  onValueChange={(details) =>
    setFilter(details.value[0] || "")
  }
  width={{ base: "100%", md: "240px" }}
>
  <Select.HiddenSelect />

  <Select.Control>
    <Select.Trigger>
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
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={5}>
          {filteredCities.map((city) => (
            <Box key={city.id} bg={useColorModeValue("white", "gray.700")} rounded="3xl" p={5} shadow="sm" borderWidth="1px" borderColor={useColorModeValue("gray.200", "gray.600")}> 
              <Flex justify="space-between" align="center" mb={3}>
                <Heading size="md">{city.name}</Heading>
                <Badge colorScheme="green">{city.cost}</Badge>
              </Flex>
              <Text fontSize="sm" mb={2} color={useColorModeValue("gray.600", "gray.300")}>{city.country}</Text>
              <Text fontSize="sm" mb={4}>{city.details}</Text>
              <Flex gap={2} wrap="wrap" mb={4}>
                <Badge colorScheme="purple">Popularity {city.popularity}%</Badge>
              </Flex>
              <Button size="sm" colorScheme="blue">Add to trip</Button>
            </Box>
          ))}
        </SimpleGrid>
      </Stack>
    </Box>
  );
};

export default CitySearch;
