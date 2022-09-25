import React from "react";
import ReactDOM from "react-dom";
import { Footer } from "./components/Footer";
import { Nav } from "./components/Nav";
import { ChakraProvider } from '@chakra-ui/react'
import {
  Container,
  Stack
} from '@chakra-ui/react';
import Invite from "./components/Invite";
import AcceptInvite from "./components/AcceptInvite";
import Profile from "./components/Profile";
import Company from "./components/Company";
import Setup from "./components/Setup";
import Home from "./components/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

ReactDOM.render(
    <ChakraProvider>
      <Container maxW='container.xl'>
        <Router>
          <Stack>
            <Nav></Nav>
          </Stack>
          <Stack>
            <Container maxW={'5xl'}>
              <Routes>
                <Route path="/invite" element={<Invite/>} />
                <Route path="/accept" element={<AcceptInvite/>} />
                <Route path="/profile" element={<Profile/>} />
                <Route path="/company" element={<Company/>} />
                <Route path="/setup" element={<Setup/>} />
                <Route path="/" element={<Home/>} />
              </Routes>
            </Container>
          </Stack>
        </Router>
        <Stack>
          
        </Stack>
      </Container>
    </ChakraProvider>,
    document.getElementById("root")
);

