import LearningCardGrid from './components/LearningCardGrid'
import Logo from './components/LogoSection'
import VisionSection from './components/OurVision'
import StatsSection from './components/stats'
import Footer from './components/Footer'
import Event from './components/FeaturedEventsCarousel'
import Blog from './components/BlogCard'
import TopPerformers from './components/TopPerformers'
import Navbar from './components/Navbar'
import HeroCarousel from './components/HeroCarousel'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState(null); // store whole API data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/v1/homepage/')  // replace with your API URL
      .then(response => {
        setData(response.data);  // store API response data
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);  // empty deps array means runs once on mount

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data: {error.message}</p>;

  const stats = data.stats;
  const recent_blogs = data.recent_blogs;
  
  return (
    <>
      <Navbar/>
      <HeroCarousel/>
      <LearningCardGrid/>
      <Logo/>
      <VisionSection/>
      <StatsSection stats={stats}/>
      <Event/>
      <TopPerformers/>
      <Blog recent_blogs={recent_blogs}/>
      <Footer/>

    </>
  )
}

export default App
