import React, { useEffect, useState } from "react";
import AllGalleryRow from "./allGallery/AllGalleryRow";
import css from './githubUser.module.css'
const base = import.meta.env.BASE_URL;
export default function GitHubUser() {
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showRepos, setShowRepos] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  const username = "vovagl";

  const handleImageLoad = () => {
  setImagesLoaded(prev => prev + 1);
};
useEffect(() => {
  if (!showRepos) return;
  const t = setTimeout(() => setShowGallery(true), 1000);
  return () => clearTimeout(t);
}, [showRepos]);

  useEffect(() => {
    async function fetchData() {
      try {
        const profileRes = await fetch(`https://api.github.com/users/${username}`);
        if (!profileRes.ok) throw new Error("Не удалось получить профиль");

        const profileJson = await profileRes.json();

        const reposRes = await fetch(profileJson.repos_url);
        if (!reposRes.ok) throw new Error("Не удалось получить репозитории");

        const reposJson = await reposRes.json();

        const repoExtras = {
  "2026": {
    img: base + "images/2026.jpg",
    ghPages: "https://vovagl.github.io/2026/"
  },
  "24.10": {
    img: base +"images/24.10.jpg",
    ghPages: "https://vovagl.github.io/24.10/"
  },
  "game": {
    img:  base +"images/game.jpg",
    ghPages: "https://vovagl.github.io/game/"
  },
  "ListTodo": {
    img:  base +"images/ListTodo.jpg",
    ghPages: "https://vovagl.github.io/ListTodo/"
  },
  "list_api": {
    img:  base +"images/list_api.jpg",
    ghPages: "https://vovagl.github.io/list_api/"
  },
  "list_of_films": {
    img:  base +"images/list_of_films.jpg",
    ghPages: "https://list-of-films.onrender.com"
  },
  "test": {
    img:  base +"images/test.jpg",
    ghPages: "https://vovagl.github.io/test/"
  },
  "movie_catalog": {
    img:  base +"images/movie_catalog.jpg",
    ghPages: "https://vovagl.github.io/movie_catalog/"
  },
  "todo-list": {
    img:  base +"images/todo-list.jpg",
    ghPages: "https://vovagl.github.io/todo-list/"
  },
  "test01.07": {
    img: base + "images/test01.07.jpg",
    ghPages: "https://test01-07-mw8p2ngdd-vovas-projects-ca33eec5.vercel.app/"
  },
  "pixi": {
    img:  base +"images/pixi.jpg",
    ghPages: "https://vovagl.github.io/pixi/"
  },
  "phones_shop": {
    img:  base +"images/phones_shop.jpg",
    ghPages: "https://vovagl.github.io/phones_shop/"
  },
  "task14.11.25": {
    img:  base +"images/task14.11.25.jpg",
    ghPages: "https://vovagl.github.io/task14.11.25/"
  },
  "test10.11": {
    img:  base +"images/test10.11.jpg",
    ghPages: "https://vovagl.github.io/test10.11/"
  },
  "my__bot": {
    img:  base +"images/MyBot.jpg",
    ghPages: "https://t.me/VG1MyBot"
  },
  "test28.07": {
    img: base + "images/test28-07.jpg",
    ghPages: "https://test28-07.vercel.app"
  },
  "pixi_game": {
    img:  base +"images/pixi-game.jpg",
    ghPages: " https://pixi-game-jb5i.vercel.app/"
  },
  "portfolio": {
    img:  base +"images/portfolio.jpg",
    ghPages: " https://vovagl.github.io/portfolio/"
  },
}
const reposWithExtras = reposJson.map((repo) => ({
  ...repo,
  img: repoExtras[repo.name]?.img || "",
  ghPages: repoExtras[repo.name]?.ghPages || repo.html_url
})).sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

setRepos(reposWithExtras);
        

        setUserData(profileJson);
      
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [username]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;
  if (!userData) return null;


  return (
    <>
    <div className={`${css.container} ${imagesLoaded===2 ? css.enter : ""}`}
    onAnimationEnd={() => { 
      setTimeout(() => setShowRepos(true));
       }
    }
    >
      <div className={css.avatar}>
        <div className={css.img}>
        <img className={css.avatar_img} 
        src={import.meta.env.BASE_URL + "images/avatar.jpg"} 
        alt="avatar"
        onLoad={handleImageLoad}/>
        <img className={css.header} 
        src={import.meta.env.BASE_URL + "images/header.jpg"} 
        alt="header"
        onLoad={handleImageLoad}/>
        </div>
      </div>
    </div>
    
     <div className={css.repos_wrapper}> 
      <div className={`${css.repos} ${showRepos ? css.enter : ""}`}>
        <p className={css.repos_p}>
          <strong>My repos:</strong> {userData.public_repos}
        </p>
        <h1 style={{display: 'flex', justifyContent:'center'}}><span className={css.gradient}>My GitHub:</span>
           <a href="https://github.com/vovagl" style={{textDecoration:'none',marginLeft:'10px'}}>visit</a>
        </h1>
        <h2 style={{display: 'flex', justifyContent:'center'}}><span className={css.gradient}>My telegram:</span>
          <a href="https://t.me/vova16_06" style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration:'none',
            marginLeft:'10px'}}>
          <img src={import.meta.env.BASE_URL + "images/telegram.png"} alt="telegram" style={{width:'45px', display: 'block'}}/>
          </a>
        </h2>
      </div>
     </div> 
     <div className={`${css.allGalleryRow} ${showGallery ? css.enter : ""}`}> 
      <h3 style={{marginLeft:'20px'}}>List of repositories:</h3>
          <AllGalleryRow repos={repos}/>
    </div>  
    </> 
  );
}
