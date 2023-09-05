import { useEffect, useState } from 'react';
import axios from "axios";
import { useQuery } from '@tanstack/react-query';
import './location_page.css';

type LocationComponentProps = {
    locationName: string;
};

type LocationType = {
  "metadata": {
    "treffPerSide": number,
    "side": number,
    "totaltAntallTreff": number,
    "viserFra": number,
    "viserTil": number,
    "sokeStreng": string,
  },
  "navn": [
    {
      "skrivemåte": string,
      "skrivemåtestatus": string,
      "navnestatus": string,
      "språk": string,
      "navneobjekttype": string,
      "stedsnummer": number,
      "stedstatus": string,
      "representasjonspunkt": {
        "øst": number,
        "nord": number,
        "koordsys": string,
      },
      "fylker": [
        {
          "fylkesnavn": string,
          "fylkesnummer": string,
        }
      ],
      "kommuner": [
        {
          "kommunenummer": string,
          "kommunenavn": string,
        }
      ]
    }
  ]
}

type WeatherType = {
    "type": string,
    "geometry": {
      "type": string,
      "coordinates": [
        number,
        number,
        number,
      ]
    },
    "properties": {
      "meta": {
        "updated_at": string,
        "units": {
          "air_pressure_at_sea_level": string,
          "air_temperature": string,
          "cloud_area_fraction": string,
          "precipitation_amount": string,
          "relative_humidity": string,
          "wind_from_direction": string,
          "wind_speed": string,
        }
      },
      "timeseries": [
        {
          "time": string,
          "data": {
            "instant": {
              "details": {
                "air_pressure_at_sea_level": number,
                "air_temperature": number,
                "cloud_area_fraction": number,
                "relative_humidity": number,
                "wind_from_direction": number,
                "wind_speed": number,
              }
            },
            "next_12_hours": {
              "summary": {
                "symbol_code": string,
              }
            },
            "next_1_hours": {
              "summary": {
                "symbol_code": string,
              },
              "details": {
                "precipitation_amount": number
              }
            },
            "next_6_hours": {
              "summary": {
                "symbol_code": string,
              },
              "details": {
                "precipitation_amount": number
              }
            }
          }
        },
      ]
    }
  }

const LocationComponent = ({ locationName }: LocationComponentProps) => {

    const [weather, setWeather] = useState<WeatherType | undefined>(undefined);
    const [location, setLocation] = useState<LocationType | undefined>(undefined);

    const fetchWeather = (lat: string, lon: string) =>
        axios
        .get<WeatherType>("https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=" + lat + "&lon=" + lon)
        .then((res) => res.data);

    const { data: locationData, isLoading: locationDataIsLoading, isFetching: locationDataIsFetching } = useQuery<LocationType, Error>({
        queryKey: ['location'],
        queryFn: () =>
            axios
            .get<LocationType>("https://ws.geonorge.no/stedsnavn/v1/navn?sok=" + locationName + "&fuzzy=false&utkoordsys=4258&treffPerSide=1&side=1")
            .then((res) => res.data),
    });

    useEffect(() => {
        setLocation(locationData);

        if (locationData) {
            fetchWeather(locationData.navn[0].representasjonspunkt.nord.toString(), locationData.navn[0].representasjonspunkt.øst.toString()).then((weatherData) => {
                setWeather(weatherData);
                console.log(weatherData)
            });
        }
    }, [locationData]);

    return (
        <div className="location_main">
        {locationDataIsLoading ? (
            <div>Loading...</div>
        ) : (
            <div>
                <div>
                    {locationName}: {location?.navn[0].representasjonspunkt.nord}, {location?.navn[0].representasjonspunkt.øst}<br/>
                    temp: {weather?.properties.timeseries[2].data.instant.details.air_temperature}
                    <div>{locationDataIsFetching ? 'Background Updating...' : ' '}</div>
                    </div>
                    <div className="location_header">
                            <div className='location_header_name'>
                                <img src="../src/assets/heart.svg" alt='Hjerte'/>
                                <h1>Navn</h1>
                            </div>
                            <div className='location_header_info'>
                                <h1>Grader °C</h1>
                                <img src="../src/assets/sun.svg" alt='Vær'/>
                            </div>
                        </div>
                        <div className='location_body'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Tid</th>
                                        <th>Vær</th>
                                        <th>Temp.</th>
                                        <th>Nedbør</th>
                                        <th>Vind(kast) m/s</th>
                                        <th>Luftfuktighet</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Klokka</td>
                                        <td>Sol</td>
                                        <td>23*C</td>
                                        <td>3.4mm</td>
                                        <td>1 m/s</td>
                                        <td>Fuktig</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
            </div>
        )}
        </div>
    );
}

export default LocationComponent;