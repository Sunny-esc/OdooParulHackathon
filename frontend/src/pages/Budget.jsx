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
} from "@chakra-ui/react";
import { useColorModeValue } from "../components/ui/color-mode";
import { getBudgetData } from "../services/mockData";

const Budget = () => {
  const [budget, setBudget] = useState(null);

  useEffect(() => {
    getBudgetData().then(setBudget);
  }, []);

  if (!budget) {
    return <Text p={8}>Loading budget overview...</Text>;
  }

  return (
    <Box p={{ base: 4, md: 8 }}>
      <Stack spacing={6}>
        <Box>
          <Heading size="lg">Budget & cost breakdown</Heading>
          <Text color={useColorModeValue("gray.600", "gray.300")}>Track spend by category and stay within your plan.</Text>
        </Box>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
          <Stat.Root bg={useColorModeValue("white", "gray.700")} rounded="3xl" p={6}>
            <Stat.Label>Total budget</Stat.Label>
            <Stat.HelpText>{budget.totalBudget}</Stat.HelpText>
          </Stat.Root>
          <Stat.Root bg={useColorModeValue("white", "gray.700")} rounded="3xl" p={6}>
            <Stat.Label>Spent so far</Stat.Label>
            <Stat.HelpText>{budget.spent}</Stat.HelpText>
          </Stat.Root>
          <Stat.Root bg={useColorModeValue("white", "gray.700")} rounded="3xl" p={6}>
            <Stat.Label>Remaining</Stat.Label>
            <Stat.HelpText>{budget.remaining}</Stat.HelpText>
          </Stat.Root>
        </SimpleGrid>

        <Box bg={useColorModeValue("white", "gray.700")} rounded="3xl" p={6}>
          <Heading size="md" mb={4}>Category breakdown</Heading>
          <Stack spacing={4}>
            {budget.categories.map((category) => (
              <Box key={category.name}>
                <Flex justify="space-between" mb={2}>
                  <Text fontWeight="semibold">{category.name}</Text>
                  <Text>{category.amount}</Text>
                </Flex>
                <Progress.Root value={category.value}>
            <Progress.Track>
              <Progress.Range />
            </Progress.Track>
          </Progress.Root>
              </Box>
            ))}
          </Stack>
        </Box>

        <Box bg={useColorModeValue("white", "gray.700")} rounded="3xl" p={6}>
          <Flex justify="space-between" mb={4}>
            <Box>
              <Heading size="md">Average daily spend</Heading>
              <Text color={useColorModeValue("gray.600", "gray.300")}>Monitor daily costs while you travel.</Text>
            </Box>
            <Heading size="md">{budget.averageDaily}</Heading>
          </Flex>
          <Text fontSize="sm" color={useColorModeValue("gray.600", "gray.300")}>Your spending is on track, but keep an eye on excursions and dining to stay under budget.</Text>
        </Box>
      </Stack>
    </Box>
  );
};

export default Budget;
