import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import styled from 'styled-components'

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
    <View style={styles.container}>
      <View style={styles.menu}>
        <ButtonUnselected
          onClick={() => navigation.navigate('TabOne')}
        >
          Entrada
        </ButtonUnselected>
        <ButtonSelected
          onClick={() => navigation.navigate('TabTwo')}
        >
          Saída
        </ButtonSelected>
      </View>
    </View>
  );
}
const ButtonSelected = styled.button`
    background-color: #FFFFFF;
    border: none;
    border-bottom: 2px solid #4DD0E1;
    color: #4DD0E1;

    font-family: Open Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
    text-align: center;
    height: 48px;

`
const ButtonUnselected = styled.button`
    background-color: #FFFFFF;
    border: none;

    font-family: Open Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
    text-align: center;
    height: 48px;
`

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
  },
  menu: {
    top: '41px',
    width: '100%',
    textAlign: 'center',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
  },
});
