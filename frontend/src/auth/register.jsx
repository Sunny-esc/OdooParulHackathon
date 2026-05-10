import { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link as RouterLink } from "react-router-dom";

import {
  Box,
  Button,
  Card,
  Flex,
  Field,
  Heading,
  Input,
  Link,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await api.post("register/", formData);
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.detail || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      px={4}
    >
      <Card.Root
        w="full"
        maxW="md"
        borderRadius="2xl"
        shadow="xl"
        border="1px solid"
        borderColor="gray.200"
      >
        <Card.Body p={10}>
          <Stack gap={8}>
            <Box textAlign="center">
              <Heading
                size="2xl"
                fontWeight="extrabold"
              >
                Create an account
              </Heading>

              <Text mt={2} fontSize="sm">
                Join us today and start your journey
              </Text>
            </Box>

            <form onSubmit={handleSubmit}>
              <Stack gap={5}>
                <Field.Root required>
                  <Field.Label>Username</Field.Label>

                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="johndoe"
                    size="lg"
                    borderRadius="xl"
                    onChange={handleChange}
                  />
                </Field.Root>

                <Field.Root required>
                  <Field.Label>Password</Field.Label>

                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    size="lg"
                    borderRadius="xl"
                    onChange={handleChange}
                  />
                </Field.Root>

                <Button
                  type="submit"
                  size="lg"
                  colorScheme="purple"
                  borderRadius="xl"
                  fontWeight="bold"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Flex align="center" gap={2}>
                      <Spinner size="sm" />
                      <Text>Creating account...</Text>
                    </Flex>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </Stack>
            </form>

            <Text
              textAlign="center"
              fontSize="sm"
              color="gray.600"
            >
              Already have an account?{" "}
              <Link
                as={RouterLink}
                to="/login"
                color="purple.500"
                fontWeight="medium"
                _hover={{
                  textDecoration: "underline",
                }}
              >
                Sign in
              </Link>
            </Text>
          </Stack>
        </Card.Body>
      </Card.Root>
    </Flex>
  );
};

export default Register;