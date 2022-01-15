import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, TextField } from '@mui/material';

interface City {
  id: number;
  zipCode: string;
  zipCity: string;
  name: string;
  label: string;
};

function CityList({title, cities}: { title: string, cities: City[] }) {
  const compCities = cities.map((e, i) =>
    <Grid item xs={12} sm={6} md={3} key={i}>
      {e.name} - {e.zipCode}
    </Grid>
  );
  return (
    <Grid item container xs={6}>
      <Grid item xs={12} textAlign="center"><h1>{title}</h1></Grid>
      <Grid item container xs={12}>{compCities}</Grid>
    </Grid>
  )
}

function App() {
  const [search, setSearch] = useState<string>('');
  const [citiesMetro, setCitiesMetro] = useState<City[]>([]);
  const [citiesDom, setCitiesDom] = useState<City[]>([]);

  useEffect(() => {
    async function searchCities(search: string) {
      const { data } = await axios.get<City[]>(`http://localhost:3000/cities?search=${search}`);
      setCitiesDom(data.filter((e) => parseInt(e.zipCode) >= 96000))
      setCitiesMetro(data.filter((e) => parseInt(e.zipCode) < 96000))
    }
    searchCities(search);
  }, [search]);

  return (
    <Grid container spacing={2}>
      <Grid sx={{ flexGrow: 1 }} container item alignItems="center" justifyContent="center" xs={12}>
        <Grid item xs={3} textAlign="center">Je recherche </Grid>
        <Grid item xs={9}>
          <TextField fullWidth label="Ville ou Code Postal" id="search" variant="filled" value={search} onChange={(e) => setSearch(e.target.value)} />
        </Grid>
      </Grid>
      <CityList title="Villes de métropole" cities={citiesMetro} />
      <CityList title="Villes d'outre-mer" cities={citiesDom} />
    </Grid>
  );
}

export default App;
