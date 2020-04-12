import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Button, FlatList, Text, ActivityIndicator, StyleSheet } from 'react-native';

import CartItem from '../../components/shop/CartItem';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
import * as cartActions from '../../store/actions/cart';
import * as orderActions from '../../store/actions/orders';

const CartScreen = props => {
    const [isLoading, setIsLoading] = useState(false);

    const totalAmount = useSelector(state => state.cart.totalAmount);
    const cartItems = useSelector(state => {
        const addedCartItems = [];
        for (const key in state.cart.items) {
            addedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum,
            });
        }
        return addedCartItems.sort((a, b) =>
            a.productId > b.productId ? 1 : -1
        );
    });

    const dispatch = useDispatch();

    const sendOrderHandler = async () => {
        setIsLoading(true);
        await dispatch(orderActions.addOrder(cartItems, totalAmount));
        setIsLoading(false);
    };

    return (
        <View style={styles.screen}>
            <Card style={styles.card}>
                <Text style={styles.cardText}>
                    Total:
                    <Text style={styles.amount}> ${Math.round(totalAmount.toFixed(2) * 100) / 100}</Text>
                </Text>
                {isLoading ? <ActivityIndicator size='small' color={Colors.primary} /> : <Button
                    title='Order Now'
                    disabled={cartItems.length === 0}
                    color={Colors.accent}
                    onPress={sendOrderHandler}
                />}
            </Card>
            <FlatList
                data={cartItems}
                keyExtractor={item => item.productId}
                renderItem={itemData => (
                    <CartItem
                        title={itemData.item.productTitle}
                        quantity={itemData.item.quantity}
                        amount={itemData.item.sum}
                        deletable
                        onDelete={() => {
                            dispatch(cartActions.removeFromCart(itemData.item.productId))
                        }}
                    />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        margin: 20
    },
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginBottom: 20
    },
    cardText: {
        fontSize: 18
    },
    amount: {
        color: Colors.primary
    }
});

export default CartScreen;