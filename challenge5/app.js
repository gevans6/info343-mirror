var API_KEY = '2663e4040e86b15799ef71fcffbc98b3';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            saved: [],
            alert: {
                active: false
            }
        };
    }

    componentDidMount() {
        var savedLocationsJSON = localStorage.getItem("savedLocations");
        var savedLocations = JSON.parse(savedLocationsJSON);

        if(savedLocations) {
            this.setState({
                saved: savedLocations
            });
            this.searchLocation(savedLocations[0]);
        }      
    }

    render() {
        return (
            <div className="container">
                <h1>Yung Grant's Weather App</h1>
                
                <div className="row">
                    <div className="col-md-3 col-sm-6">               
                        <WeatherSearch
                            onSearch={(location) => this.searchLocation(location)}
                            alert={this.state.alert}
                        />

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

                    <div className="col-md-3 col-sm-6">
                        <WeatherSaved
                            saved={this.state.saved}
                            onClick={(location) => this.searchLocation(location)}
                            onRemove={(location) => this.removeLocation(location)}
                        />
                    </div>
                </div>
            </div>
        );
    }

    saveLocation(location) {
        var saved = this.state.saved;

        if(saved.indexOf(location) < 0) {
            saved.push(location);

            this.setState({
                saved: saved
            });

            var savedJson = JSON.stringify(saved);
            localStorage.setItem("savedLocations", savedJson);
        }
    }

    removeLocation(location) {
        //code sourced from http://stackoverflow.com/questions/23114949/how-do-i-delete-an-object-or-array-from-localstorage 
        var savedLocations = JSON.parse(localStorage.savedLocations); 

        for (var i = 0; i < savedLocations.length; i++) {
            if (savedLocations[i] === location) {
                savedLocations.splice(i,1); 
            }
        }

        localStorage.savedLocations = JSON.stringify(savedLocations);

        this.setState({
            saved: savedLocations
        });
    }

    searchLocation(location) {
        this.setState({
            alert: {
                active: false
            }
        });

        var url = "https://www.bell-towne.com/api/weather/?q=" + location + "&APPID=" + API_KEY;

        fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            if (json.cod === "502"){
                throw json;
            }
            var name = json.name;
            var temp = parseInt(json.main.temp * (9/5) - 459.67) + String.fromCharCode(176) + "F";
            var main = json.weather[0].main;
            var description = json.weather[0].description;
            var icon = json.weather[0].icon;
            
            
            this.setState({
                name: name,
                temp: temp,
                main: main,
                description: description,
                icon: icon, 
            });
        }).catch((e) => {
            this.setState({
                alert: {
                    active: true,
                    message: e.message
                }
            });
        });
    }
}

var app = document.getElementById('app');

ReactDOM.render(<App />, app);
