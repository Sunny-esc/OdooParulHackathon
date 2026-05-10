import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Progress,
  SimpleGrid,
  Stack,
  Text,
  Stat,
  Card,
  Icon,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useColorModeValue } from "../components/ui/color-mode";
import { getBudgetData } from "../services/mockData";
import { FiDollarSign, FiTrendingUp, FiCreditCard, FiTarget } from "react-icons/fi";

const Budget = () => {
  const [budget, setBudget] = useState(null);

  useEffect(() => {
    getBudgetData().then(setBudget);
  }, []);

  if (!budget) {
    return <Text p={8}>Loading budget overview...</Text>;
  }

  const pageBg = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const mutedText = useColorModeValue("gray.600", "gray.300");
  const accentBg = useColorModeValue("gray.100", "gray.700");

  return (
    <Box minH="100vh" bg={pageBg}>
      <Stack spacing={12}>
        <Box textAlign="center" py={12}>
          <Heading size="2xl" mb={4} color="blue.600">
            Budget & Cost Breakdown
          </Heading>
          <Text fontSize="xl" color={mutedText} maxW="2xl" mx="auto">
            Track spend by category and stay within your plan with detailed insights.
          </Text>
        </Box>

        {/* Budget Overview Cards */}
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={8} mx={{ base: 4, md: 0 }}>
          <Card.Root bg={cardBg} shadow="sm" borderRadius="2xl">
            <Card.Body p={8}>
              <Flex align="center" gap={4} mb={6}>
                <Box bg="green.100" p={4} rounded="2xl">
                  <Icon as={FiTarget} color="green.600" boxSize={8} />
                </Box>
                <Box>
                  <Text fontSize="sm" color={mutedText} fontWeight="medium">Total budget</Text>
                  <Text fontSize="3xl" fontWeight="bold" color="green.600">{budget.totalBudget}</Text>
                </Box>
              </Flex>
              <Text fontSize="sm" color={mutedText}>Your planned spending limit</Text>
            </Card.Body>
          </Card.Root>

          <Card.Root bg={cardBg} shadow="sm" borderRadius="2xl">
            <Card.Body p={8}>
              <Flex align="center" gap={4} mb={6}>
                <Box bg="blue.100" p={4} rounded="2xl">
                  <Icon as={FiCreditCard} color="blue.600" boxSize={8} />
                </Box>
                <Box>
                  <Text fontSize="sm" color={mutedText} fontWeight="medium">Spent so far</Text>
                  <Text fontSize="3xl" fontWeight="bold" color="blue.600">{budget.spent}</Text>
                </Box>
              </Flex>
              <Text fontSize="sm" color={mutedText}>Current expenditure</Text>
            </Card.Body>
          </Card.Root>

          <Card.Root bg={cardBg} shadow="sm" borderRadius="2xl">
            <Card.Body p={8}>
              <Flex align="center" gap={4} mb={6}>
                <Box bg="orange.100" p={4} rounded="2xl">
                  <Icon as={FiTrendingUp} color="orange.600" boxSize={8} />
                </Box>
                <Box>
                  <Text fontSize="sm" color={mutedText} fontWeight="medium">Remaining</Text>
                  <Text fontSize="3xl" fontWeight="bold" color="orange.600">{budget.remaining}</Text>
                </Box>
              </Flex>
              <Text fontSize="sm" color={mutedText}>Available to spend</Text>
            </Card.Body>
          </Card.Root>
        </SimpleGrid>

        {/* Category Breakdown */}
        <Box mx={{ base: 4, md: 0 }}>
          <Card.Root bg={cardBg} shadow="sm" borderRadius="2xl">
            <Card.Body p={8}>
              <Heading size="lg" mb={8}>Category breakdown</Heading>
              <Stack spacing={6}>
                {budget.categories.map((category) => (
                  <Box key={category.name}>
                    <Flex justify="space-between" mb={3}>
                      <HStack spacing={3}>
                        <Icon as={FiDollarSign} color={mutedText} boxSize={5} />
                        <Text fontWeight="semibold" fontSize="lg">{category.name}</Text>
                      </HStack>
                      <Text fontWeight="semibold" color="blue.600">{category.amount}</Text>
                    </Flex>
                    <Progress.Root value={category.value} max={100} size="lg">
                      <Progress.Track bg={accentBg}>
                        <Progress.Range bg="blue.500" />
                      </Progress.Track>
                    </Progress.Root>
                    <Text fontSize="sm" color={mutedText} mt={2}>
                      {category.value}% of total budget
                    </Text>
                  </Box>
                ))}
              </Stack>
            </Card.Body>
          </Card.Root>
        </Box>

        {/* Average Daily Spend */}
        <Box mx={{ base: 4, md: 0 }}>
          <Card.Root bg={cardBg} shadow="sm" borderRadius="2xl">
            <Card.Body p={8}>
              <Flex justify="space-between" align="center" mb={6}>
                <Box>
                  <Heading size="lg" mb={2}>Average daily spend</Heading>
                  <Text color={mutedText} fontSize="lg">
                    Monitor daily costs while you travel
                  </Text>
                </Box>
                <Box textAlign="right">
                  <Text fontSize="4xl" fontWeight="bold" color="green.600">{budget.averageDaily}</Text>
                  <Text fontSize="sm" color={mutedText}>per day</Text>
                </Box>
              </Flex>
              <Box bg={accentBg} p={6} rounded="xl">
                <Text fontSize="md" color={mutedText} lineHeight="1.6">
                  Your spending is on track, but keep an eye on excursions and dining to stay under budget. Consider local markets for authentic experiences without breaking the bank.
                </Text>
              </Box>
            </Card.Body>
          </Card.Root>
        </Box>
      </Stack>
    </Box>
  );
};

export default Budget;
