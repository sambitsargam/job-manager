import React from "react";
import Invite from "./Invite";
import AcceptInvite from "./AcceptInvite";
import Company from "./Company";
import Profile from "./Profile";
import Setup from "./Setup";
import Home from "./Home";

const routes = {
  "/invite": () => <Invite />,
  "/accept": () => <AcceptInvite />,
  "/profile": () => <Profile />,
  "/company": () => <Company />,
  "/setup": () => <Setup />,
  "/": () => <Home />
};

export default routes;