import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Field,
  Heading,
  Input,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  VStack,
  Badge,
  Skeleton,
} from "@chakra-ui/react";
import { useColorModeValue } from "../components/ui/color-mode";
import { getDestinations, getActivities } from "../services/mockData";

const CreateTrip = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    startDate: "",
    endDate: "",
    description: "",
    cover: null,
  });
  const [destinations, setDestinations] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getDestinations(), getActivities()]).then(([dest, act]) => {
      setDestinations(dest);
      setActivities(act);
      setLoading(false);
    });
  }, []);

  const handleChange = (field) => (event) => {
    const value = field === "cover" ? event.target.files[0] : event.target.value;
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Trip created successfully. This page is powered by the mocked frontend layer.");
  };

  return (
    <Box p={{ base: 4, md: 8 }}>
      <Stack spacing={8}>
        <Box bg={useColorModeValue("white", "gray.700")} rounded="3xl" p={8} shadow="base">
          <Heading size="lg" mb={2}>Create a new trip</Heading>
          <Text color={useColorModeValue("gray.600", "gray.300")} mb={6}>Build your itinerary with destination suggestions, travel details, and activity inspiration.</Text>
          <Stack spacing={6} as="form" onSubmit={handleSubmit}>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
              <Field.Root>
                <Field.Label>Trip name</Field.Label>
                <Input value={formValues.name} onChange={handleChange("name")} placeholder="My Bali escape" />
              </Field.Root>
              <Field.Root>
                <Field.Label>Cover image</Field.Label>
                <Input type="file" accept="image/*" onChange={handleChange("cover")} />
              </Field.Root>
              <Field.Root>
                <Field.Label>Start date</Field.Label>
                <Input type="date" value={formValues.startDate} onChange={handleChange("startDate")} />
              </Field.Root>
              <Field.Root>
                <Field.Label>End date</Field.Label>
                <Input type="date" value={formValues.endDate} onChange={handleChange("endDate")} />
              </Field.Root>
            </SimpleGrid>

            <Field.Root>
              <Field.Label>Description</Field.Label>
              <Textarea value={formValues.description} onChange={handleChange("description")} minH="160px" placeholder="Add a short summary for this trip" />
            </Field.Root>

            <Box>
              <Heading size="md" mb={4}>Suggested destinations</Heading>
              <SimpleGrid columns={{ base: 1, md: 3 }} gap={4}>
                {(loading ? Array.from({ length: 3 }) : destinations).map((destination, index) => (
                  <Box key={destination?.id || index} bg={useColorModeValue("gray.50", "gray.800")} rounded="2xl" p={4} borderWidth="1px" borderColor={useColorModeValue("gray.200", "gray.600")}>
                    <Skeleton isLoaded={!loading}>
                      <Text fontWeight="semibold">{destination?.name}</Text>
                    </Skeleton>
                    <Skeleton isLoaded={!loading} mt={1}>
                      <Text fontSize="sm">{destination?.country}</Text>
                    </Skeleton>
                    <Skeleton isLoaded={!loading} mt={3}>
                      <Badge colorScheme="purple">{destination?.cost}</Badge>
                    </Skeleton>
                  </Box>
                ))}
              </SimpleGrid>
            </Box>

            <Box>
              <Heading size="md" mb={4}>Activity suggestions</Heading>
              <SimpleGrid columns={{ base: 1, md: 3 }} gap={4}>
                {(loading ? Array.from({ length: 3 }) : activities).map((activity, index) => (
                  <Box key={activity?.id || index} bg={useColorModeValue("gray.50", "gray.800")} rounded="2xl" p={4} borderWidth="1px" borderColor={useColorModeValue("gray.200", "gray.600")}>
                    <Skeleton isLoaded={!loading}>
                      <Text fontWeight="semibold">{activity?.title}</Text>
                    </Skeleton>
                    <Skeleton isLoaded={!loading} mt={1}>
                      <Text fontSize="sm">{activity?.category}</Text>
                    </Skeleton>
                    <Skeleton isLoaded={!loading} mt={2}>
                      <Text fontSize="xs" color={useColorModeValue("gray.600", "gray.400")}>
                        {activity?.description}
                      </Text>
                    </Skeleton>
                  </Box>
                ))}
              </SimpleGrid>
            </Box>

            <Flex justify="flex-end">
              <Button type="submit" colorScheme="blue" size="lg">Create trip</Button>
            </Flex>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default CreateTrip;
