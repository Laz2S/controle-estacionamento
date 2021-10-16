import * as React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import './modal.css';
import Icon5 from 'react-native-vector-icons/FontAwesome5';

export default function Modal ({ handleClose, show, icon, text }) {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <View style={styles.content}>
        <View style={styles.layout}>
            <Icon5 color='#00BCD4' name={icon} size='70px'/>
            <Text>{text}</Text>
        </View>
    </View>
    </div>
  );
};

const styles = StyleSheet.create({
  content: {
    position: 'absolute',
    height: '100%',
    top: '153px',
    width: '100%',
    alignItems: 'center',
    textAlign: 'left',
  },
  text: {
    position: 'absolute',
    width: '103px',
    height: '22px',
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '22px',
    textAlign: 'center',

    color: '#4A4A4A',
  },
  layout: {
    marginTop: '100px',
  }
});
