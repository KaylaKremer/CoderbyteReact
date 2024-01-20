import React, { useState } from "react"
import { createRoot } from "react-dom/client"

const style = {
    marginTop: {
        marginTop: "10px",
    },
    marginRight: {
        marginRight: "10px",
    },
}

const WeatherDashboard = () => {
    // instead of requesting data from an API, use this mock data
    const mockWeatherData = {
        "New York": {
            temperature: "22°C",
            humidity: "56%",
            windSpeed: "15 km/h",
        },
        "Los Angeles": {
            temperature: "27°C",
            humidity: "45%",
            windSpeed: "10 km/h",
        },
        London: {
            temperature: "15°C",
            humidity: "70%",
            windSpeed: "20 km/h",
        },
    }

    const defaultWeather = {
        temperature: "",
        humidity: "",
        windSpeed: "",
    }

    const [city, setCity] = useState("")
    const [cache, setCache] = useState({})
    const [notFound, setNotFound] = useState(false)
    const [previousSearches, setPreviousSearches] = useState([])
    const [weather, setWeather] = useState(defaultWeather)

    const mockFetchWeatherData = city => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (mockWeatherData[city]) {
                    resolve(mockWeatherData[city])
                } else {
                    reject(new Error("City not found."))
                    setNotFound(true)
                    setWeather(defaultWeather)
                }
            }, 500)
        })
    }

    const search = async city => {
        setNotFound(false)

        if (!city || city === "") {
            setWeather(defaultWeather)
            setNotFound(true)
            return
        }

        if (cache[city]) {
            setWeather(cache[city])
            return
        }

        try {
            const data = await mockFetchWeatherData(city)
            setCache({ ...cache, [city]: data })
            setWeather(data)
            setPreviousSearches([...previousSearches, city])
        } catch {
            throw new Error("Could not fetch weather data.")
        }
    }

    return (
        <div>
            <input
                type="text"
                id="citySearch"
                placeholder="Search for a city..."
                value={city}
                onChange={e => setCity(e.target.value)}
            />
            <button id="searchButton" onClick={() => search(city)}>
                Search
            </button>
            <div id="weatherData" style={style.marginTop}>
                <div>Temperature: {weather.temperature}</div>
                <div>Humidity: {weather.humidity}</div>
                <div>Wind Speed: {weather.windSpeed}</div>
                {notFound && <div style={style.marginTop}>City not found.</div>}
            </div>
            <div id="previousSearches" style={style.marginTop}>
                {previousSearches.length > 0 &&
                    previousSearches.map((previousSearch, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setCity(previousSearch)
                                search(previousSearch)
                            }}
                            style={style.marginRight}
                        >
                            {previousSearch}
                        </button>
                    ))}
            </div>
        </div>
    )
}

const root = createRoot(document.getElementById("root"))
root.render(<WeatherDashboard />)
