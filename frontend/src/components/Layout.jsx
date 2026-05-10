import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Box, Container } from "@chakra-ui/react";
import TopNavbar from "./TopNavbar";

const Layout = ({ children }) => {
  const { token } = useContext(AuthContext);

  if (!token) {
    return <>{children}</>;
  }

  return (
    <Box minH="100vh" bg="bg">
      <TopNavbar />
      <Container maxW="container.xl" py={8}>
        {children}
      </Container>
    </Box>
  );
};

export default Layout;