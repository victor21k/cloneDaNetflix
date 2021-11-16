import React, { useEffect, useState } from 'react';
import './App.css'
import tmdb from './tmdb';
import MovieRow from './components/MovieRow/MovieRow';
import Movietop from './components/FeaturedMovie/Movietop';
import Header from './components/Header/Header';



export default () => {

  const[movieList, setMovieList] = useState([]);
  const[featuredData, setfeaturedData]= useState(null)
  const[blackHeader,setBlackHeader]= useState(false);

  useEffect(() =>{
    const loadAll = async () => {
      //pegando a lista total
      let list = await tmdb.getHomeList();
     setMovieList(list);

     //pegando filme em destaque
     let originals = list.filter(i=>i.slug==='originals');
     let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
     let chosen = originals[0].items.results[randomChosen];
     let chosenInfo = await tmdb.getMovieInfo(chosen.id, 'tv');

      setfeaturedData(chosenInfo);
    }

    loadAll();
  }, []);

  useEffect(() => {

    const scrollListener = () => {
      if(window.scrollY > 10) {
        setBlackHeader(true);
      }else{
        setBlackHeader(false);
      }      
    }
    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }

  }, []);

  return(
      <div className="page">

        <Header black={blackHeader}/>

     {featuredData &&
     <Movietop item={featuredData}/>
     
     }

         <section className="lists">
           {movieList.map((item, key)=>(
              <MovieRow key={key} title={item.title} items={item.items}/>    
  ))}
   </section>

            <footer className="footer">
            feito com intuito educativo <spam role="img" aria-label="cara de oculos preto">😎</spam> front-end componentizado na prática com ReactJS - DIO innovation<br/>
            Direitos de imagem para Netflix <br/>
            dados vindos do site Themoviedb.org<br/>
            com ajuda do curso do Bonieky Lacerda Aprenda a Programar Do ZERO
            </footer>

</div>

  );
}