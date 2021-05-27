import React,{useState,useEffect} from 'react';

import { Container, Header, Title, Content, Card , CardItem, Toast , Footer, FooterTab, Button, Left, Right, Body, Icon, Text , Form , Item , Input } from 'native-base';

import { Image } from 'react-native';
import styles from './css/Styles';
import axios from 'axios';
import qs from 'querystring';
import Common from './helpers/Common';

const Login = (props)=>{
    const[uname,setUname] = useState('');
    const[pass,setPass] = useState('');
    const[loginDetails,setLoginDetails] = useState({});
    useEffect(() => {
        async function getIt() {
            await Common.loginDetails().then(data=>{
                setLoginDetails(data);
            }).catch(err=>{
                setLoginDetails({});
            });
        }
        getIt();
    },[]);
    // Welcome Message
    if(!!!loginDetails){
        Toast.show({
            text:'برای استفاده از خدمات اپلیکیشن باید ابتدا وارد شوید !',
            duration:3000,
            buttonText:"",
            textStyle:{
                fontFamily:'Vazir'
            }
        });
    }
    // Login Process
    const loginCallback = () => {
        let res = loginRequest();
    }
    // Login Ajax Request
    const loginRequest = () => {
        let status = 0;
        let requestBody = {
            uname: uname,
            pass: pass,
            op:'credit'
        };
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        axios.post('http://37.130.202.188/services.jspd', qs.stringify(requestBody), config)
        .then((result) => {
            let Enum = result.data[0] , text , type;
            if(Enum == 962){
                text = 'نام کاربری  یا رمز عبور نادرست است !';
                type = 'danger';
            }else if(Enum == 0){
                text = 'شما با موفقیت وارد شدید !';
                type = 'success';
                status = 1;
                setPass(pass);
            }else {
                text = 'خطای نامشخصی رخ داده !';
                type = 'warning';
            }
            Toast.show({
                text:text,
                type:type,
                duration:3000,
                buttonText:"",
                textStyle:{
                    fontFamily:'Vazir'
                }
            });
            LoginLast(status);
        });
    }

    const LoginLast = status => {
        if(status){
            let loginDetailss = {
                name:uname,
                pass:pass,
                time: new Date().toDateString
            };
            Common.storeItem('userData',loginDetailss);
        }
    }
    
    return (
        <Container>
            <Header>
                <Left />
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
                        <Image source={require('../assets/img/login.png')} />
                        <Text style={styles.text}>
                        برای استفاده از خدمات اپلیکیشن باید ابتدا وارد شوید یا ثبت نام کنید
                        </Text>
                    </Body>
                    </CardItem>
                </Card>
                <Form>
                    <Item style={styles.input} last>
                         <Input placeholder="نام کاربری" style={styles.text} onChangeText={(val)=>{setUname(val)}} />
                    </Item>
                    <Item style={styles.input} last>
                        <Input placeholder="رمز عبور" style={{fontFamily:'Vazir',textAlign:'right'}} secureTextEntry onChangeText={(val)=>{setPass(val)}} />
                    </Item>
                    <Button iconRight rounded block style={{marginTop:15,flexGrow:2}} onPress={loginCallback}>
                        <Text style={styles.text}>ورود به حساب کاربری</Text>
                        <Icon name='key' />
                    </Button>
                    <Button iconRight danger rounded block style={{marginTop:15,flexGrow:2,marginBottom:5}} onPress={() => props.navigation.navigate('Register') }>
                        <Text style={styles.text}>ثبت نام</Text>
                        <Icon name='plus' type="FontAwesome" />
                    </Button>
                </Form>
            </Content>
        </Container>
    )
};



export default Login;