import React, { Component, ComponentType } from 'react';
import { connect } from 'react-redux';


interface Props {
    currentPosition: number;
    paused: boolean;
}

interface State {
    currentPosition: number;
}

export const withCurrentTrackPosition = <P extends object>(ChildComponent: ComponentType<P>) => {
    @(connect(
        (state: any) => ({
            currentPosition: state.playerState.value.seek,
            paused: state.playerState.value.status !== 'play',
        })
    ) as any)
    class Wrapped extends Component<P & Props, State> {
        timer: any;
        state = {
            currentPosition: 0,
        };

        constructor(props: any) {
            super(props);

            this.state = {
                currentPosition: props.currentPosition,
            }
        }

        componentWillReceiveProps(nextProps: Props) {
            // Ususally on each pushState
            this.setState({ currentPosition: nextProps.currentPosition });
        }

        // FIXME: Find a better solution than this to increment the seconds
        componentDidUpdate(prevProps: Props) {
            if (prevProps.paused !== this.props.paused) {
                if (this.props.paused === false) {
                    this.timer = setInterval(() => {
                        this.setState({
                            currentPosition: ++this.state.currentPosition
                        });
                    }, 1000);
                } else {
                    clearTimeout(this.timer);
                }
            }
        }

        render() {
            const { currentPosition } = this.state;
            const {paused} = this.props;

            return (
                <ChildComponent
                    {...this.props}
                    currentPosition={currentPosition}
                    paused={paused}
                />
            )
        }
    }

    return Wrapped;
}
