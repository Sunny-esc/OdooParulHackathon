import { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { AuthContext } from "../src/context/AuthContext";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Link,
  Text,
} from "@chakra-ui/react";

const Navbar = () => {
  const { token, user, logout } = useContext(AuthContext);

  if (!token) return null;

  return (
    <Box as="header" bg="white" borderBottom="1px" borderColor="gray.200" px={{ base: 4, md: 8 }} py={4} shadow="sm" display={{ base: "block", lg: "none" }}>
      <Flex align="center" justify="space-between">
        <Link as={RouterLink} to="/dashboard" fontWeight="bold" fontSize="lg" color="travel.500">
          Traveloop
        </Link>
        <Flex align="center" gap={3}>
          <Avatar size="sm" name={user?.username || "Traveler"} />
          <Text display={{ base: "none", md: "block" }}>Welcome {user?.username || "Traveler"}</Text>
          <Button size="sm" variant="outline" onClick={logout}>
            Logout
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;