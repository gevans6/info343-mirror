class WeatherCurrent extends React.Component {
    render() {
        return (
            <div className="weatherCurrent">
                <h2>{this.props.name}</h2>
                <h3>{this.props.temp} <img src= {"http://openweathermap.org/img/w/" + this.props.icon + ".png"} /> </h3>
                <p>{this.props.main} ({this.props.description})</p>
                
                <button className="btn btn-secondary" onClick={(e) => this.save(e)}>Save</button> 
            </div>
        )
    }

    save(e) {
        this.props.onSave(this.props.name);
    }
}