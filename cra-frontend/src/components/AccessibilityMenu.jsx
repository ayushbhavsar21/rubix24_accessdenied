import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  Text,
  VStack,
  SimpleGrid,
  Flex,
  Icon,
  Grid,
  GridItem,
  useColorMode,
  useColorModeValue
} from "@chakra-ui/react";
import { FaAccessibleIcon } from "react-icons/fa6";
import {Link} from "react-router-dom"
import {
  IoContrastOutline,
  IoColorWandOutline,
  IoResize,
  IoText,
  IoPauseOutline,
  IoEyeOffOutline,
  IoReaderOutline,
  IoResizeOutline,
  IoTextOutline,
  IoContrastSharp,
} from "react-icons/io5";
import { FaQuestion, FaTrash } from "react-icons/fa";
import { Divider } from "antd";

const AccessibilityGrid = (props) => {
 const { toggleColorMode } = useColorMode();


  const features = [
    {
      icon: <IoContrastOutline />,
      label: "Contrast",
      func: () => {
        toggleColorMode();
            },
    },
    { icon: <IoColorWandOutline />, label: "Highlight Links" },
    { icon: <IoResize />, label: "Change Font Size" },
    { icon: <IoText />, label: "Text Spacing" },
    { icon: <IoPauseOutline />, label: "Pause Animations" },
    { icon: <IoEyeOffOutline />, label: "Hide Images" },
    { icon: <IoReaderOutline />, label: "Dyslexia Friendly" },
    { icon: <IoResizeOutline />, label: "Line Height" },
    { icon: <IoTextOutline />, label: "Text Align" },
    { icon: <IoContrastSharp />, label: "Saturation" },
  ];

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={4}>
      {features.map((feature, index) => (
        <GridItem key={index}>
          <Box
            borderRadius={"xl"}
            as="button"
            onClick={() => feature.func()}
            p="4"
            borderWidth="1px"
            shadow="md"
            width={"full"}
            height={"full"}
          >
            <Flex direction="column" align="center" justify="center">
              {feature.icon}
              {/* <Icon as={feature.icon} boxSize={8} mb="2" /> */}
              <Text fontSize="md" fontWeight="bold">
                {feature.label}
              </Text>
            </Flex>
          </Box>
        </GridItem>
      ))}
    </Grid>
  );
};

const AccessibilityMenu = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onToggle = () => {
    if (isOpen) {
      onClose();
    } else {
      onOpen();
    }
  };
  const handlePress = (event) => {
    // Check if Control (Cmd on Mac) key is pressed along with 'U'
    if ((event.metaKey || event.ctrlKey) && event.key === "u") {
      event.preventDefault();
      console.log("Control + U pressed");
      onToggle();
    }
  };

  useEffect(() => {
    // Attach event listener when the component mounts
    window.addEventListener("keydown", handlePress);

    // Remove event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handlePress);
    };
  }, []); // Empty dependency array ensures the effect runs only once during mount and unmount

  return (
    <Box color={useColorModeValue("gray.800", "whiteAlpha.900")}>
      <IconButton
        icon={<FaAccessibleIcon />}
        aria-label="Voice Button"
        onClick={onToggle}
        size="lg"
        colorScheme="teal"
        aria-labelledby="voice-assistant"
      />

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        size={{ base: "full", md: "md" }} // Responsive width based on screen size
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Accessibility Menu</DrawerHeader>
          <DrawerBody bg={useColorModeValue("gray.100", "gray.900")}>
            <VStack spacing={4} my={4}>

          <Button as={Link} width={"full"} colorScheme="teal" to={"/help"}  borderRadius={"xl"} size={"lg"}> <Icon as={FaQuestion} mr={2} /> How to use</Button>
          <Button as={Link} width={"full"} colorScheme="red"  borderRadius={"xl"} size={"lg"}> <Icon as={FaTrash} mr={2} /> Clear All Setttings</Button>
            </VStack>
            <Divider/>
            <AccessibilityGrid {...props} />

          </DrawerBody>
          <DrawerFooter>
            {/* Add your footer content for the drawer here */}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default AccessibilityMenu;