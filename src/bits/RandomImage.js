/* eslint global-require: "off" */
import React from 'react';
import { Image } from 'react-native';

export default class FlareDate extends React.PureComponent {

    constructor(props) {
        super(props);

        const randomIndex = Math.floor(Math.random() * props.sources.length);
        this.state = {
            currentSource: props.sources[randomIndex],
        };
    }

    render() {
        return (
            <Image
                {...this.props}
                source={this.state.currentSource}
            />
        );
    }
}
