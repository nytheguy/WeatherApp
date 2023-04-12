import { customElement, property } from "lit/decorators.js";
import { LitElement, html, css } from 'lit';
import { SearchButton} from './components/search-btn';
import { WeatherComponent} from "./components/weather-component.js";

@customElement('app-main')
export class App extends LitElement {

    @property()
    location: string = '';
    @property()
    temperature: number = 0;
    @property()
    description: string = '';

    static style = [
        SearchButton.styles,
        WeatherComponent.styles,
        css `
        `
    ]
    
    render(){
        return html`
                <weather-component .location=${this.location} .temperature=${this.temperature} .description=${this.description}></weather-component>
                <search-btn @submit=${this._handleSubmit} ></search-btn>
            
        `
    };


    _handleSubmit(event: Event){
        const target = event.target as SearchButton;
        this.location = target.data.name;
        this.temperature = target.data.temperature;
        this.description = target.data.description;

    }
}