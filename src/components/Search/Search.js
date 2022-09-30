import CardList from "./CardList/cardList";
import SearchBar from "./SearchBar/SearchBar";
import axios from 'axios';
import { useState, useEffect } from "react";

function Search() {

  const [searchTerm, setSearchTerm] = useState('');
  const [resultAPIDataUser, setResultAPIDataUser] = useState([]);
  const [resultAPIDataBand, setResultAPIDataBand] = useState([]);

  useEffect(() => {
    if (searchTerm.length >= 1) {
      const loadResult = setTimeout(() => {
        axios.get(`http://lbrqt-server.eddi.cloud/projet-one-band-back/public/api/search/${searchTerm}`)
          .then((response) => {
            setResultAPIDataUser(response.data.user);
            setResultAPIDataBand(response.data.band);
          })
          .catch((error) => {
            console.log(error);
          });
      }, 500)

      return () => clearTimeout(loadResult)
    }
  }, [searchTerm])

  return (
    <>
      <div className="search-bar-box">
        <SearchBar
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
        />
      </div>
      <CardList dataUser={resultAPIDataUser}
        dataBand={resultAPIDataBand}
      />
    </>
  );
}

export default Search;