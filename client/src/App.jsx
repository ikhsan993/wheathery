import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import SearchPage from './Pages/SearchPage';
import { Box } from '@mui/material';
import { BrowserRouter, Route, Navigate, Routes} from 'react-router-dom';
import Auth from './Pages/Auth';
import SearchResult from './Pages/SearchResult';
import { useSelector } from "react-redux";

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const { authData } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!authData) {
      setUser(JSON.parse(localStorage.getItem('profile')))
    }
    else {
      setUser(authData);
    }
  }, [authData]);
  
  return (
    <>
      <BrowserRouter>
      <Header user={user} setUser={setUser} />
        <Box display="flex" justifyContent="center" maxWidth={'md'} margin="auto">
          <Routes>
          <>
            <Route path="/" element = { user ? <Navigate to="/search" /> : <Navigate to="/auth" /> } />
            <Route path="/search" element={ user ? <SearchPage /> : <Navigate to="/auth" />} />
            <Route path="/result" element={ user ? <SearchResult /> : <Navigate to="/auth" /> } />
          </>
            <Route
              path="/auth"
              element={
                !user ? (
                  <Auth />
                ) : (
                  <Navigate to="/search" replace />
                )
              }
            />
          </Routes>
        </Box>
      </BrowserRouter>
    </>
  );
};

export default App;
