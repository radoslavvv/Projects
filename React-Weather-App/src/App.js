import React from "react";
import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";

const API_KEY = "X";

class App extends React.Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }

  getWeatherData = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    
    if (city && country) {
      const apiCall = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
      const data = await apiCall.json();

      if(data.cod === "404"){
        this.handleError();
      }else{
        this.setState({
          temperature: data.main.temp,
          city: data.name,
          country: data.sys.country,
          humidity: data.main.humidity,
          description: data.weather[0].description,
          error: ""
        });
      }
    } else{
      this.handleError();
    }
  };

  handleError() {
    this.setState({
      temperature: undefined,
      city: undefined,
      country: undefined,
      humidity: undefined,
      description: undefined,
      error: "Please enter valid city and country!"
    });
  }

  render(){
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-5 title-container">
                  <Titles/>
                </div>
                <div className="col-md-7 form-container">
                  <Form getWeatherData={this.getWeatherData}/>
                  <Weather 
                      temperature={this.state.temperature}
                      city={this.state.city}
                      country={this.state.country}
                      humidity={this.state.humidity}
                      description={this.state.description}
                      error={this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
