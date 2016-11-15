var API_KEY = '2663e4040e86b15799ef71fcffbc98b3';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            saved: []
        };
    }
    componentDidMount() {
        var savedLocationsJSON = localStorage.getItem("savedLocations");
        var savedLocations = JSON.parse(savedLocationsJSON);
        console.log(savedLocations);

        if(savedLocations) {
            this.setState({
                saved: savedLocations
            });
        }
            
    }

    render() {
        return (
            <div>
                <h1>My Weather App</h1>

               <WeatherSaved />
                
                <form onSubmit={(e) => this.onSearch(e)}>
                    <input type="text" ref="query"/>
                    <button type="submit">Search</button>
                </form>

                {
                    this.state.name ? (
                        <WeatherCurrent
                            name={this.state.name}
                            temp={this.state.temp}
                            main={this.state.main}
                            description={this.state.description}
                            icon={this.state.icon}
                            onSave={(name) => this.saveLocation(name)}
                        />
                    ) : null
                }
                

            </div>

        );
    }

    saveLocation(location) {
        var saved = this.state.saved;

        saved.push(location);

        this.setState({
            saved: saved
        });

        var savedJson = JSON.stringify(saved);
        localStorage.setItem("savedLocations", savedJson);

        console.log(localStorage.savedLocations);
    }

    onSearch(e) {
        e.preventDefault();

        var queryValue = this.refs.query.value;

        var url = "http://api.openweathermap.org/data/2.5/weather?q=" + queryValue + "&APPID=" + API_KEY;

        fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then((json) => {
            var name = json.name;
            var temp = json.main.temp;
            var main = json.weather[0].main;
            var description = json.weather[0].description;
            var icon = json.weather[0].icon;
            console.log(name);
            this.setState({
                name: name,
                temp: temp,
                main: main,
                description: description,
                icon: icon
            });
        });
    }
}

var app = document.getElementById('app');

ReactDOM.render(<App />, app);
