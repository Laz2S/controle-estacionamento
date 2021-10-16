import * as React from 'react';
import { StyleSheet } from 'react-native';
import './modal.css';
import styled from 'styled-components'
import { Text, View } from '../components/Themed';
import api from '../service/ParkingService.tsx';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import InfiniteScroll from "react-infinite-scroll-component";

import PlateDetailModal from '../modal/PlateDetailModal.tsx';

export default function Modal ({ handleClose, show, plate }) {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const [modalStatus, onChangeModalStatus] = React.useState("");
  const [dataArray, onChangeDataArray] = React.useState([]);
  const [selectedPlate, onChangeSelectedPlate] = React.useState([]);

  const loadHistory = async () => {
    if (plate.length > 0) {
      let result = await api.HistoryOne(plate)
      console.log(result)
      if (result.length > 0) {
        onChangeDataArray(result)
      }
      if (result.status >= 200 || result.status < 300) {
        if (result.data.errors) {
          alert(result.data.errors.plate)
        }
        if (result.status === 404) {
          alert(result.statusText)
        }
      }
    }
  }

  const showModal = (obj) => {
    onChangeSelectedPlate(obj);
    onChangeModalStatus(true);
  };

  const hideModal = () => {
    onChangeModalStatus(false);
  };

  React.useEffect(() => {
    loadHistory()
  }, [show]);

  return (
    <div className={showHideClassName}>
      <PlateDetailModal show={modalStatus} handleClose={hideModal} obj={selectedPlate}/>
      <View style={styles.content}>
      <div id="scrollableDiv" style={{ width: '80%' }}>
        <ViewTitle>
          <Icon5 color='#00BCD4' name='long-arrow-alt-left' size='32px' onClick={handleClose}/>
          <Text style={styles.title}>Placa {plate}</Text>
        </ViewTitle>
        <InfiniteScroll
          style={styles.infinityScroll}
          dataLength={dataArray.length}
          loader={<h4>Loading...</h4>}
          scrollableTarget="scrollableDiv"
        >
          {dataArray.map((obj, index) => (
            <ViewItem key={index} onClick={() => showModal(obj)}>
              <Text>TEMPO ATUAL</Text>
              <Text>PAGAMENTO</Text>
              <Text>{obj.time}</Text>
              <Text>{obj.paid ? "Pago" : "-"}</Text>
            </ViewItem>
          ))}
        </InfiniteScroll>
        </div>
      </View>
    </div>
  );
};
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
const ViewTitle = styled.div`
    display: grid;
    border-radius: 4px;
    width: 80%;
    height: 32px;
    margin-bottom: 12px;
    align-items: center;
    grid-template-columns: 0fr 1fr;
`
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
  title: {
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '24px',
    lineHeight: '33px',
    textAlign: 'center',

    color: '#00BCD4',
  },
});