import React from "react";

import { NetworkErrorMessage } from "./NetworkErrorMessage";
import { Button } from '@chakra-ui/react'


export function ConnectWallet({ connectWallet, networkError, dismiss }) {
  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-12 text-center">
          {/* Metamask network should be set to Localhost:8545. */}
          {networkError && (
            <NetworkErrorMessage 
              message={networkError} 
              dismiss={dismiss} 
            />
          )}
        </div>
        <div className="col-6 p-4 text-center">
          <Button
          rounded={'full'}
          px={6}
          colorScheme={'orange'}
          bg={'orange.400'}
          _hover={{ bg: 'orange.500' }}
            onClick={connectWallet}
          >
            Connect Wallet
          </Button>
        </div>
      </div>
    </div>
  );
}
