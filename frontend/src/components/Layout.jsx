import { useContext } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  Box,
  VStack,
  Link,
  Text,
  Separator,
  Icon,
  Flex,
  Avatar,
  Button,
} from "@chakra-ui/react";
import { useColorModeValue } from "./ui/color-mode";
import { FiHome, FiPlus, FiMap, FiCalendar, FiSearch, FiActivity, FiDollarSign, FiPackage, FiUser, FiBookOpen } from "react-icons/fi";

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const menuItems = [
    { to: "/dashboard", label: "Dashboard", icon: FiHome },
    { to: "/create-trip", label: "Create Trip", icon: FiPlus },
    { to: "/trips", label: "My Trips", icon: FiMap },
    { to: "/itinerary-builder", label: "Itinerary Builder", icon: FiCalendar },
    { to: "/cities", label: "City Search", icon: FiSearch },
    { to: "/activities", label: "Activities", icon: FiActivity },
    { to: "/budget", label: "Budget", icon: FiDollarSign },
    { to: "/packing", label: "Packing", icon: FiPackage },
    { to: "/journal", label: "Journal", icon: FiBookOpen },
    { to: "/profile", label: "Profile", icon: FiUser },
  ];

  return (
    <Box
      w="250px"
      h="100vh"
      bg={bg}
      borderRight="1px"
      borderColor={borderColor}
      position="fixed"
      left={0}
      top={0}
      zIndex={10}
      display={{ base: "none", lg: "block" }}
    >
      <Box p={6}>
        <Text fontSize="2xl" fontWeight="bold" color="travel.500">
          Traveloop
        </Text>
      </Box>
      <Separator />
      <VStack spacing={2} align="stretch" p={4}>
        {menuItems.map((item) => (
          <Link
            key={item.to}
            as={RouterLink}
            to={item.to}
            p={3}
            rounded="lg"
            bg={location.pathname === item.to ? "travel.50" : "transparent"}
            color={location.pathname === item.to ? "travel.700" : "inherit"}
            _hover={{ bg: "travel.50", color: "travel.700" }}
            display="flex"
            alignItems="center"
            gap={3}
          >
            <Icon as={item.icon} />
            <Text>{item.label}</Text>
          </Link>
        ))}
      </VStack>
      <Separator />
      <Box p={4}>
        <Flex align="center" gap={3} mb={4}>
          <Avatar.Root size={"sm"}>
            <Avatar.Fallback name={user?.username || "Traveler"} />
            <Avatar.Image src="https://bit.ly/sage-adebayo" />
          </Avatar.Root>
          <Box>
            <Text fontWeight="semibold">{user?.username || "Traveler"}</Text>
            <Text fontSize="sm" color="gray.500">{user?.email}</Text>
          </Box>
        </Flex>
        <Button size="sm" variant="outline" onClick={logout} w="full">
          Logout
        </Button>
      </Box>
    </Box>
  );
};

const Layout = ({ children }) => {
  const { token } = useContext(AuthContext);

  if (!token) {
    return <>{children}</>;
  }

  return (
    <Flex>
      <Sidebar />
      <Box ml={{ base: 0, lg: "250px" }} flex={1}>
        {children}
      </Box>
    </Flex>
  );
};

export default Layout;