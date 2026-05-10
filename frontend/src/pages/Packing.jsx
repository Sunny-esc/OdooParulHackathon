import { useEffect, useState } from "react";
import {
  Accordion,
  Box,
  Button,
  Checkbox,
  Flex,
  Field,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useColorModeValue } from "../components/ui/color-mode";
import { getPackingChecklist } from "../services/mockData";

const Packing = () => {
  const [groups, setGroups] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    getPackingChecklist().then(setGroups);
  }, []);

  const toggleItem = (groupId, itemId) => {
    setGroups((prev) => prev.map((group) => {
      if (group.id !== groupId) return group;
      return {
        ...group,
        items: group.items.map((item) => item.id === itemId ? { ...item, completed: !item.completed } : item),
      };
    }));
  };

  const addChecklistItem = () => {
    if (!newItem || !newCategory) return;
    setGroups((prev) => {
      const existing = prev.find((group) => group.category === newCategory);
      if (existing) {
        return prev.map((group) => group.category === newCategory ? { ...group, items: [...group.items, { id: Date.now(), label: newItem, completed: false }] } : group);
      }
      return [...prev, { id: Date.now(), category: newCategory, items: [{ id: Date.now() + 1, label: newItem, completed: false }] }];
    });
    setNewItem("");
    setNewCategory("");
  };

  return (
    <Box p={{ base: 4, md: 8 }}>
      <Stack spacing={6}>
        <Box>
          <Heading size="lg">Packing checklist</Heading>
          <Text color={useColorModeValue("gray.600", "gray.300")}>Manage your packing list and tick off essentials before departure.</Text>
        </Box>
        <Flex gap={4} direction={{ base: "column", md: "row" }}>
          <Field.Root>
            <Field.Label>Item</Field.Label>
            <Input value={newItem} onChange={(e) => setNewItem(e.target.value)} placeholder="Add new item" p={4} />
          </Field.Root>
          <Field.Root>
            <Field.Label>Category</Field.Label>
            <Input value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder="e.g. Essentials" p={4} />
          </Field.Root>
          <Button alignSelf="flex-end" colorScheme="blue" onClick={addChecklistItem}>Add</Button>
        </Flex>

        <Accordion.Root multiple>
          {groups.map((group) => (
            <Accordion.Item key={group.id} bg={useColorModeValue("white", "gray.700")} rounded="3xl" border="none" shadow="sm" value={group.id}>
              <Accordion.ItemTrigger px={6} py={5}>
                <Box flex="1" textAlign="left">
                  <Heading size="md">{group.category}</Heading>
                  <Text color={useColorModeValue("gray.600", "gray.300")}>{group.items.length} items</Text>
                </Box>
                <Accordion.ItemIndicator />
              </Accordion.ItemTrigger>
              <Accordion.ItemContent pb={6} px={6}>
                <Accordion.ItemBody>
                  <Stack spacing={3}>
                    {group.items.map((item) => (
                      <Flex key={item.id} align="center" justify="space-between" p={4} bg={useColorModeValue("gray.50", "gray.800")} rounded="2xl">
                        <Checkbox.Root
                            checked={item.completed}
                            onCheckedChange={() => toggleItem(group.id, item.id)}
                            >
                            <Checkbox.HiddenInput />

                            <Checkbox.Control>
                                <Checkbox.Indicator />
                            </Checkbox.Control>

                            <Checkbox.Label>
                                {item.label}
                            </Checkbox.Label>
                            </Checkbox.Root>
                        <Button size="sm" variant="ghost" colorScheme="red">Remove</Button>
                      </Flex>
                    ))}
                  </Stack>
                </Accordion.ItemBody>
              </Accordion.ItemContent>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </Stack>
    </Box>
  );
};

export default Packing;
