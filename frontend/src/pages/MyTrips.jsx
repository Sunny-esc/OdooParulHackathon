import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  SimpleGrid,
  Select,
  Stack,
  Text,
  Badge,
  Skeleton,
  createListCollection,
} from "@chakra-ui/react";
import { useColorModeValue } from "../components/ui/color-mode";
import { getTrips } from "../services/mockData";

const statusOptions = createListCollection({
  items: [
    { label: "Planned", value: "Planned" },
    { label: "Upcoming", value: "Upcoming" },
    { label: "Completed", value: "Completed" },
  ],
});

const MyTrips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    getTrips().then((data) => {
      setTrips(data);
      setLoading(false);
    });
  }, []);

  const filtered = trips.filter((trip) => {
    const matchesSearch = trip.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter ? trip.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  return (
    <Box p={{ base: 4, md: 8 }}>
      <Stack spacing={6}>
        <Flex direction={{ base: "column", md: "row" }} gap={4} justify="space-between" align="center">
          <Box>
            <Heading size="lg">My Trips</Heading>
            <Text color={useColorModeValue("gray.600", "gray.300")}>Browse your itineraries and manage trip details.</Text>
          </Box>
          <Stack direction={{ base: "column", md: "row" }} spacing={3} width={{ base: "100%", md: "auto" }}>
            <Input placeholder="Search trips" value={search} onChange={(e) => setSearch(e.target.value)} />
            <Select.Root
  collection={statusOptions}
  value={statusFilter ? [statusFilter] : []}
  onValueChange={(details) =>
    setStatusFilter(details.value[0] || "")
  }
  width="200px"
>
  <Select.HiddenSelect />

  <Select.Control>
    <Select.Trigger>
      <Select.ValueText placeholder="Filter by status" />
    </Select.Trigger>

    <Select.IndicatorGroup>
      <Select.Indicator />
    </Select.IndicatorGroup>
  </Select.Control>

  <Select.Positioner>
    <Select.Content>
      {statusOptions.items.map((item) => (
        <Select.Item item={item} key={item.value}>
          {item.label}
          <Select.ItemIndicator />
        </Select.Item>
      ))}
    </Select.Content>
  </Select.Positioner>
</Select.Root>
          </Stack>
        </Flex>

        <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={6}>
          {(loading ? Array.from({ length: 6 }) : filtered).map((trip, index) => (
            <Box key={trip?.id || index} bg={useColorModeValue("white", "gray.700")} rounded="3xl" p={6} shadow="sm" borderWidth="1px" borderColor={useColorModeValue("gray.200", "gray.600")}>
              <Skeleton isLoaded={!loading} mb={4}>
                <Flex justify="space-between" align="center">
                  <Heading size="md">{trip?.name}</Heading>
                  <Badge colorScheme={trip?.status === "Completed" ? "green" : trip?.status === "Upcoming" ? "blue" : "yellow"}>{trip?.status}</Badge>
                </Flex>
              </Skeleton>
              <Skeleton isLoaded={!loading} mb={3}>
                <Text fontSize="sm" color={useColorModeValue("gray.600", "gray.300")}>
                  {trip?.destinationCount} destinations • {trip?.dates}
                </Text>
              </Skeleton>
              <Skeleton isLoaded={!loading} mb={4}>
                <Text fontWeight="semibold">Budget used: {trip?.budgetUsed}</Text>
              </Skeleton>
              <Skeleton isLoaded={!loading}>
                <Flex gap={3} wrap="wrap">
                  <Button size="sm" variant="outline">View</Button>
                  <Button size="sm" variant="outline">Edit</Button>
                  <Button size="sm" colorScheme="red" variant="ghost">Delete</Button>
                </Flex>
              </Skeleton>
            </Box>
          ))}
        </SimpleGrid>
      </Stack>
    </Box>
  );
};

export default MyTrips;
