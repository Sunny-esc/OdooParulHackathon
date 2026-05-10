import { useState, useContext } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";

import {
  Box,
  Button,
  Card,
  Checkbox,
  Flex,
  Field,
  Heading,
  Input,
  Link,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

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
      const res = await api.post("token/", formData);

      login(res.data.access);
      navigate("/dashboard");
    } catch (error) {
      console.error(error.response?.data);

      alert(
        error.response?.data?.detail ||
          "Invalid credentials. Please try again."
      );
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
                Welcome back
              </Heading>

              <Text mt={2} fontSize="sm">
                Please enter your details to sign in
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

                <Flex align="center" justify="space-between">
                  <Checkbox.Root>
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                    <Checkbox.Label>
                      Remember me
                    </Checkbox.Label>
                  </Checkbox.Root>

                  <Link
                    fontSize="sm"
                    color="purple.500"
                    _hover={{
                      color: "purple.600",
                    }}
                  >
                    Forgot password?
                  </Link>
                </Flex>

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
                      <Text>Signing in...</Text>
                    </Flex>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </Stack>
            </form>

            <Text
              textAlign="center"
              fontSize="sm"
              color="gray.600"
            >
              Don't have an account?{" "}
              <Link
                as={RouterLink}
                to="/register"
                color="purple.500"
                fontWeight="medium"
                _hover={{
                  textDecoration: "underline",
                }}
              >
                Sign up for free
              </Link>
            </Text>
          </Stack>
        </Card.Body>
      </Card.Root>
    </Flex>
  );
};

export default Login;