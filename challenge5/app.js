var API_KEY = '2663e4040e86b15799ef71fcffbc98b3';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            saved: []
        };
    }

    render() {
        return (
            <div>
                <h1>My Weather App</h1>

                <ul>
                    {
                        this.state.saved.map((place) => (
                            <li>{place}</li>
                        ))
                    }
                </ul>

                <form onSubmit={(e) => this.onSearch(e)}>
                    <input type="text" ref="query"/>
                    <button type="submit">Search</button>
                </form>

            </div>

        );
    }

    onSearch(e) {
        e.preventDefault();

        var queryValue = this.refs.query.value;

        var url = "api.openweathermap.org/data/2.5/weather?q=" + queryValue + "&APPID=" + API_KEY;

        fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then((json) => {
            var weatherMain = json.weather[0].main;
            var weatherDescription = json.weather[0].description;
            var weatherIcon = json.weather[0].icon;
            var temp = json.main.temp;
            var name = json.name;

            this.setState({
                weatherMain: weatherMain,
                weatherDescription: weatherDescription,
                weatherIcon: weatherIcon,
                temp: temp,
                name: name
            });
        });
    }
}

var app = document.getElementById('app');

ReactDOM.render(<App />, app);
