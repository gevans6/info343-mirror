class WeatherCurrent extends React.Component {
    render() {
        return (
            <div>
                <h2>{this.props.name}</h2>
                <p>{this.props.temp}</p>
                <p>{this.props.main}</p>
                <p>{this.props.description}</p>
                <p>
                    <img src= {"http://openweathermap.org/img/w/" + this.props.icon + ".png"} />
                </p>
                
                <button onClick={(e) => this.save(e)}>Save</button>
                        
            </div>
        )
    }

    save(e) {
        this.props.onSave(this.props.name);
    }
}