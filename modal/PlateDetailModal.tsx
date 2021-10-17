import * as React from 'react';
import { StyleSheet } from 'react-native';
import './modal.css';
import styled from 'styled-components'
import { Text, View } from '../components/Themed';
import api from '../service/ParkingService.tsx';
import Icon5 from 'react-native-vector-icons/FontAwesome5';

export default function Modal ({ handleClose, show, obj }) {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <View style={styles.content}>
        <Icon5 style={styles.backIcon} color='#00BCD4' name='long-arrow-alt-left' size='32px' onClick={handleClose}/>
        <View style={styles.detail}>
          <Text style={styles.title}>PLACA</Text>
          <Text style={styles.plate}>{obj.plate}</Text>
          <Text style={styles.title}>STATUS</Text>
          <Text style={styles.text}>{obj.left ? "Saída" : "Estacionado"}</Text>
          <Text style={styles.title}>TEMPO ATUAL</Text>
          <Text style={styles.text}>{obj.time}</Text>
          <Text style={styles.title}>PAGAMENTO</Text>
          <Text style={styles.text}>{obj.paid ? "Pago" : "-"}</Text>
        </View>
      </View>
    </div>
  );
};
const ViewItem = styled.div`
    background: #FFFFFF;
    border: 1px solid #E4E3E3;
    box-sizing: border-box;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    height: 83px;
    margin: 10px;
    display: grid;
    border-radius: 4px;
    margin-bottom: 12px;
    align-items: center;
    grid-template-columns: 1fr 1fr;
    text-align: center;
`

const styles = StyleSheet.create({
  content: {
    position: 'absolute',
    height: '80%',
    top: '85px',
    width: '100%',
    alignItems: 'center',
    textAlign: 'left',
    overflow: "auto"
  },
  backIcon: {
    width:'80%',
  },
  detail: {
    marginTop: '27px',
    width: '80%',
    display: 'grid',
    gridTemplateRows: 'repeat(3, 1fr 2fr)',
  },
  plate: {
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '38px',
    lineHeight: '52px',

    color: '#00BCD4',
  },
  text: {
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '24px',
    lineHeight: '33px',

    color: '#0A261D',
  },
  title: {
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '12px',
    lineHeight: '16px',
    textTransform: 'uppercase',

    color: '#9B9B9B',
  }
});