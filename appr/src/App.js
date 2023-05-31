import React, { useState, useEffect } from 'react';
import './App.css';

import styled from 'styled-components';

const TitleContainer = styled.div`
  font-size: 50px;
  text-align: center;
  padding-bottom: 3%;
`;

const Centerpage = styled.div`

text-allign:center;





`;
const Centerpage2 = styled.div`

display: flex;
justify-content: center;
align-items: center;
text-align: center;
padding-bottom: 3%;




`;

const Renderresult = styled.div`

display: flex;

flex-direction: row;
justify-content: space-evenly;
width: 100%;
height:100vh;
flex-wrap: wrap;
overflow-y: scroll;

border: 1px solid black;


`;

const PageStyler = {
  boxShadow: 2,
  border: 2,
  borderColor: 'primary.light',
  color: 'white',
};

const App = () => {
  const [search, setSearch] = useState('Enter AnimeManic');
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
    setAnimeData(resData.data);
  };

  useEffect(() => {
    getData();
  }, [search]);

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
      </Centerpage>
    </div>
  );
};

export default App;
