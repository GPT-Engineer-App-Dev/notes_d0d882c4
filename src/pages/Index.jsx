import React, { useState } from "react";
import { Box, Container, Heading, VStack, HStack, IconButton, Input, Textarea, useColorModeValue, Grid, GridItem, useToast } from "@chakra-ui/react";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState({ title: "", content: "" });
  const toast = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentNote({
      ...currentNote,
      [name]: value,
    });
  };

  const addNote = () => {
    if (!currentNote.title || !currentNote.content) {
      toast({
        title: "Error",
        description: "Title and content cannot be empty.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setNotes([...notes, { ...currentNote, id: Date.now() }]);
    setCurrentNote({ title: "", content: "" });
  };

  const deleteNote = (noteId) => {
    const updatedNotes = notes.filter((note) => note.id !== noteId);
    setNotes(updatedNotes);
  };

  const editNote = (note) => {
    setCurrentNote({
      title: note.title,
      content: note.content,
    });
    deleteNote(note.id);
  };

  return (
    <Container maxW="container.md" py={5}>
      <VStack spacing={4} align="stretch">
        <Heading mb={6}>Note Taking App</Heading>
        <Box p={4} bg={useColorModeValue("gray.100", "gray.700")} borderRadius="md">
          <HStack mb={4}>
            <Input placeholder="Title" variant="filled" name="title" value={currentNote.title} onChange={handleInputChange} />
            <IconButton colorScheme="blue" aria-label="Add note" icon={<FaPlus />} onClick={addNote} />
          </HStack>
          <Textarea placeholder="Take a note..." variant="filled" name="content" value={currentNote.content} onChange={handleInputChange} />
        </Box>
        <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
          {notes.map((note) => (
            <GridItem key={note.id} bg={useColorModeValue("white", "gray.600")} p={3} borderRadius="md" shadow="md">
              <VStack align="stretch" spacing={3}>
                <Heading size="md" isTruncated>
                  {note.title}
                </Heading>
                <Box flexGrow={1} minHeight="100px">
                  {note.content}
                </Box>
                <HStack justifyContent="space-between">
                  <IconButton size="sm" colorScheme="green" aria-label="Edit note" icon={<FaEdit />} onClick={() => editNote(note)} />
                  <IconButton size="sm" colorScheme="red" aria-label="Delete note" icon={<FaTrash />} onClick={() => deleteNote(note.id)} />
                </HStack>
              </VStack>
            </GridItem>
          ))}
        </Grid>
      </VStack>
    </Container>
  );
};

export default Index;
