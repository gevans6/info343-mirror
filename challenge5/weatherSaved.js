class WeatherSaved extends React.Component {
    render () {
        return (
            <ul>
                {
                    this.props.saved.map((location) => (
                        <li>{location}</li>
                    ))
                }
            </ul>
        )
    }
}