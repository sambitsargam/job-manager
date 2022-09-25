
import { create } from 'ipfs-http-client'
import contractAddress from "../contracts/contract-address.json";
import { ethers } from "ethers";
import DeHiveTokenArtifact from "../contracts/DeHiveToken.json";

  export async function addMember(memberProps) {
    const client = create('https://ipfs.infura.io:5001/api/v0')
    //https://ipfs.infura.io/ipfs/QmZRWJa3e1uVfBeDDuTkxcBK5m9GJ5zmWiN2LBH66PBtrS
    let nftMetaData = {
      "description": memberProps.desc,
      "image": memberProps.image,
      "name": memberProps.name,
      "attributes": [
      {
      "trait_type": "Experience",
      "value": 10
      },
      {
      "trait_type": "Company",
      "value": "Metaverse"
      },
      {
      "trait_type": "Domain",
      "value": "Ethereum"
      },

      ]
      }
      const added = await client.add(JSON.stringify(nftMetaData));
      const metadataUrl = `https://ipfs.infura.io/ipfs/${added.path}`
      console.dir(nftMetaData);
      console.log("metadaurl "+metadataUrl);
    const addMember = await getHiveToken().addMember(memberProps.name,metadataUrl);
    console.log(addMember);
  }

  export function getHiveToken() {
    const _provider = new ethers.providers.Web3Provider(window.ethereum);
    const _hiveToken = new ethers.Contract(
        contractAddress.DeHiveToken,
        DeHiveTokenArtifact.abi,
        _provider.getSigner(0)
      )
      return _hiveToken
  }
  export function getSigner() {
    const _provider = new ethers.providers.Web3Provider(window.ethereum);
        return _provider.getSigner(0);
  }
  export async function acceptInvite(address,memberId,voucher) {
      const acceptedInvite = await getHiveToken().acceptInvite(address,memberId,voucher);
      console.log(acceptedInvite);
  }
  export async function acceptInviteOpen(memberId) {
      const acceptedInvite = await getHiveToken().acceptInviteOpen(memberId);
      console.log(acceptedInvite);
  }