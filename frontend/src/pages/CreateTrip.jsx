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
  Card,
  AspectRatio,
  Icon,
  HStack,
} from "@chakra-ui/react";
import { useColorModeValue } from "../components/ui/color-mode";
import { getDestinations, getActivities } from "../services/mockData";
import { FiMapPin, FiPlus } from "react-icons/fi";

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

  const pageBg = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const mutedText = useColorModeValue("gray.600", "gray.300");
  const accentBg = useColorModeValue("gray.100", "gray.700");

  return (
    <Box minH="100vh" bg={pageBg}>
      <Stack spacing={12}>
        <Box textAlign="center" py={12}>
          <Heading size="2xl" mb={4} color="blue.600">
            Plan Your Dream Trip
          </Heading>
          <Text fontSize="xl" color={mutedText} maxW="2xl" mx="auto">
            Build your itinerary with destination suggestions, travel details, and activity inspiration.
          </Text>
        </Box>

        <Box mx={{ base: 4, md: 0 }}>
          <Card.Root bg={cardBg} shadow="sm" borderRadius="2xl" overflow="hidden">
            <Card.Body p={8}>
              <Stack spacing={8} as="form" onSubmit={handleSubmit}>
                <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                  <Field.Root>
                    <Field.Label fontSize="lg" fontWeight="semibold">Trip name</Field.Label>
                    <Input
                      value={formValues.name}
                      onChange={handleChange("name")}
                      placeholder="My Bali escape"
                      size="lg"
                      bg={useColorModeValue("gray.50", "gray.700")}
                      border="none"
                      _focus={{ bg: useColorModeValue("white", "gray.600") }}
                      borderRadius="xl"
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label fontSize="lg" fontWeight="semibold">Cover image</Field.Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleChange("cover")}
                      size="lg"
                      bg={useColorModeValue("gray.50", "gray.700")}
                      border="none"
                      _focus={{ bg: useColorModeValue("white", "gray.600") }}
                      borderRadius="xl"
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label fontSize="lg" fontWeight="semibold">Start date</Field.Label>
                    <Input
                      type="date"
                      value={formValues.startDate}
                      onChange={handleChange("startDate")}
                      size="lg"
                      bg={useColorModeValue("gray.50", "gray.700")}
                      border="none"
                      _focus={{ bg: useColorModeValue("white", "gray.600") }}
                      borderRadius="xl"
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label fontSize="lg" fontWeight="semibold">End date</Field.Label>
                    <Input
                      type="date"
                      value={formValues.endDate}
                      onChange={handleChange("endDate")}
                      size="lg"
                      bg={useColorModeValue("gray.50", "gray.700")}
                      border="none"
                      _focus={{ bg: useColorModeValue("white", "gray.600") }}
                      borderRadius="xl"
                    />
                  </Field.Root>
                </SimpleGrid>

                <Field.Root>
                  <Field.Label fontSize="lg" fontWeight="semibold">Description</Field.Label>
                  <Textarea
                    value={formValues.description}
                    onChange={handleChange("description")}
                    minH="120px"
                    placeholder="Add a short summary for this trip"
                    size="lg"
                    bg={useColorModeValue("gray.50", "gray.700")}
                    border="none"
                    _focus={{ bg: useColorModeValue("white", "gray.600") }}
                    borderRadius="xl"
                  />
                </Field.Root>

                <Box>
                  <Heading size="lg" mb={6}>Suggested destinations</Heading>
                  <SimpleGrid columns={{ base: 1, md: 3 }} gap={4}>
                    {(loading ? Array.from({ length: 3 }) : destinations).map((destination, index) => (
                      <Card.Root
                        key={destination?.id || index}
                        bg={accentBg}
                        shadow="sm"
                        borderRadius="xl"
                        overflow="hidden"
                        transition="all 0.2s"
                        _hover={{ transform: "translateY(-2px)", shadow: "md" }}
                        cursor="pointer"
                      >
                        <AspectRatio ratio={16 / 9}>
                          <Box bg={useColorModeValue("gray.200", "gray.600")} display="flex" alignItems="center" justifyContent="center">
                            <Icon as={FiMapPin} boxSize={8} color={mutedText} />
                          </Box>
                        </AspectRatio>
                        <Card.Body p={4}>
                          <Skeleton isLoaded={!loading}>
                            <Text fontWeight="semibold" mb={1}>{destination?.name}</Text>
                          </Skeleton>
                          <Skeleton isLoaded={!loading} mb={3}>
                            <Text fontSize="sm" color={mutedText}>{destination?.country}</Text>
                          </Skeleton>
                          <Skeleton isLoaded={!loading}>
                            <Badge colorScheme="purple" variant="subtle">{destination?.cost}</Badge>
                          </Skeleton>
                        </Card.Body>
                      </Card.Root>
                    ))}
                  </SimpleGrid>
                </Box>

                <Box>
                  <Heading size="lg" mb={6}>Activity suggestions</Heading>
                  <SimpleGrid columns={{ base: 1, md: 3 }} gap={4}>
                    {(loading ? Array.from({ length: 3 }) : activities).map((activity, index) => (
                      <Card.Root
                        key={activity?.id || index}
                        bg={accentBg}
                        shadow="sm"
                        borderRadius="xl"
                        overflow="hidden"
                        transition="all 0.2s"
                        _hover={{ transform: "translateY(-2px)", shadow: "md" }}
                        cursor="pointer"
                      >
                        <Card.Body p={4}>
                          <Skeleton isLoaded={!loading}>
                            <Text fontWeight="semibold" mb={1}>{activity?.title}</Text>
                          </Skeleton>
                          <Skeleton isLoaded={!loading} mb={2}>
                            <Badge colorScheme="blue" variant="subtle" size="sm">{activity?.category}</Badge>
                          </Skeleton>
                          <Skeleton isLoaded={!loading}>
                            <Text fontSize="sm" color={mutedText} lineHeight="1.4">
                              {activity?.description}
                            </Text>
                          </Skeleton>
                        </Card.Body>
                      </Card.Root>
                    ))}
                  </SimpleGrid>
                </Box>

                <Flex justify="center" pt={4}>
                  <Button
                    type="submit"
                    colorScheme="blue"
                    size="lg"
                    px={12}
                    borderRadius="xl"
                    leftIcon={<FiPlus />}
                    shadow="lg"
                    _hover={{ transform: "translateY(-2px)", shadow: "xl" }}
                    transition="all 0.2s"
                  >
                    Create trip
                  </Button>
                </Flex>
              </Stack>
            </Card.Body>
          </Card.Root>
        </Box>
      </Stack>
    </Box>
  );
};

export default CreateTrip;
