import React, { useEffect} from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getDataWeather} from "../actions/weather";
import { useDispatch } from "react-redux";

const SearchResult = () => {
  const dispatch = useDispatch();
  const { weather, isLoading } = useSelector((state) => state.weather);
  const locationUrl = useLocation();
  const searchQuery = new URLSearchParams(locationUrl.search).get("q");
  const location = weather && weather.location;
  const current = weather && weather.current;
  const name = location && location.name;
  const region = location && location.region;
  const country = location && location.country;
  const temp_c = current && current.temp_c;
  const condition = current && current.condition;
  const wind_kph = current && current.wind_kph;
  const pressure_mb = current && current.pressure_mb;
  const humidity = current && current.humidity;
  
  useEffect(() => {
    dispatch(getDataWeather({ search: searchQuery }));
  }, [searchQuery, dispatch]);

  return (
        <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
        {isLoading ? (
            <CircularProgress />
        ) : (
            <>
            <Box sx={{ backgroundColor: '#f7f7f7', p: 2, borderRadius: 2 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    {name}, {region}, {country}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                    <img src={condition?.icon} alt={condition?.text} />
                    <Typography variant="h4" sx={{ ml: 2 }}>
                    {temp_c}°C
                    </Typography>
                </Box>
                <Typography variant="body1" align="center">
                    {condition?.text}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                    <Typography variant="body1">
                    Wind: {wind_kph} km/h
                    </Typography>
                    <Typography variant="body1">
                    Pressure: {pressure_mb} mb
                    </Typography>
                    <Typography variant="body1">
                    Humidity: {humidity}%
                    </Typography>
                </Box>
            </Box>
        </>
      )}
    </Box>
  );
};

export default SearchResult;
