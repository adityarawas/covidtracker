
import './App.css';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useState, useEffect } from 'react'
import Info from './components/Info'
import Map from './components/Map'
import { Card, CardContent} from '@material-ui/core'
import Table from './components/Table'
import LineGraph from './components/LineGraph'
import { sortData } from './util';
function App() {

  const [countries, setcountries] = useState([]);
  const [country, setcountry] = useState('worldwide');
  const [countryInfo, setcountryInfo] = useState({});
  const [tableData,settableData] = useState([]);
  // https://disease.sh/v3/covid-19/countries


  // useEffect(() => {
  
  // }, []);


  useEffect(() => {
    const getCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2
          }))
          const sortedData = sortData(data)
          settableData(sortedData)
          
          setcountries(countries)
        })
    }
    getCountriesData()

    fetch("https://disease.sh/v3/covid-19/all")
    .then((response) => response.json())
    .then((data) => {
      setcountryInfo(data);
    });

  }, []);


  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    
    const url= countryCode ==='worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`
    await fetch(url)
    .then(res => res.json())
    .then(data=>{
      setcountry(countryCode)
      setcountryInfo(data)
    });
  }


  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID 19 TRACKER</h1>

          <FormControl className='app__dropdown'>

            {countries.length > 0 && <Select variant='outlined'
              onChange={onCountryChange}

              value={country}>
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {

                countries.map((i, index) => {
                  return <MenuItem value={i.value}>{i.name}</MenuItem>
                })
              }

            </Select> || <h5>Worldwide</h5>}

          </FormControl>

        </div>


        <div className="app__stats">
          <Info title="Coronavirus cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
          <Info title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          <Info title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
        </div>

        <Map />
      </div>



      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />
          <h3>Worldwide new case</h3>
              <LineGraph />
        </CardContent>
      </Card>


    </div>
  );
}

export default App;
