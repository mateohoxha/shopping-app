import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, Button, Image, StyleSheet, Alert } from 'react-native';

import Colors from '../../constants/Colors';
import * as cartActions from '../../store/actions/cart';

const ProductDetail = props => {
    const productId = props.navigation.getParam('productId');
    const selectedProduct = useSelector(state => state.products.availableProducts.find(product => product.id === productId));

    const dispatch = useDispatch();

    const addToCartHandler = item => {
        Alert.alert('Added to cart!', `${item.title} was added to the cart.`, [
            {
                text: 'Ok', style: 'default', onPress: () => {
                    dispatch(cartActions.addToCart(item))
                }
            }
        ]);
    };

    return (
        <View>
            <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
            <View style={styles.buttonContainer}>
                <Button
                    title="Add to cart"
                    color={Colors.primary}
                    onPress={addToCartHandler.bind(this, selectedProduct)}
                />
            </View>
            <Text style={styles.price}>${selectedProduct.price}</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>
        </View>
    )
}

ProductDetail.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('productTitle')
    };
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300
    },
    buttonContainer: {
        alignItems: 'center',
        marginVertical: 10
    },
    price: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20,
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20
    }
});

export default ProductDetail;