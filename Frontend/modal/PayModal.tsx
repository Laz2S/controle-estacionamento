import * as React from 'react';
import { StyleSheet } from 'react-native';
import './modal.css';
import styled from 'styled-components'
import { Text, View } from '../components/Themed';
import api from '../service/ParkingService.tsx';
import LoadModal from '../modal/LoadModal.tsx';

export default function Modal ({ handleClose, show, plate }) {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const [loadModalStatus, onChangeLoadModalStatus] = React.useState("");
  const [icon, onChangeIcon] = React.useState("");
  const [text, onChangeText] = React.useState("");

  const payPost = async () => {
    showLoadModal()
    onChangeIcon('spinner')
    onChangeText('Confirmando...')
    const body = {
      plate: plate
    }
    let result = await api.PayOne(body)
    if (result.status >= 200 || result.status < 300) {
      if (result.data.errors) {
        alert(result.data.errors.plate)
      }
      else if (result.status === 404) {
        alert(result.statusText)
      }
    }
    else {
      onChangeIcon('check-circle')
      onChangeText('PAGO!')
    }
    setTimeout(hideLoadModal, 1000)
    handleClose()
  }

  const showLoadModal = () => {
    onChangeLoadModalStatus(true);
  };

  const hideLoadModal = () => {
    onChangeLoadModalStatus(false);
  };

  return (
    <div className={showHideClassName}>
      <LoadModal show={loadModalStatus} icon={icon} text={text} handleClose={hideLoadModal}>
      </LoadModal>
      <View style={styles.content}>
        <ModalTitle>
          Confima o pagamento da placa abaixo?
        </ModalTitle>
        <ModalPlate>
          {plate}
        </ModalPlate>
        <ButtonPayment
          onClick={payPost}
          plate={plate}
        >
          CONFIRMAR
        </ButtonPayment>
        <Text style={styles.closeModal} onClick={handleClose}>VOLTAR</Text>
      </View>
    </div>
  );
};
const ModalTitle = styled.div`
  margin-top: 61px;
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  text-align: center;

  color: #4A4A4A;
`
const ModalPlate = styled.div`
  margin-top: 3px;
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 38px;
  line-height: 52px;

  color: #00BCD4;
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

const styles = StyleSheet.create({
  content: {
    position: 'absolute',
    height: '100%',
    top: '153px',
    width: '100%',
    alignItems: 'center',
    textAlign: 'left',
  },
  closeModal: {
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '15px',
    lineHeight: '20px',
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#4DD0E1',
  },
});