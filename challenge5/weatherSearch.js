class WeatherSearch extends React.Component {
    render () {
        return (
            <form onSubmit={(e) => this.wSearch(e)}>
                <input type="text" ref="query"/>
                <button type="submit">Search</button>
            </form>
        )

       
    }

    wSearch(e) {
        this.props.onSearch(e);
    }
}