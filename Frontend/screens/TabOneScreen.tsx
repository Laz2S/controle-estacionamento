import * as React from 'react';
import { TextInput, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import styled from 'styled-components'

import LoadModal from '../modal/LoadModal.tsx';
import api from '../service/ParkingService.tsx';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [loadModalStatus, onChangeLoadModalStatus] = React.useState("");
  const [icon, onChangeIcon] = React.useState("");
  const [text, onChangeText] = React.useState("");
  const [plate, onChangePlate] = React.useState("");
  const [error, onChangeError] = React.useState("");
  const [errorStatus, onChangeErrorStatus] = React.useState(false);

  const entryPost = async () => {
    showLoadModal()
    onChangeIcon('spinner')
    onChangeText('Registrando...')
    const body = {
      plate: plate
    }
    let result = await api.EntryOne(body)
    if (result.status >= 200 || result.status < 300) {
      console.log('if')
      if (result.data.errors) {
        onChangeErrorStatus(true)
        onChangeError(result.data.errors.plate)
      }
      else if (result.status === 404) {
        onChangeErrorStatus(true)
        onChangeError(result.statusText)
      }
    }
    else {
      console.log('else')
      onChangeIcon('check-circle')
      onChangeText('REGISTRADO!')
    }
    setTimeout(hideLoadModal, 1000)
 }

  const showLoadModal = () => {
    onChangeLoadModalStatus(true);
  };

  const hideLoadModal = () => {
    onChangeLoadModalStatus(false);
  };

  const formatPlateName = (textValue) => {
    onChangeErrorStatus(false)

    let newValue = textValue
    let regexPlate = /^[a-zA-Z]{3}$/;
    if (newValue.length > 2) {
      let dashIndex = newValue.search('-')
      if (dashIndex == -1) {
        let letterValue = newValue.split('').splice(0, 3).join('')
        let numericValue = newValue.split('').splice(3, 4).join('')
        if (/^[a-zA-Z]+$/.test(letterValue) && !isNaN(numericValue) && numericValue.length > 0) {
          newValue = newValue.split('')
          newValue.splice(3, 0, '-')
          newValue = newValue.join('')
        }
      }
    }
    if (regexPlate.test(newValue) && newValue.length === 3 && plate.length !== 4) newValue += '-'

    let dashIndex = newValue.search('-')
    if (dashIndex > -1) {
      let dashValue = newValue.split('-')[1]
      if (dashValue && isNaN(dashValue)) {
        newValue = newValue.split('')
        newValue.splice(dashIndex, 1)
        newValue = newValue.join('')
      }
    } else if (newValue.length > 7) {
      newValue = newValue.split('')
      newValue.splice(7, 1)
      newValue = newValue.join('')
    }
    onChangePlate(newValue.toUpperCase());
  }

  return (
    <View style={styles.container}>
      <LoadModal show={loadModalStatus} icon={icon} text={text} handleClose={hideLoadModal}>
      </LoadModal>
      <View style={styles.menu}>
        <ButtonSelected
          onClick={() => navigation.navigate('TabOne')}
        >
          Entrada
        </ButtonSelected>
        <ButtonUnselected
          onClick={() => navigation.navigate('TabTwo')}
        >
          Sa??da
        </ButtonUnselected>
      </View>
      <View style={styles.content}>
        <Text style={styles.plateNumber}>N??mero da placa:</Text>
        <TextInput
          style={styles.input}
          onChangeText={formatPlateName}
          value={plate}
          placeholder="AAA-0000"
          maxLength="8"
        />
        <ViewError show={errorStatus}>
          <Icon style={styles.errorIcon} color='#FF1744' name='exclamation-circle' size='20px' />
          <Text style={styles.errorMessage}>{error}</Text>
        </ViewError>
        <ButtonConfirm
          onClick={entryPost}
          plate={plate}
        >
          CONFIRMAR ENTRADA
        </ButtonConfirm>
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
const ButtonConfirm = styled.button`
    background-color: ${props => props.plate ? "#28DD91" : "#DADADA"};
    border: none;
    color: ${props => props.plate ? "#FFFFFF" : "#9B9B9B"};

    font-family: Open Sans;
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    line-height: 20,43px;
    text-align: center;
    height: 67px;
    width: 80%;
    border-radius: 4px;
`
const ViewError = styled.div`
    display: ${props => props.show ? "grid" : "none"};
    background-color: rgba(255, 23, 68, 0.15);
    border-radius: 4px;
    width: 80%;
    height: 32px;
    margin-bottom: 12px;
    align-items: center;
    grid-template-columns: 0fr 1fr;
`

const styles = StyleSheet.create({
  input: {
    height: '67px',
    margin: 12,
    borderWidth: 1,
    padding: 10,
    textAlign: 'center',
    width: '80%',
    backgroundColor: '#FFFBE6',
    fontSize: '24px',
    border: '1px solid #CCCCCC',
    boxSizing: 'border-box',
    borderRadius: '4px',
  },
  container: {
    height: '100%',
    alignItems: 'center',
  },
  content: {
    top: '88px',
    width: '100%',
    alignItems: 'center',
    textAlign: 'left',
  },
  menu: {
    top: '41px',
    width: '95%',
    textAlign: 'center',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
  },
  plateNumber: {
    position: 'absolute',
    left: '10%',
    top: '-10px',
    color: '#9B9B9B',
  },
  errorIcon: {
    margin: '5px',
  },
  errorMessage: {
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '15px',
    lineHeight: '20px',
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#FF1744',
  }
});
