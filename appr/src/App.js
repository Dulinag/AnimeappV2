import React, { useState, useEffect } from 'react';
import './App.css';

import styled from 'styled-components';

const TitleContainer = styled.div`
  font-size: 50px;
  text-align: center;
  padding-bottom: 3%;
`;

const Centerpage = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ScrollToBottomButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #f0f0f0;
  color: #333;
  font-size: 24px;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ddd;
  }
`;

const ScrollToBottomArrow = styled.span`
  font-size: 24px;
`;

const Centerpage2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-bottom: 3%;
`;

const TextSet = styled.div`
  padding-top: 10%;
  text-align: center;
  font-size: 30px;
  color: white;
`;

const Renderresult = styled.div`
  display: flex;
  text-align: center;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
  overflow-y: scroll;
  border: 1px solid black;
  height: 700px;
`;

const PageStyler = {
  boxShadow: 2,
  border: 2,
  borderColor: 'primary.light',
  color: 'white',
};

const App = () => {
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
        return !genres.includes('hentai');
      });

      setAnimeData(filteredData);
    } else {
      // Handle the case when data is not available or not in the expected format
      // For example, you could set an error state or display a message to the user
      console.log('Error: Unable to fetch or filter anime data.');
    }
  };

  useEffect(() => {
    getData();
  }, [search]);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    <div className="app">
      <TitleContainer>ANIMANIA</TitleContainer>

      <Centerpage>
        <Centerpage2>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Enter AnimeManic"
          />
        </Centerpage2>

        {animeData && (
          <Renderresult>
            {animeData.map((anime) => (
              <div key={anime.mal_id} className="image-container">
                <img src={anime.images.jpg.image_url} alt={anime.title} />
                <p>{anime.title}</p>
              </div>
            ))}
          </Renderresult>
        )}

        <ScrollToBottomButton onClick={scrollToBottom}>
          <ScrollToBottomArrow>&#8595;</ScrollToBottomArrow>
        </ScrollToBottomButton>

        <TextSet>
          Contact me <br />
          Dulinagunasekara@gmail.com
        </TextSet>
      </Centerpage>
    </div>
  );
};

export default App;
