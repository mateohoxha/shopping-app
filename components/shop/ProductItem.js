import React from 'react';
import { View, Image, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import Card from '../UI/Card';

const ProductItem = props => {
    return (
        <Card style={styles.card}>
            <View style={styles.product}>
                <TouchableNativeFeedback onPress={props.onClick}>
                    <View>
                        <View style={styles.imageContainer}>
                            <Image style={styles.image} source={{ uri: props.image }} />
                        </View>
                        <View style={styles.details}>
                            <Text style={styles.title}>{props.title}</Text>
                            <Text style={styles.price}>${props.price}</Text>
                        </View>
                        <View style={styles.buttons}>
                            {props.children}
                        </View>
                    </View>
                </TouchableNativeFeedback>
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        height: 300,
        margin: 20,
    },
    product: {
        borderRadius: 10,
        overflow: 'hidden'
    },
    imageContainer: {
        width: '100%',
        height: '60%'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    details: {
        alignItems: 'center',
        height: '17%',
        padding: 10
    },
    title: {
        fontSize: 18,
        marginVertical: 2
    },
    price: {
        fontSize: 14,
        color: '#888'
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '23%',
        paddingHorizontal: 20
    }
});

export default ProductItem;
