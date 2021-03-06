import * as React from 'react';
import { TextInput, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import styled from 'styled-components'

import PayModal from '../modal/PayModal.tsx';
import OutModal from '../modal/OutModal.tsx';
import HistoryModal from '../modal/HistoryModal.tsx';
import api from '../service/ParkingService.tsx';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [payModalStatus, onChangePayModalStatus] = React.useState("");
  const [outModalStatus, onChangeOutModalStatus] = React.useState("");
  const [historyModalStatus, onChangeHistoryModalStatus] = React.useState("");
  const [plate, onChangePlate] = React.useState("");
  const [error, onChangeError] = React.useState("");
  const [errorStatus, onChangeErrorStatus] = React.useState(false);

  const showPayModal = () => {
    if (plate.length > 0) onChangePayModalStatus(true);
  };

  const hidePayModal = () => {
    onChangePayModalStatus(false);
  };

  const showOutModal = () => {
    if (plate.length > 0) onChangeOutModalStatus(true);
  };

  const hideOutModal = () => {
    onChangeOutModalStatus(false);
  };

  const showHistoryModal = () => {
    if (plate.length > 0) onChangeHistoryModalStatus(true);
  };

  const hideHistoryModal = () => {
    onChangeHistoryModalStatus(false);
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
      <PayModal show={payModalStatus} handleClose={hidePayModal} plate={plate}/>
      <OutModal show={outModalStatus} handleClose={hideOutModal} plate={plate}/>
      <HistoryModal show={historyModalStatus} handleClose={hideHistoryModal} plate={plate}/>
      <View style={styles.menu}>
        <ButtonUnselected
          onClick={() => navigation.navigate('TabOne')}
        >
          Entrada
        </ButtonUnselected>
        <ButtonSelected
          onClick={() => navigation.navigate('TabTwo')}
        >
          Sa??da
        </ButtonSelected>
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
        <ButtonPayment
          onClick={showPayModal}
          plate={plate}
        >
          PAGAMENTO
        </ButtonPayment>
        <ButtonLeave
          onClick={showOutModal}
          plate={plate}
        >
          SA??DA
        </ButtonLeave>
        <Text style={styles.history} onClick={showHistoryModal}>VER HIST??RICO</Text>
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
const ButtonPayment = styled.button`
    background-color: ${props => props.plate ? "#A769B2" : "#DADADA"};
    border: 1px solid #DADADA;
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
    margin-bottom: 16px;
`
const ButtonLeave = styled.button`
    background-color: #FFFFFF;
    border: ${props => props.plate ? "2px solid #A769B2" : "2px solid #DADADA"};
    color: ${props => props.plate ? "#A769B2" : "#9B9B9B"};

    font-family: Open Sans;
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    line-height: 20,43px;
    text-align: center;
    height: 67px;
    width: 80%;
    border-radius: 4px;
    margin-bottom: 16px;
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
  history: {
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '15px',
    lineHeight: '20px',
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#4DD0E1',
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
