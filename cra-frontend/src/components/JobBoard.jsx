import React, { useState } from "react";
import {
  Box,
  Flex,
  Modal,
  SimpleGrid,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  Badge,
  Radio,
  RadioGroup,
  IconButton,
  Slider,
  Button,
  Text,
  Icon,
  Divider,
  Image,
  Container,
  ButtonGroup,
  GridItem,
  Grid,
} from "@chakra-ui/react";
import {
  FaCalendarWeek,
  FaClock,
  FaFilter,
  FaInfo,
  FaMapPin,
} from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaLocationArrow } from "react-icons/fa";

const dummyJobData = [
  {
    id: 1,
    position: "Software Engineer",
    company: "TechCo",
    ctc: "$100,000",
    modeOfWork: "Remote",
    place: "Any",
    startDate: "ASAP",
    experience: "2+ years",
    description: "Exciting job opportunity for a software engineer...",
    postDate: "2024-01-20",
  },
  {
    id: 2,
    position: "Product Manager",
    company: "ProductX",
    ctc: "$120,000",
    modeOfWork: "Hybrid",
    place: "New York",
    startDate: "2024-03-01",
    experience: "5+ years",
    description:
      "Join our team as a product manager and lead innovative projects...",
    postDate: "2024-01-15",
  },
  {
    id: 3,
    position: "Data Scientist",
    company: "DataTech",
    ctc: "$90,000",
    modeOfWork: "On-site",
    place: "San Francisco",
    startDate: "2024-02-15",
    experience: "3+ years",
    description:
      "Exciting opportunity for a data scientist to work on cutting-edge projects...",
    postDate: "2024-01-10",
  },
];

const FilterBox = ({ filterFunction }) => {
  const [position, setPosition] = useState("");
  const [locations, setLocations] = useState([]);
  const [workType, setWorkType] = useState("");
  const [salary, setSalary] = useState([0, 1000000]);
  const [experience, setExperience] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleFilterChange = () => {
    const searchState = {
      position,
      locations,
      workType,
      salary,
      experience,
    };

    console.log("Search State:", searchState);
    filterFunction(searchState);
  };

  const handleClearAll = () => {
    setPosition("");
    setLocations([]);
    setWorkType("");
    setSalary([0, 1000000]);
    setExperience("");
    handleFilterChange();
  };

  return (
    <Box p={4} m={4} boxShadow={"xl"} py={[6, 12]}>
      <Box display={{ base: "inline", md: "none" }}>
        <Text>View Filters</Text>
        <IconButton
          icon={<FaFilter />}
          aria-label="Filter"
          onClick={onOpen}
          mb={4}
        />
      </Box>

      {/* Filter Box content */}
      <Box display={{ base: "none", md: "inline" }}>
        <strong>Position:</strong>
        <Input
          placeholder="Search by position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          mb={2}
        />

        <Box mb={2}>
          <Box>
            <strong>Locations:</strong>
          </Box>
          {locations.map((location) => (
            <Badge key={location} variant="outline" colorScheme="teal" mr={2}>
              {location}
            </Badge>
          ))}
          <Input
            placeholder="Add location"
            value={locations}
            onChange={(e) => setLocations([...locations, e.target.value])}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                setLocations([...locations, e.target.value]);
              }
            }}
          />
        </Box>

        <Box mb={2}>
          <strong>Work Type:</strong>
          <RadioGroup value={workType} onChange={(e) => setWorkType(e)}>
            <Radio value="remote">Work from Home</Radio>
            <Radio value="partTime">Part Time</Radio>
            <Radio value="hybrid">Hybrid</Radio>
          </RadioGroup>
        </Box>

        <Box mb={2}>
          <strong>Salary Range:</strong>
          <Slider
            colorScheme="teal"
            min={0}
            max={1000000}
            step={10000}
            value={salary}
            onChange={(value) => setSalary(value)}
          />
          {`₹${salary[0]} - ₹${salary[1]}`}
        </Box>

        <Box mb={2}>
          <strong>Years of Experience:</strong>
          <Input
            placeholder="Enter experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />
        </Box>

        <Button colorScheme="teal" onClick={handleFilterChange} mb={2}>
          Include
        </Button>

        <Button variant="outline" colorScheme="teal" onClick={handleClearAll}>
          Clear All
        </Button>
      </Box>

      {/* Modal for smaller screens */}
      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Filter Box</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Render the same content as in the Box for smaller screens */}
            {/* ... */}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

const JobList = ({ jobs }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalContent, setModalContent] = useState("Hello, I'm a modal!");

  const handleOpenModal = () => {
    // You can set the content dynamically here if needed
    onOpen();
  };

  return (
    <Box width={{ base: "full", md: "10/12" }} p={4}>
      {jobs.map((job) => (
        <Box
          key={job.id}
          boxShadow="md"
          borderWidth="1px"
          borderRadius="lg"
          p={4}
          mb={2}
        >
          <Text
            align={"left"}
            alignItems={"center"}
            size={"lg"}
            borderRadius={"full"}
          >
            <Badge variant={"outline"}>
              <Icon as={FaArrowTrendUp} mr={2} />
              ACTIVELY HIRING
            </Badge>
          </Text>
          <Flex direction={"row"} justify="space-between" align="center" mt={2}>
            <Text fontSize="3xl" fontWeight="bold" align={"left"}>
              {job.position}
            </Text>
            <Image src={"logo192.png"} alt={job.company} w={10} h={10}></Image>
          </Flex>

          <Flex
            direction="row"
            justify="space-between"
            align="center"
            color={"gray.500"}
            fontWeight={"bold"}
            mb={1}
          >
            <Text fontSize="lg">{job.company}</Text>
          </Flex>
          <Divider my={2} />
          <Flex>
            <Button leftIcon={<FaMapPin />} variant="link" mb={2}>
              Location | Work From Home
            </Button>
          </Flex>

          <Flex>
            <ButtonGroup spacing={2} ml={1}>
              <Button
                leftIcon={<FaCalendarWeek />}
                variant="link"
                colorScheme="gray"
                mb={2}
              >
                Posted At
              </Button>
              <Button
                leftIcon={<FaClock />}
                variant="link"
                colorScheme="gray"
                mb={2}
              >
                Schedule
              </Button>
            </ButtonGroup>
          </Flex>

          <Divider my={2} />
          <Flex justify={"space-between"}>
            <Button leftIcon={<FaLocationArrow />} variant="link" m={2}>
              Via
            </Button>
            <Button
              variant={"outline"}
              colorScheme={"teal"}
              bordersize={"lg"}
              m={2}
              onClick={handleOpenModal}
            >
              View Details
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} size="full">
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>{job.position}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>{job.description}</ModalBody>

                <ModalFooter>
                  <Button
                    colorScheme="red"
                    width={"full"}
                    mr={3}
                    onClick={onClose}
                  >
                    CLose
                  </Button>
                  <Button
                    colorScheme="teal"
                    width={"full"}
                    mr={3}
                    onClick={onClose}
                  >
                    Apply
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Flex>
        </Box>
      ))}
    </Box>
  );
};

const JobBoard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [filteredJobs, setFilteredJobs] = useState(dummyJobData);

  const handleFilter = (filter) => {
    const filtered = dummyJobData.filter((job) =>
      job.position.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredJobs(filtered);
  };

  return (
    <Container maxW="container.xl">
      {/* Adjusted grid template columns for responsiveness */}
      <Grid templateColumns={{ base: "1fr", md: "2fr 3fr" }} gap={4}>
        <GridItem>
          <FilterBox filterFunction={handleFilter} />
        </GridItem>
        <GridItem>
          <JobList jobs={filteredJobs} />
        </GridItem>
      </Grid>
    </Container>
  );
};

export default JobBoard;
