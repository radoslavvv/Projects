import React from "react";

const Form = (props) => {
    return(
        <div>
            <h3 className="weather-form-title">Please enter your weather request info bellow:  </h3>
            <form onSubmit={props.getWeatherData}>
                
                <input type="text" name="city" placeholder="City..."/>
                <input type="text" name="country" placeholder="Country..."/>
                <button>Get Weather</button>
            </form>
        </div>
    );
}

export default Form;