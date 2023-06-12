import React, { useState, useEffect } from 'react';
import './App.css';

import styled from 'styled-components';

const TitleContainer = styled.div`
  font-size: 50px;
  text-align: center;
  padding-bottom: 3%;
`;




const AnimeApp = () => {
  const [search, setSearch] = useState('');
  const [animeData, setAnimeData] = useState();
  const [animeInfo, setAnimeInfo] = useState();
  const [myAnimeList, setMyAnimeList] = useState([]);

  const addTo = (anime) => {
    const index = myAnimeList.findIndex((myanime) => myanime.mal_id === anime.mal_id);
    if (index < 0) {
      const newArray = [...myAnimeList, anime];
      setMyAnimeList(newArray);
    }
  };

  const removeFrom = (anime) => {
    const newArray = myAnimeList.filter((myanime) => myanime.mal_id !== anime.mal_id);
    setMyAnimeList(newArray);
  };

  const getData = async () => {
    const res = await fetch(`https://api.jikan.moe/v4/anime?q=${search}&limit=20`);
    const resData = await res.json();
  
    if (resData && resData.data && Array.isArray(resData.data)) {
      const filteredData = resData.data.filter((anime) => {
        const genres = anime.genres.map((genre) => genre.name.toLowerCase());
        return !genres.includes("hentai");
      });
  
      setAnimeData(filteredData);
    } else {
      // Handle the case when data is not available or not in the expected format
      // For example, you could set an error state or display a message to the user
      console.log("Error: Unable to fetch or filter anime data.");
    }
  };
  
  

  useEffect(() => {
    getData();
  }, [search]);

  return (
    <div className="app">
      <TitleContainer>ANIMANIA</TitleContainer>


    </div>
  );
};

export default AnimeApp;
