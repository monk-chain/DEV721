// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DEV721 is ERC721Enumerable, Ownable {
    using Strings for uint256;

    string public baseURI = "https://clonex-assets.rtfkt.com/";
    string public notRevealedUri =
        "https://gateway.pinata.cloud/ipfs/QmY3rrWQC43EMXERrcyE5y4uMqTDMc8zxuaTCw87rWCAKq";
    bool public revealed = true;
    bool public paused = false;

    /** dev */
    uint256 public defaultMintAmount = 10;
    uint256 public cost = 0.05 ether;
    uint256 public maxSupply = 10000;
    uint256 public maxMintAmount = 10000;

    constructor() ERC721("DEV721", "DEV") {
        uint256 supply = totalSupply();
        for (uint256 i = 1; i <= defaultMintAmount; i++) {
            _safeMint(msg.sender, supply + i);
        }
    }

    function walletOfOwner(address _owner)
        public
        view
        returns (uint256[] memory)
    {
        uint256 ownerTokenCount = balanceOf(_owner);
        uint256[] memory tokenIds = new uint256[](ownerTokenCount);
        for (uint256 i; i < ownerTokenCount; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
        }
        return tokenIds;
    }

    function setCost(uint256 _newCost) public onlyOwner {
        cost = _newCost;
    }

    function setNotRevealedURI(string memory _notRevealedURI) public onlyOwner {
        notRevealedUri = _notRevealedURI;
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    function reveal(bool _state) public onlyOwner {
        revealed = _state;
    }

    function pause(bool _state) public onlyOwner {
        paused = _state;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        if (!revealed) {
            return notRevealedUri;
        }

        return
            bytes(baseURI).length > 0
                ? string(abi.encodePacked(baseURI, tokenId.toString()))
                : "";
    }
}
