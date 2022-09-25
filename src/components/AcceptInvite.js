import React from "react";
import {acceptInvite, acceptInviteOpen} from "../utils/contractservice";
import { useState } from 'react'

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

export default function AcceptInvite() {

  const [acceptedHash, updateAcceptedHash] = useState(``)
    const [signature, updateSignature] = useState(``)
    const [friendTokenId, updateFriendTokenId] = useState(``)
    async function onChangeSignature(e) {
      updateSignature(e.target.value);
      }
      async function onChangeId(e) {
        updateFriendTokenId(e.target.value);
      }

  function sendAccept() {
    const tokenId=2;
        const uri="https://bafybeialldnt7swd75zmnc62s6lpibpdluqtpw4buduxtp5wgie5rhpw5u.ipfs.infura-ipfs.io/";
        const minPrice=0;
        const nftVoucher = {tokenId,minPrice,uri};
        console.log(nftVoucher);
    //acceptInvite("0x02A2D65AcF781e2110990426f3D11bDDe99a2b3A",2,nftVoucher);
    acceptInviteOpen(1);


  }
  return (
    <Flex
    minH={'100vh'}
    align={'center'}
    justify={'center'}
    bg={useColorModeValue('gray.50', 'gray.800')}>
    <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
      <Stack align={'center'}>
        <Heading fontSize={'4xl'}>Invite your friend</Heading>
        <Text fontSize={'lg'} color={'gray.600'}>
           <Link color={'blue.400'}>WAGMI</Link> ✌️
        </Text>
      </Stack>
      <Box
        rounded={'lg'}
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'lg'}
        p={8}>
        <Stack spacing={4}>
          <FormControl id="email">
            <FormLabel>Signature</FormLabel>
            <Input type="text" onChange={onChangeSignature} />
          </FormControl>
          <FormControl id="friendTokenId">
            <FormLabel>Friend Id</FormLabel>
            <Input type="text" onChange={onChangeId}  />
          </FormControl>
          <Stack spacing={10}>
            <Button
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }} onClick={sendAccept}>
              Accept Invite
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  </Flex>
  );
}
