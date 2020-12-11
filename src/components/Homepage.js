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
    const Timer = ({ initialTime }) => {
      return <div className="timer">CountDown: {initialTime}</div>;
    };
  
  
    const [initialTime, setInitialTime] = useState(0);
    const [startTimer, setStartTimer] = useState(false);
  
    const [timerComponent, toggleTimerVisibility] = useState(false)

    useEffect(() => {
      fetchImages();
    },[]);

  
    const handleClick = e => {
        toggleTimerVisibility(true);
        e.preventDefault();
        setInitialTime(10);
        setStartTimer(true);
        
    }
  
    useEffect(() => {
      
      if (initialTime > 0) {
        setTimeout(() => {
          console.log("startTime, ", initialTime);
          setInitialTime(initialTime - 1);
        }, 1000);
      }
  
      if (initialTime === 0 && startTimer) {
        console.log("done");
        setStartTimer(false);
        setImages([]);
        fetchImages();
        
      }
    }, [ initialTime, startTimer]);

    


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
      <div className="button-align" >
        <button onClick={handleClick}>New Images</button>
      </div>
      {timerComponent ? <Timer initialTime={initialTime} /> :null}
      
      
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
