import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BemHelper from 'react-bem-helper';
import { ACCESS_KEY } from './index';
import './App.css';

const bem = new BemHelper('element-cover');

const Item = ({ pictureUrl }) => {
  return (
    <div {...bem('blurred-picture-wrapper')}>
      <div {...bem('blurred-bg')} style={{ backgroundImage: `url(${pictureUrl})` }}></div>
      <img src={pictureUrl} alt="" />
    </div>
  );
};

function App() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    const fetchCats = async () => {
      const response = await axios.get('https://api.unsplash.com/search/photos', {
        params: { query: 'cats' },
        headers: {
          Authorization: `Client-ID ${ACCESS_KEY}`
        }
      });
      const {
        data: { results: cats }
      } = response;

      const items = cats.reduce((acc, cur) => {
        return [
          ...acc,
          {
            pictureUrl: cur.urls.small
          }
        ];
      }, []);

      setItems(items);
    };
    fetchCats();
  }, []);

  return (
    <div className="App">
      <div className="layout-grid-wrap">
        {items && items.map(item => <Item pictureUrl={item.pictureUrl} />)}
      </div>
    </div>
  );
}

export default App;
