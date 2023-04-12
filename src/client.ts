
const apiKey = import.meta.env.VITE_API_KEY

export class WeatherClient {

    longitude: number = 0.0;
    latitude: number = 0.0;
    temp: number = 0.0;
    name: string = "";
    description: string = "";
    location: string = "";
    baseUrl: string = "http://api.openweathermap.org/";


    getDescription(){
        return this.description;
    }

    getTemp(){
        return this.temp;
    }

    getName(){
        return this.name;
    }

    setLocation(location: string) {
        this.location = location;
    }

    setTemp(temperature: number){
        this.temp = temperature;
    }

    setName(locationName: string){
        this.name = locationName;
    }

    setDescription(desc: string) {
        this.description = desc;
    }

    fetchCoordinates() {
        const geoCodingAPI = new URL(
            `geo/1.0/direct?q=${this.location}&limit=10&appid=${apiKey}`,
            this.baseUrl
        );

        fetch(geoCodingAPI.toString())
            .then((response) => response.json())
            .then((data) => {
                this.longitude = data[0].lon;
                this.latitude = data[0].lat;
                console.log(data[0]);
                console.log(this.latitude);
                console.log(this.longitude);
                this.fetchWeatherData();
            });
    }

    fetchWeatherData() {
        const weatherData = new URL(
            `data/2.5/weather?lat=${this.latitude}&lon=${this.longitude}&units=imperial&appid=${apiKey}`,
            this.baseUrl
        );

        fetch(weatherData.toString())
            .then(response => response.json())
            .then(data => {
                this.setTemp(data.main.temp);
                this.setName(data.name);
                this.setDescription(data.weather[0].description);
                console.log(data)
                console.log(this.temp);
                console.log(this.name);
                console.log(this.description);
            } 
            )
    }
}
