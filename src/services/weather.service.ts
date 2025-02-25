import { WeatherProps } from '../interfaces/weather.interface'

class WeatherService {
  private endpoint: string
  constructor() {
    this.endpoint = 'https://api.open-meteo.com/v1/forecast?current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,wind_direction_10m,cloud_cover,weathercode&daily=temperature_2m_max,temperature_2m_min,cloud_cover_mean,sunrise,sunset,uv_index_max&timezone=auto&forecast_days=1'
  }

  async getWeather(latitude: number, longitude: number): Promise<WeatherProps> {
    const url = `${this.endpoint}&latitude=${latitude}&longitude=${longitude}`
    const res = await fetch(url)
    return res.json()
  }
}

export default new WeatherService()