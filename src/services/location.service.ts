

class LocationService {
    async getCurrentLocation(): Promise<{ latitude: number; longitude: number }> {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        resolve({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        })
                    }
                )
            } else {
                reject(new Error('Geolocation is not supported by this browser'))
            }
        })
    }

    async getLatitudeLongitude() {
        try {
            const { latitude, longitude } = await this.getCurrentLocation()
            return { latitude, longitude }
        } catch (error) {
            console.error("Error getting location:", error)
            throw error
        }
    }
    async getCityName(latitude: number, longitude: number) {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
            const data = await response.json()
            if (data.error) {
                throw new Error(data.error.message)
            }
            const cityName = data.address.city || data.address.town || data.address.village || data.address.county
            if (!cityName) {
                throw new Error('Unable to determine city name')
            }
            return cityName
        } catch (error) {
            console.log('Error getting city name:', error)
            throw error
        }
    }
}

export default new LocationService()