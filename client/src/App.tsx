import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, TextField, Container, Alert, Card, CardContent } from '@mui/material';

interface City {
  id: number;
  zipCode: string;
  zipCity: string;
  name: string;
  label: string;
};

function CityList({title, cities}: { title: string, cities: City[] }) {
  const compCities = cities.map((e, i) =>
    <Grid item xs={12} md={6} key={i}>
      <Card sx={{ backgroundColor: '#737680' }}>
        <CardContent>
          <Grid container>
            <Grid item xs={10} color="white">
              {e.name}
            </Grid>
            <Grid item textAlign="right" xs={2} color="#adadad">
              {e.zipCode}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
  const compNbrCities = cities.length
    ? <Grid item xs={12} textAlign="center" my={2}>
        <Alert icon={false} severity="success">{cities.length} ville{cities.length > 1 ? 's' : ''} correspondant au texte saisi</Alert>
      </Grid>
    : <Grid item xs={12} textAlign="center" my={2}>
        <Alert icon={false} severity="error">Aucune ville correspondant au texte saisi</Alert>
      </Grid>
  ;
  return (
    <Grid item xs={6}>
      <Grid item px={2} pb={2} sx={{ backgroundColor: '#e8e8e8', borderRadius: '10px' }}>
        <Grid item xs={12} textAlign="center"><h2>{title}</h2></Grid>
        {compNbrCities}
        <Grid item container xs={12} spacing={2}>{compCities}</Grid>
      </Grid>
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
    <Container>
      <Grid container spacing={2} alignItems="center" sx={{ backgroundColor: '#e8e8e8', borderRadius: '10px', padding: '0 10px', marginTop: '10px'}}>
        <Grid item xs={3} textAlign="center"><h2>Je recherche...</h2></Grid>
        <Grid item xs={9}>
          <TextField fullWidth label="...une ville, un code postal" id="search" variant="standard" value={search} onChange={(e) => setSearch(e.target.value)} />
        </Grid>
      </Grid>
      <Grid container alignItems="stretch" spacing={2}>
        <CityList title="Villes de métropole" cities={citiesMetro} />
        <CityList title="Villes d'outre-mer" cities={citiesDom} />
      </Grid>
    </Container>
  );
}

export default App;
