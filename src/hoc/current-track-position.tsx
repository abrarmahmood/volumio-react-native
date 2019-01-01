import React, { Component, ComponentType } from 'react';
import { connect } from 'react-redux';


export interface InjectedCurrentPositionProps {
    currentPosition: number;
    paused: boolean;
}

interface CurrentPositionState {
    currentPosition: number;
}

export const withCurrentTrackPosition = <P extends InjectedCurrentPositionProps>(ChildComponent: ComponentType<P>) => {
    @(connect(
        (state: any) => ({
            currentPosition: state.playerState.value.seek,
            paused: state.playerState.value.status !== 'play',
        })
    ) as any)
    class Wrapped extends Component<Exclude<P, InjectedCurrentPositionProps>, CurrentPositionState> {
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

        componentWillReceiveProps(nextProps: InjectedCurrentPositionProps) {
            // Ususally on each pushState
            this.setState({ currentPosition: nextProps.currentPosition });
        }

        private handleIncrement() {
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

        componentDidMount() {
            this.handleIncrement();
        }

        // FIXME: Find a better solution than this to increment the seconds
        componentDidUpdate(prevProps: InjectedCurrentPositionProps) {
            if (prevProps.paused !== this.props.paused) {
                this.handleIncrement();
            }
        }

        render() {
            const { currentPosition } = this.state;
            const { paused } = this.props;

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
