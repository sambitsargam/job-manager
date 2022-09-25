import React from "react";
import { Text,Grid,GridItem } from '@chakra-ui/react'
import {ArticleList} from './blog'
import { MiniProfile} from './MiniProfile'
import { MainProfile} from './MainProfile'
import {useLocation} from 'react-router-dom';

export default function Profile() {
  const location = useLocation();
  console.dir(location);
  return (
    <Grid
      h='200px'
      templateRows='repeat(2, 1fr)'
      templateColumns='repeat(5, 1fr)'
      gap={4}
    >
      <GridItem rowSpan={2} colSpan={1} bg='' >
        <MiniProfile {...location.state} />
        </GridItem>
      
      <GridItem colSpan={4} bg='' ><MainProfile {...location.state}></MainProfile></GridItem>
      <GridItem colSpan={4} bg='' ><ArticleList></ArticleList></GridItem>
    </Grid>
    
  );
}
