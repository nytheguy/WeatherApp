import { LitElement, html, css} from "lit";
import { customElement, property } from 'lit/decorators.js';

@customElement('weather-component')
    export class WeatherComponent extends LitElement {

        @property()
        location: string = '';
        temperature: number = 0;
        description: string = '';
        display: boolean = false; 

        static styles = css `

            .container{
                background: skyblue;
                min-height: 664px;
                min-width: 443px;
                text-align: center;
                color: white;
                border-radius: 40px;
                margin-bottom: 20px;
            }

            img {
                margin-top: 28px;
            }

            .text-container {
                margin-top: 104px;
                padding: 15px 0px;
            }

            h1{
                font-size: 64px;

            }

            h2 {
                font-size: 32px;
            }

            h3 {
                font-size: 20px;
            }

        `
        
        render(){
            return html`
                <div class='container'>
                    <img src="src/assets/sunnyclouds.svg">
                    <div class='text-container'>
                        <h1>${this.location}</h1>
                        <h2>${this.temperature}°F</h2>
                        <h3>${this.description}</h3>
                    </div>
                </div>
            `;
        }
    };