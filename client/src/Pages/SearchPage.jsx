import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getHistory } from "../actions/weather";
import { useSelector } from "react-redux";

import SearchIcon from "@mui/icons-material/Search";
import { Box, InputAdornment, TextField, Typography } from "@mui/material";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { history } = useSelector((state) => state.weather);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      const searchUrl = `/result?q=${searchTerm}`;
      window.open(searchUrl, "_blank");
      window.location.reload();
    }
  };

  useEffect(() => {
    dispatch(getHistory());
  }, [dispatch]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
      <form onSubmit={handleSearch}>
        <TextField
          id="search"
          type="search"
          label="Input city name here..."
          value={searchTerm}
          onChange={handleChange}
          autoFocus={true}
          sx={{ width: 600 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </form>
      <Box display="flex" flexDirection="column" mt={3} sx={{ width: 600 }}>
        <Typography variant="h6" gutterBottom>Search history:</Typography>
        <Box display="flex" flexWrap="wrap">
          {history?.search_history?.map((item, indexOf) => (
            <Link
              key={indexOf}
              to={`/result?q=${item}`}
              target="_blank"
              style={{
                textDecoration: "none",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  my: 1,
                  mx: 2,
                  p: 1,
                  borderRadius: 1,
                  bgcolor: "lightblue",
                  color: "black",
                }}
              >
                {item}
              </Typography>
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default SearchPage;
