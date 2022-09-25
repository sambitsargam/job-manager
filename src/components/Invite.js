import React from "react";
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
  
import { LazyMinter } from "../utils/LazyMinter";
import DeHiveToken from "../contracts/contract-address.json";
import {getSigner} from "../utils/contractservice";

export default function Invite() {
    const [inviteUrl, updateInviteUrl] = useState(``)
    const [email, updateEmail] = useState(``)
    const [friendAddress, updateFriendEthAddress] = useState(``)
    async function onChangeEmail(e) {
        updateEmail(e.target.value);
      }
      async function onChangeAddress(e) {
        updateFriendEthAddress(e.target.value);
      }
      async function sendInvite(event) {
        const signer = getSigner();
        console.dir({ DeHiveToken, signer })
          const lazyMinter = new LazyMinter({ DeHiveToken, signer });
        event.preventDefault();
        const memberId=2;
        const memberUri="https://bafybeialldnt7swd75zmnc62s6lpibpdluqtpw4buduxtp5wgie5rhpw5u.ipfs.infura-ipfs.io/";
        const signature = await lazyMinter.createVoucher(memberId,memberUri,0);
        console.dir(signature);
        const invitedUrl = window.location.origin+"/acceptinvite?signature="+signature.signature
        updateInviteUrl(invitedUrl);
    
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
                <FormLabel>Email address</FormLabel>
                <Input type="email" onChange={onChangeEmail} />
              </FormControl>
              <FormControl id="ethaddress">
                <FormLabel>Eth Address</FormLabel>
                <Input type="text" onChange={onChangeAddress}  />
              </FormControl>
              <Stack spacing={10}>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }} onClick={sendInvite}>
                  Send Invite
                </Button>
                {
                          inviteUrl && (
                            <span >{inviteUrl}</span>
                          )
                        }
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }