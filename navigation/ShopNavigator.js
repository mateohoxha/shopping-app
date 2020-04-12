import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { SafeAreaView, Button, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import * as authActions from '../store/actions/auth';

import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import UserProductScreen from '../screens/user/UserProductScreen';
import AuthScreen from '../screens/user/AuthScreen';
import StartupScreen from '../screens/StartupScreen';

import Colors from '../constants/Colors';

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Colors.primary
    },
    headerTintColor: 'white',
}

const ProductsNavigator = createStackNavigator(
    {
        ProductsOverview: ProductsOverviewScreen,
        ProductDetail: ProductDetailScreen,
        Cart: CartScreen
    },
    {
        navigationOptions: {
            drawerIcon: drawerConfig => (
                <Ionicons
                    name={'md-cart'}
                    size={23}
                    color={drawerConfig.tintColor}
                />
            )
        },
        defaultNavigationOptions: defaultNavOptions
    }
);

const OrdersNavigator = createStackNavigator({
    Orders: OrdersScreen,
}, {
        navigationOptions: {
            drawerIcon: drawerConfig => (
                <Ionicons
                    name={'md-list'}
                    size={23}
                    color={drawerConfig.tintColor}
                />
            )
        },
        defaultNavigationOptions: defaultNavOptions
    });

const AdminNavigator = createStackNavigator({
    UserProducts: UserProductScreen,
    EditProducts: EditProductScreen
}, {
        navigationOptions: {
            drawerIcon: drawerConfig => (
                <Ionicons
                    name={'md-create'}
                    size={23}
                    color={drawerConfig.tintColor}
                />
            )
        },
        defaultNavigationOptions: defaultNavOptions
    });

const ShopNavigator = createDrawerNavigator({
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator
}, {
        contentOptions: {
            activeTintColor: Colors.primary,
        },
        contentComponent: props => {
            const dispatch = useDispatch();
            return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                        <DrawerItems {...props} />
                        <Button title="Log out" color={Colors.primary} onPress={() => {
                            dispatch(authActions.logout());
                            // props.navigation.navigate('Auth');
                        }} />
                    </SafeAreaView>
                </View>
            );
        }
    });

const AuthNavigator = createStackNavigator({
    Auth: AuthScreen
}, {
        defaultNavigationOptions: defaultNavOptions
    });

const MainNavigator = createSwitchNavigator({
    Startup: StartupScreen,
    Auth: AuthNavigator,
    Shop: ShopNavigator
});

export default createAppContainer(MainNavigator);
