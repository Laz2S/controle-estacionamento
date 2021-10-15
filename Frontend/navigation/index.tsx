/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
import * as React from 'react';
import { Button, ColorSchemeName, StyleSheet } from 'react-native';

import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import LinkingConfiguration from './LinkingConfiguration';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label=""
        icon={() => <Icon5 color='#FFFFFF' name='parking' size='36px' />}
        style={styles.logo}
      />
      <DrawerItem
        label=""
        onPress={() => props.navigation.closeDrawer()}
        icon={() => <Icon color='#FFFFFF' name='close' size='36px' />}
        style={styles.shape}
      />
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

function RootNavigator(navigation) {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      initialRouteName="TabOne"
      screenOptions={({ navigation, route }) => ({
        headerStyle: {
          backgroundColor: '#4DD0E1',
        },
        headerLeft: () => (
          <DrawerItem
            label=""
            icon={() => <Icon5 color='#FFFFFF' name='parking' size='36px' />}
            style={styles.logo}
          />
        ),
        headerRight: () => (
          <DrawerItem
            label=""
            onPress={() => navigation.toggleDrawer()}
            icon={() => <Icon color='#FFFFFF' name='bars' size='36px' />}
            style={styles.shape}
          />
        ),
        drawerStyle: {
          backgroundColor: '#4DD0E1',
          width: '100%'
        },
        drawerPosition: 'right',
        drawerType: 'back',
        title: '',
        drawerLabelStyle: {
          color: '#FFFFFF',
          fontFamily: 'Open Sans',
          fontStyle: 'normal',
          fontWeight: '600',
          fontSize: '16px',
          lineHeight: '22px',
        },
        drawerItemStyle: {
          marginBottom: '46px',
        },
        backBehavior: 'initialRoute',
        drawerActiveBackgroundColor: '',
      })}
    >
      <Drawer.Screen options={{ drawerLabel: 'Entrada' }} name="TabOne" component={TabOneScreen} />
      <Drawer.Screen options={{ drawerLabel: 'Saída' }} name="TabTwo" component={TabTwoScreen} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  shape: {
    alignItems: 'end',
    marginRight: '-50px',
  },
  logo: {
    position: 'absolute',
  },
});