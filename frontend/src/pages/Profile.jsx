import { useContext, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Field,
  Heading,
  Input,
  SimpleGrid,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";
import { useColorModeValue } from "../components/ui/color-mode";
import { AuthContext } from "../context/AuthContext";
import { getProfileData } from "../services/mockData";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", city: "" });

  useEffect(() => {
    getProfileData().then((data) => {
      setProfile(data);
      setForm({ name: data.name, email: data.email, city: data.city });
    });
  }, []);

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSave = () => {
    alert("Profile updates are saved locally in the mocked frontend.");
  };

  return (
    <Box p={{ base: 4, md: 8 }}>
      <Stack spacing={6}>
        <Flex align="center" justify="space-between">
          <Box>
            <Heading size="lg">Profile settings</Heading>
            <Text color={useColorModeValue("gray.600", "gray.300")}>Manage your account and travel preferences.</Text>
          </Box>
          <Avatar.Root size={"sm"}>
            <Avatar.Fallback name={user?.username || "Traveler"} />
            <Avatar.Image src="https://bit.ly/sage-adebayo" />
          </Avatar.Root>
        </Flex>

        <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
          <Box bg={useColorModeValue("white", "gray.700")} rounded="3xl" p={6} shadow="sm">
            <Heading size="md" mb={4}>Personal info</Heading>
            <Stack spacing={4}>
              <Field.Root>
                <Field.Label>Name</Field.Label>
                <Input value={form.name} onChange={handleChange("name")} />
              </Field.Root>
              <Field.Root>
                <Field.Label>Email</Field.Label>
                <Input value={form.email} onChange={handleChange("email")} />
              </Field.Root>
              <Field.Root>
                <Field.Label>Home city</Field.Label>
                <Input value={form.city} onChange={handleChange("city")} />
              </Field.Root>
              <Button colorScheme="blue" onClick={handleSave}>Save changes</Button>
            </Stack>
          </Box>

          <Box bg={useColorModeValue("white", "gray.700")} rounded="3xl" p={6} shadow="sm">
            <Heading size="md" mb={4}>Preferences</Heading>
            <Stack spacing={3}>
              <Text>Saved destinations</Text>
              {profile?.savedDestinations.map((destination) => (
                <Tag.Root key={destination}>
  <Tag.Label>{destination}</Tag.Label>
</Tag.Root>
              ))}
              <Text mt={4}>Travel preferences</Text>
              {profile?.preferences.map((pref) => (
                <Tag.Root key={pref}>
  <Tag.Label>{pref}</Tag.Label>
</Tag.Root>

              ))}
              <Button variant="solid" style={{backgroundColor:"red"}} mt={6}>Delete account</Button>
            </Stack>
          </Box>
        </SimpleGrid>
      </Stack>
    </Box>
  );
};

export default Profile;
