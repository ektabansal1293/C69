import React from 'react';
import {Text,TouchableOpacity,View,StyleSheet} from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';


export default class TransactionScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            hasCameraPermissions:null,
            scanned:false,
            scannedData:'',
            buttonState:'normal'
        }
    }

    handleBarCodeScanned=async({type,data})=>{
        this.setState({
            scanned:true,
            scannedData:data,
            buttonState:'normal'
        });
    }

    getCameraPermission=async()=>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermissions: status === 'granted',
            buttonState:'clicked',
            scanned:false
        })
    }

    render(){
        
            const hasCameraPermissions = this.state.hasCameraPermissions;
            const buttonState = this.state.buttonState;
            const scanned = this.state.scanned;

            if(buttonState==="clicked" && hasCameraPermissions===true){
                return(
                    <BarCodeScanner 
                        onBarCodeScanned={scanned===true ? undefined :this.handleBarCodeScanned}
                        style={StyleSheet.absoluteFillObject}/>
                )
            }

            else if(buttonState==="normal"){
                return(
                <View style={styles.container}>
                    <Text style = {styles.displayText}>
                        {hasCameraPermissions===true ? this.state.scannedData : 'Request Camera Permission'}
                    </Text>

                    <TouchableOpacity 
                        onPress = {this.getCameraPermission}
                        style = {styles.scanButton}>
                            <Text>Scan QR code</Text>
                    </TouchableOpacity>
                </View>
                )
            }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      displayText:{
        fontSize: 15,
        textDecorationLine: 'underline'
      },
      scanButton:{
        backgroundColor: '#2196F3',
        padding: 10,
        margin: 10
      },
      buttonText:{
        fontSize: 20,
      }
})