import React,{useState,useEffect} from 'react';
import {PermissionsAndroid,Platform} from 'react-native';
import Common from './helpers/Common';
import Login from './Login';
import { Container , Header, InputGroup , Picker, Title, Content, Card , CardItem, Toast , Footer, FooterTab, Button, Left, Right, Body, Icon, Text , Form , Item , Input, Textarea, View, Root } from 'native-base';
import styles from './css/Styles';
import PersianCalendarPicker from 'react-native-persian-calendar-picker';
import Modal from "react-native-modal";
import axios from 'axios';
import qs from 'querystring';
import ContactsWrapper from 'react-native-contacts-wrapper';
import DocumentPicker from 'react-native-document-picker';
import { readFile } from 'react-native-fs';
import XLSX from 'xlsx';

const Dashboard = (props)=>{
    const[lines,setLines] = useState([]);
    const[loginDetails,setLoginDetails] = useState({});
    const[contacts,setContacts] = useState({});
    const[wait,setWait] = useState(false);
    useEffect(() => {
        async function getIt() {
            await Common.loginDetails().then(data=>{
                setLoginDetails(data);
            }).catch(err=>{
                setLoginDetails({});
            });
        }
        async function getLines(){
            let requestBody = {
                uname: loginDetails.name,
                pass: loginDetails.pass,
                op:'lines'
            };
            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };
            await axios.post('http://37.130.202.188/services.jspd', qs.stringify(requestBody), config)
            .then((result) => {
                if(result.data[0] == 0){
                    let data = JSON.parse(result.data[1]);
                    let res = [];
                    for (let item of Object.entries(data)) {
                        item = JSON.parse(item[1]);
                        if(item.send){
                            res.push(item.number);
                        }
                    }
                    setLines(res);
                }
                
            });
        }
        getIt();
        getLines();
    });
    const[phone,setPhone] = useState([]);
    const[msg,setMsg] = useState('');
    const[future,setFuture] = useState('');
    const[showModal,setShowModal] = useState(false);
    const[from,setFrom] = useState('');
    const contactsCallback = ()=>{
        ContactsWrapper.getContact()
        .then((contact) => {
            phone.push(contact.phone);
        })
        .catch((error) => {
            console.log("ERROR CODE: ", error.code);
            console.log("ERROR MESSAGE: ", error.message);
        });
    }

    const dateHandler = (date)=>{
        setFuture(date.split('T')[0]);
        setShowModal(false);
    }

    const phoneHandler = (phone)=>{
        setPhone(phone.split(','));
    }

    const msgHandler = (msg)=>{
        setMsg(msg);
    }

    const fromHandler = (val)=>{
        setFrom(val);
    }


    const sendSms = ()=>{
        setWait(true);
        let requestBody = {
            uname: loginDetails.name,
            pass: loginDetails.pass,
            message:msg,
            op:'send',
            to:JSON.stringify(phone),
            time:future,
            from:from
        };
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        axios.post('http://37.130.202.188/services.jspd', qs.stringify(requestBody), config)
        .then((result) => {
            if(result.data[0] != 0){
                let errMsg = Common.errorMsg(parseInt(result.data[0]));
                Toast.show({
                    text:errMsg,
                    type:'danger',
                    duration:3000,
                    buttonText:"",
                    textStyle:{
                        fontFamily:'Vazir'
                    }
                });
            }else {
                Toast.show({
                    text:'پیامک شما با موفقیت ارسال شد !',
                    type:'success',
                    duration:3000,
                    buttonText:"",
                    textStyle:{
                        fontFamily:'Vazir'
                    }
                });
            }
        }).finally(()=>{
            setWait(false);
        });
        
    }
    const PickXlxs = async ()=>{
        try {
            const res = await DocumentPicker.pick({
              type: [DocumentPicker.types.allFiles],
            });
            readFile(res.uri, 'ascii').then((res) => {
                const workbook = XLSX.read(res, {type:'binary'});
                let sheet_name_list = workbook.SheetNames;
                let numbers = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
                let resnum = [];
                for(let obj of numbers){
                    resnum.push(String(Object.values(obj)[0]))
                }
                setPhone(resnum);
            });
        } catch (err) {

        }
    };
    const DashboardView = <Container>
                    <Header>
                        <Left />
                        <Body style={{alignItems:'flex-end'}}>
                            <Title style={styles.text}>فراز اس ام اس</Title>
                        </Body>
                        <Right />
                    </Header>
                    <Content style={styles.content}>
                        <Card>
                            <CardItem>
                            <Body style={styles.card}>
                                <Text style={styles.text}>
                                    شماره مورد نظر خود را وارد کنید یا از طریق دکمه کناری از مخاطبین خود انتخاب کنید !
                                </Text>
                            </Body>
                            </CardItem>
                        </Card>
                        <Form>
                            <Item last style={{paddingLeft:0}}>
                                <Button primary>
                                    <Icon name='address-book' type="FontAwesome" onPress={contactsCallback} />
                                </Button>
                                <Button warning style={{marginLeft:10}}>
                                    <Icon name='file-excel' type="FontAwesome5" onPress={PickXlxs} />
                                </Button>
                                <Input value={phone.join(',')} placeholder='شماره همراه' onChangeText={phoneHandler} style={styles.text} />
                            </Item>
                            <Item picker last>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined,fontFamily:'Vazir' }}
                                placeholder="شماره ارسال کننده را انتخاب کنید"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                onValueChange={fromHandler}
                            >
                                {lines.map((line)=><Picker.Item label={line} key={line} value={line} />)}
                            </Picker>
                            </Item>
                            <Item last>
                                <Input style={styles.text} multiline onChangeText={msgHandler} placeholder="متن پیامک"/> 
                            </Item>
                            <Button block dark bordered rounded iconRight style={{marginTop:15,flexGrow:2}} onPress={()=>{setShowModal(true)}}>
                                <Text style={styles.text}>تنظیم برای آینده</Text>
                                <Icon name='calendar' />
                            </Button>
                            <Modal backdropColor={"white"} backdropOpacity={0.9} isVisible={showModal} onBackdropPress={() => setShowModal(false) }>
                                <View style={{justifyContent:'space-between',flexDirection:'row'}}>
                                    <Button small danger bordered style={{marginTop:10}} onPress={()=>{setShowModal(false);setFuture('')}}>
                                        <Icon name='close' type="FontAwesome" />
                                    </Button> 
                                    <Button small success bordered style={{marginTop:10}} onPress={()=>{setShowModal(false)}}>
                                        <Icon name='check' type="FontAwesome" />
                                    </Button>
                                </View>
                                <View>
                                    <PersianCalendarPicker onDateChange={dateHandler} textStyle={{fontFamily:'Vazir'}} />
                                </View>
                            </Modal>
                            <Button success disabled={wait} iconRight rounded block style={{marginTop:15,marginBottom:15,flexGrow:2}} onPress={sendSms}>
                                <Text style={styles.text}>ارسال پیامک</Text>
                                <Icon name='paper-plane' type="FontAwesome" />
                            </Button>
                        </Form>
                    </Content>
                    {/* <Footer>
                        <FooterTab>
                            <Button vertical active small>
                                <Icon name="sms" type="FontAwesome5" />
                                <Text style={styles.text}>داشبورد</Text>
                            </Button>
                            <Button vertical small onPress={() => props.navigation.navigate('Groups') }>
                                <Icon name="users" type="FontAwesome5"/>
                                <Text style={styles.text}>گروه ها</Text>
                            </Button>
                        </FooterTab>
                    </Footer> */}
                </Container>;
    return loginDetails ? DashboardView : <Login />;
};

export default Dashboard;