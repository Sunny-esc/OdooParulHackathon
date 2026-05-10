import { useContext, useState } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import {
  Avatar,
  Box,
  Button,
  CloseButton,
  Drawer,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  Menu,
  Portal,
  Stack,
  Text,
  Link,
} from "@chakra-ui/react";

import {
  FiActivity,
  FiBell,
  FiBookOpen,
  FiCalendar,
  FiDollarSign,
  FiHome,
  FiLogOut,
  FiMap,
  FiMenu,
  FiPackage,
  FiPlus,
  FiSearch,
  FiUser,
} from "react-icons/fi";

const TopNavbar = () => {
  const { user, logout } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/activities?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const NavLinks = ({ mobile = false }) => (
    <Stack
      direction="column"
      gap={mobile ? 4 : 1}
      align={mobile ? "stretch" : "center"}
    >
      {menuItems.map((item) => {
        const isActive = location.pathname === item.to;

        return (
          <Link
            key={item.to}
            as={RouterLink}
            to={item.to}
            px={3}
            py={2}
            rounded="lg"
            bg={isActive ? "blue.50" : "transparent"}
            color={isActive ? "blue.600" : "gray.700"}
            _hover={{
              textDecoration: "none",
              bg: "blue.50",
              color: "blue.600",
            }}
            display="flex"
            alignItems="center"
            gap={3}
            fontWeight="medium"
            onClick={mobile ? () => setOpen(false) : undefined}
          >
            <Icon as={item.icon} />
            <Text>{item.label}</Text>
          </Link>
        );
      })}
    </Stack>
  );

  return (
    <>
      <Box
        position="sticky"
        top="0"
        zIndex="1000"
        bg={{ base: "whiteAlpha.900", _dark: "gray.950" }}
        backdropFilter="blur(10px)"
        borderBottomWidth="1px"
        borderColor={{ base: "gray.200", _dark: "gray.700" }}
      >
        <Flex
          maxW="7xl"
          mx="auto"
          px={{ base: 4, md: 6 }}
          py={3}
          align="center"
          justify="space-between"
        >
          {/* Logo */}
          <Link
            as={RouterLink}
            to="/dashboard"
            _hover={{ textDecoration: "none" }}
          >
            <Text
              fontSize="2xl"
              fontWeight="bold"
              color="blue.500"
            >
              Traveloop
            </Text>
          </Link>

          {/* Desktop Nav */}
          <HStack
            gap={2}
            display={{ base: "none", lg: "flex" }}
          >
            {menuItems.slice(0, 6).map((item) => {
              const isActive = location.pathname === item.to;

              return (
                <Link
                  key={item.to}
                  as={RouterLink}
                  to={item.to}
                  px={3}
                  py={2}
                  rounded="lg"
                  bg={isActive ? "blue.50" : "transparent"}
                  color={isActive ? "blue.600" : ""}
                  _hover={{
                    textDecoration: "none",
                    bg: "blue.50",
                    color: "blue.600",
                  }}
                  fontWeight="medium"
                >
                  {item.label}
                </Link>
              );
            })}
          </HStack>

          {/* Actions */}
          <HStack gap={3}>
            {/* Search */}
            <InputGroup
              startElement={<Icon as={FiSearch} color="gray.400" />}
              maxW="220px"
              display={{ base: "none", md: "flex" }}
            >
              <Input
                placeholder="Search activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                bg="gray.100"
                border="none"
                _focus={{
                  bg: "white",
                }}
              />
            </InputGroup>

            {/* Notifications */}
            <IconButton
              aria-label="Notifications"
              variant="ghost"
              size="sm"
            >
              <FiBell />
            </IconButton>

            {/* User Menu */}
            <Menu.Root>
              <Menu.Trigger asChild>
                <Button
                  variant="ghost"
                  p={0}
                  minW="auto"
                  rounded="full"
                >
                  <Avatar.Root size="sm">
                    <Avatar.Fallback
                      name={user?.username || "Traveler"}
                    />
                  </Avatar.Root>
                </Button>
              </Menu.Trigger>

              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.Item
                      value="profile"
                      as={RouterLink}
                      to="/profile"
                    >
                      <FiUser />
                      Profile
                    </Menu.Item>

                    <Menu.Item
                      value="logout"
                      onClick={logout}
                    >
                      <FiLogOut />
                      Logout
                    </Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>

            {/* Mobile Menu */}
            <IconButton
              aria-label="Menu"
              variant="ghost"
              display={{ base: "flex", lg: "none" }}
              onClick={() => setOpen(true)}
            >
              <FiMenu />
            </IconButton>
          </HStack>
        </Flex>
      </Box>

      {/* Mobile Drawer */}
      <Drawer.Root
        open={open}
        onOpenChange={setOpen}
        placement="start"
      >
        <Portal>
          <Drawer.Backdrop />

          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.Header>
                <Flex
                  align="center"
                  justify="space-between"
                  w="full"
                >
                  <Text
                    fontSize="2xl"
                    fontWeight="bold"
                    color="blue.500"
                  >
                    Traveloop
                  </Text>

                  <Drawer.CloseTrigger asChild>
                    <CloseButton />
                  </Drawer.CloseTrigger>
                </Flex>
              </Drawer.Header>

              <Drawer.Body>
                <Stack gap={5}>
                  <InputGroup startElement={<Icon as={FiSearch} color="gray.400" />}>
                    <Input
                      placeholder="Search activities..."
                      value={searchQuery}
                      onChange={(e) =>
                        setSearchQuery(e.target.value)
                      }
                      onKeyDown={handleSearch}
                    />
                  </InputGroup>

                  <NavLinks mobile />
                </Stack>
              </Drawer.Body>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </>
  );
};

export default TopNavbar;