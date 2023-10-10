import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {
  Link,
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate,
} from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Post from './components/Post';
import Places from './components/Places';
import axios from 'axios';
import SearchResults from './components/SearchResult';
import 'react-toastify/dist/ReactToastify.css';
import {  toast } from 'react-toastify';
import Myposts from './components/Myposts';
import PostDetails from './components/PostDetails';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import CreateIcon from '@mui/icons-material/Create';
import SearchIcon from '@mui/icons-material/Search';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import StorageIcon from '@mui/icons-material/Storage';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import './assets/Menu.css'
function Menu() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [localStorage.getItem('token')]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:4000/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [searchQuery, posts]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery('')
    navigate(`/search/${searchQuery}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logout successful. See you later!', {
      position: toast.POSITION.BOTTOM_LEFT,
      theme: "colored",
    });
    
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            TouristShare
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link hover-effect" to="/places">
                  <LocationCityIcon/> Places
                </Link>
              </li>
              {isLoggedIn ? (
                <>
                <li className="nav-item">
                  <Link className="nav-link hover-effect" to="/post">
                    <CreateIcon/> Create
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link hover-effect" to="/myPosts">
                  <StorageIcon/>  My posts
                  </Link>
                </li>
                </>
              ) : (
                []
              )}
            </ul>
            {/* Search form in the menu */}
            <form className="d-flex me-auto" onSubmit={handleSearchSubmit}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Enter place name"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn btn-outline-success" type="submit">
              <SearchIcon/> Search 
              </button>
            </form>
            <div className="d-flex navbar-nav mb-2 mb-lg-0">
              {isLoggedIn ? (
                <>
                  <button className="nav-link hover-effect" onClick={handleLogout}>
                    Logout <LogoutIcon/>
                  </button>
                </>
              ) : (
                <>
                  <Link className="nav-link hover-effect" to="/login">
                    Login <LoginIcon/>
                  </Link>
                  <Link className="nav-link hover-effect" to="/signup">
                    Signup <PersonAddIcon/>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <div className="">
        <Routes>
          <Route path="/" element={<Home />}></Route>

          {isLoggedIn === false ? (
            <>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/signup" element={<Signup />}></Route>
            </>
          ) : (
            []
          )}
          {isLoggedIn === true ? (
            <>
            <Route path="/post" element={<Post />}></Route>
            <Route path='/myPosts' element={<Myposts/>}></Route>
            <Route path='/postdetails/:id' element={<PostDetails/>}></Route>
            </>
          ) : (
            []
          )}
          <Route path="/places" element={<Places />}></Route>
          <Route path="/search/:query" element={<SearchResults />} />
        </Routes>
       
     
      </div>
    </div>
  );
}

export default Menu;
