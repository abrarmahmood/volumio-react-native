import React from "react";
import { StyleSheet, View, Image } from "react-native";


interface Props {
    albumart: string;
}

export default class BackgroundAlbumArt extends React.Component<Props> {
    render() {
        const {albumart} = this.props;;

        return (
            <View style={styles.container}>
                <Image
                    source={{ uri: albumart }}
                    style={styles.backgroundAlbumArt}
                    blurRadius={10}
                    resizeMode="cover"
                />
                <View style={styles.backgroundAlbumArtTint} /> 
                {this.props.children}
            </View>
        )
    }
}

// TODO: This must be the worst thing i've ever done. there must be a better way
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    backgroundAlbumArt: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.8)',
    },
    backgroundAlbumArtTint: { // ??!!
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
    }
});
