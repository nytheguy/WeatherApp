import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { WeatherClient } from "../client.js";

export interface WeatherData {
  temperature: number;
  description: string;
  name: string;
}

@customElement("search-btn")
export class SearchButton extends LitElement {

  client: WeatherClient = new WeatherClient();

  data: WeatherData = {
    name: "",
    temperature: 0.0,
    description: "",
  };

  @property()
  value: string = "";
  
  static styles = css`
    form {
      display: flex;
      min-height: 98px;
      min-width: 443px;
    }

    input {
      min-height: 98px;
      min-width: 443px;
      border-radius: 40px;
      border: solid;
      color: white;
      font-size: 36px;
      text-align: left;
      padding-left: 27px;
      background-color: skyblue;
    }

    input:focus {
      outline: none;
    }

    input::placeholder {
      color: white;
    }

    img {
      max-height: 35px;
      max-width: 35px;
      align-self: flex-end;
    }
  `;

  render() {
    return html`
      <form @submit=${this.handleSubmit}>
        <input
          type="text"
          placeholder="Search Location"
          value=${this.value}
          @input=${this.handleInput}
        />
        <!-- <img src="src/assets/magnifying-glass-solid.svg"> -->
      </form>
    `;
  }

  handleInput(event: InputEvent) {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    this.client.setLocation(this.value);
    this.client.fetchCoordinates();
    this.setWeatherData();
    this.dispatchEvent(new CustomEvent("submit", { detail: this.value }));
  }

  setWeatherData() {
    this.data.description = this.client.getDescription();
    this.data.name = this.client.getName();
    this.data.temperature = this.client.getTemp();
  }

  getData(): WeatherData {
    return this.data;
  }

  getLocation(): string {
    return this.value;
  }
}
