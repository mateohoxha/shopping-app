import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CartItems = props => {
    return (
        <View style={styles.cart}>
            <View style={styles.cartData}>
                <Text style={styles.qty}>{props.quantity} </Text>
                <Text style={styles.text}>{props.title}</Text>
            </View>
            <View style={styles.cartData}>
                <Text style={styles.text}>{props.amount.toFixed(2)}</Text>
                {props.deletable && (
                    <TouchableOpacity
                        onPress={props.onDelete}
                        style={styles.deleteButton}
                    >
                        <Ionicons
                            name={'md-trash'}
                            size={23}
                            color="red"
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cart: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: 10,
        marginHorizontal: 20
    },
    cartData: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontSize: 16
    },
    qty: {
        fontSize: 16,
        color: '#888'
    },
    deleteButton: {
        marginLeft: 20
    }
});

export default CartItems;