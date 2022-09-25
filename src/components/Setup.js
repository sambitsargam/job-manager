import React from "react";
import { useState } from 'react'
import { create } from 'ipfs-http-client'
import {addMember} from '../utils/contractservice';
import {
  Container,
  Flex,
  Box,
  Button,
  VStack,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
} from '@chakra-ui/react';


import { BsPerson } from 'react-icons/bs';
import { useNavigate } from "react-router-dom";

export default function Setup() {
  const navigate = useNavigate();
  const [fileUrl, updateFileUrl] = useState(``)
  const [name, updateName] = useState(``)
  const [desc, updateDesc] = useState(``)
  const client = create('https://ipfs.infura.io:5001/api/v0')
  async function onChange(e) {
    const file = e.target.files[0]
    try {
      const added = await client.add(file)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      updateFileUrl(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }
  async function onChangeName(e) {
    updateName(e.target.value);
  }
  async function onChangeDesc(e) {
    updateDesc(e.target.value);
  }
  async function createProfile(event) {
    event.preventDefault();
    const fileUrl1="https://ipfs.infura.io/ipfs/QmZRWJa3e1uVfBeDDuTkxcBK5m9GJ5zmWiN2LBH66PBtrS";
    const name1="John Doe"
    const desc1="lorem ipsum"
    updateName(name1);
    updateFileUrl(fileUrl1)
    updateDesc(desc1)
    const memberData = {
      name:name,
      image:fileUrl1,
      desc:desc
    }
    console.log(memberData);
    await addMember(memberData);
    navigate("/profile",{state:memberData});
  }
  return (
    <Container bg="" maxW="full" mt={0} centerContent overflow="hidden">
      <Flex>
        <Box
          bg="#02054B"
          color="white"
          borderRadius="lg"
          m={{ sm: 4, md: 16, lg: 10 }}
          p={{ sm: 5, md: 5, lg: 16 }}>
          <Box p={4}>
            <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
              <WrapItem>
                <Box bg="white" borderRadius="lg">
                  <Box m={8} color="#0B0E3F">
                    <VStack spacing={5}>
                      <FormControl id="name">
                        <FormLabel>Your Name</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                          <InputLeftElement
                            pointerEvents="none"
                            children={<BsPerson color="gray.800" />}
                          />
                          <Input type="text" onChange={onChangeName} size="md" />
                        </InputGroup>
                      </FormControl>
                      <FormControl id="name">
                        <FormLabel>Description</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                          <InputLeftElement
                            pointerEvents="none"
                          />
                          <Textarea
                          borderColor="gray.300"
                          _hover={{
                            borderRadius: 'gray.300',
                          }}
                          onChange={onChangeDesc}
                          placeholder="description"
                          />
                        </InputGroup>
                      </FormControl>
                      <FormControl id="name">
                        <FormLabel>Profile Image</FormLabel>
                        <input
                          type="file"
                          onChange={onChange}
                        />
                        {
                          fileUrl && (
                            <img src={fileUrl} width="600px" />
                          )
                        }
                      </FormControl>
                      <FormControl id="name" float="right">
                        <Button
                          variant="solid"
                          bg="#0D74FF"
                          color="white"
                          _hover={{}} onClick= {createProfile} >
                          Create my Profile
                        </Button>
                      </FormControl>
                    </VStack>
                  </Box>
                </Box>
              </WrapItem>
            </Wrap>
          </Box>
        </Box>
      </Flex>
    </Container>
  );
}