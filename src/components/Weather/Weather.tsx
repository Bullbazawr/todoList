import weatherService from '../../services/weather.service'
import { WeatherProps } from '../../interfaces/weather.interface'
import locationService from '../../services/location.service'
import { useEffect, useState } from 'react'
import { sunnriseSunsetDataToDateObj } from '../../utils/weatherFncs/sunnriseSunsetDataToDateObj'


export function Weather() {
    const [weatherData, setWeatherData] = useState<WeatherProps | null>(null)
    const [isloading, setIsLoading] = useState(true)
    const [city, setCity] = useState<string | null>(null)
    const cloudy = weatherData?.current.cloud_cover || 11
    const sunnriseTime = weatherData?.daily.sunrise[0]
    const sunsetTime = weatherData?.daily.sunset[0]
    const currentDate = new Date()
    const sunriseDate = sunnriseTime ? sunnriseSunsetDataToDateObj(sunnriseTime) : null
    const sunsetDate = sunsetTime ? sunnriseSunsetDataToDateObj(sunsetTime) : null
    const isDaytime = sunriseDate && sunsetDate && currentDate >= sunriseDate && currentDate <= sunsetDate
    const weatherCode = weatherData?.current.weathercode as number

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { latitude, longitude } = await locationService.getLatitudeLongitude()// поолучаем геолокацию
                const data = await weatherService.getWeather(latitude, longitude)// получаем погоду по геолокации
                const cityName = await locationService.getCityName(latitude, longitude)// получаем название города по геолокации
                setCity(cityName)
                setWeatherData(data)
            } catch {
                console.error('Failed to fetch weather data')
                return
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, [])
    if (isloading) return <div>Loading weather...</div>
    if ([61, 63, 65, 80, 81, 82].includes(weatherCode)) {
        return (
            <div className='weatherLocationContainer rainy'>
                <div className='cityName'>{city}</div>
                <div className='temperature'>{`${weatherData?.current.temperature_2m}°C`}</div>
            </div>
        )
    }
    if (isDaytime) {
        if (cloudy <= 10) {
            return (
                <div className='weatherLocationContainer sunny'>
                    <div className='cityName'>{city}</div>
                    <div className='temperature'>{`${weatherData?.current.temperature_2m}°C`}</div>
                </div>
            )
        }
        if (cloudy > 10 && cloudy <= 50) {
            return (
                <div className='weatherLocationContainer cloudy'>
                    <div className='cityName'>{city}</div>
                    <div className='temperature'>{`${weatherData?.current.temperature_2m}°C`}</div>
                </div>
            )
        }
        if (cloudy > 50) {
            return (
                <div className='weatherLocationContainer partlyCloudy'>
                    <div className='cityName'>{city}</div>
                    <div className='temperature'>{`${weatherData?.current.temperature_2m}°C`}</div>
                </div>
            )
        }
    } else if (!isDaytime) {
        if (cloudy <= 10) {
            return (
                <div className='weatherLocationContainer clearSkyNight'>
                    <div className='cityName'>{city}</div>
                    <div className='temperature'>{`${weatherData?.current.temperature_2m}°C`}</div>
                </div>
            )
        }
        if (cloudy > 10) {
            return (
                <div className='weatherLocationContainer cloudyNight'>
                    <div className='cityName'>{city}</div>
                    <div className='temperature'>{`${weatherData?.current.temperature_2m}°C`}</div>
                </div>
            )
        }
    }
}