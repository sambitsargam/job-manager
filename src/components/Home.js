import React from "react";
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Image,
  Stack
} from '@chakra-ui/react';

export default function Home() {
  return (
        <Container maxW={'5xl'}>
          <Stack
            textAlign={'center'}
            align={'center'}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 20, md: 28 }}>
              <Image
                boxSize='170px'
                src='/logo.png'
                alt='DeHive'
              />
            <Heading
              fontWeight={600}
              fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
              lineHeight={'110%'}>
              Take back control of your {' '}
              <Text as={'span'} color={'orange.400'}>
               Professional Profile and Contacts
              </Text>
            </Heading>
            <Text color={'gray.500'} maxW={'3xl'}>
            Stop relying on centralized services to own your professional profile and contacts. Take back control and democratize the data.
            </Text>
            <Stack spacing={6} direction={'row'}>
              <Button
                rounded={'full'}
                px={6}
                colorScheme={'orange'}
                bg={'orange.400'}
                _hover={{ bg: 'orange.500' }}>
                Get started
              </Button>
              <Button rounded={'full'} px={6}>
                Learn more
              </Button>
              <Box>
                <Text
                  fontSize={'lg'}
                  fontFamily={'Caveat'}
                  position={'absolute'}
                  right={'-125px'}
                  top={'-15px'}
                  transform={'rotate(10deg)'}>
                  Started at ethdenver 2022
                </Text>
              </Box>
            </Stack>
          </Stack>
      </Container>
  );
}
