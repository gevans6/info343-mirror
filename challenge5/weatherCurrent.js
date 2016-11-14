class weatherCurrent extends React.Component {
    render() {
        // if(!this.props.title) {
        //     return null;
        // }

        return (
            <div>
                <h2>{this.props.name}</h2>
                <div>
                    <p>{this.props.weatherMain}</p>
                    <p>{this.props.weatherDescription}</p>
                    <p>{this.props.weatherIcon}</p>
                    <p>{this.props.temp}</p>
                    <img src={this.props.weatherIcon} />
                </div>
                <button onClick={(e) => this.save(e)}>Save</button>
            </div>
        )
    }

    save(e) {
        //console.log(e);

        this.props.onSave(this.props.name);
    }
}