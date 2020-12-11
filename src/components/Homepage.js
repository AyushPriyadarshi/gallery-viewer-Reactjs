import React, {useState,useEffect} from 'react';

//components
import Heading from './Heading';
import Unsplash from './Unsplash';
import Loader from './Loader';

//Dependencies
import axios from 'axios';
import styled from 'styled-components'
import InfiniteScroll from 'react-infinite-scroll-component';


const ImageWrapper = styled.section`
  max-width:rem;
  margin:4rem auto;
  display:grid;
  grid-gap:1em;
  grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
  grid-auto-rows:300px;

`;

const Homepage = () => {
    const [images,setImages] = useState([]);

  useEffect(() => {
    fetchImages();

  },[])

  const fetchImages = () => {

    const api = "https://api.unsplash.com";
    const accessKey = process.env.REACT_APP_ACCESSKEY;

    axios
      .get(`${api}/photos/random?client_id=${accessKey}&count=10`)
      .then(res => setImages([...images, ...res.data]))

  }

  return (
    <div className="App">
      <Heading />
      
      <InfiniteScroll
        dataLength ={images.length}
        next = {fetchImages}
        hasMore = {true}
        loader = {<Loader />}
      >

      <ImageWrapper>
      {images.map(image => (
        <Unsplash url={image.urls.thumb} key={image.id} />
      ))}
      </ImageWrapper>
    
      </InfiniteScroll>
      
    </div>
  )}

export default Homepage
