import React from 'react';

import { Container, Header, Title, Picker, Content, Card , CardItem, Footer, FooterTab, Button, Left, Right, Body, Icon, Text , Form , Item , Input } from 'native-base';

import styles from './css/Styles';

const Register = (props)=>{
    return (
        <Container>
            <Header>
                <Left />
                <Body style={{alignItems:'flex-end'}}>
                    <Title style={styles.text}>فراز اس ام اس</Title>
                </Body>
                <Right />
            </Header>
            <Content style={styles.content}>
                <Form>
                    <Item style={styles.input} last>
                         <Input placeholder="نام و نام خانوادگی" style={styles.text} autoFocus />
                    </Item>
                    <Item style={styles.input} last>
                        <Input placeholder="تلفن همراه" style={styles.text} />
                    </Item>
                    <Item style={styles.input} last>
                        <Input placeholder="کد ملی" style={styles.text} />
                    </Item>
                    <Item style={styles.input} last>
                        <Input placeholder="آدرس" style={styles.text} />
                    </Item>
                    <Item picker style={styles.input}>
                    <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        style={{ width: undefined }}
                        placeholder="انتخاب سامانه پیامک"
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff">
                        <Picker.Item label="پنل پیامک تجاری - 359 هزار تومان (کامل ترین)" value="28133" />
                        <Picker.Item label="پنل پیامک شرکتی - 179 هزار تومان" value="1048" />
                        <Picker.Item label="پنل پیامک اقتصادی - 89 هزار تومان (محبوب )" value="1047" />
                        <Picker.Item label="پنل پیامک پایه - 49 هزار تومان" value="23197" />
                    </Picker>
                    </Item>
                    <Button iconRight danger rounded block style={{marginTop:15,flexGrow:2}}>
                        <Text style={styles.text}>ثبت نام</Text>
                        <Icon name='plus' type="FontAwesome" />
                    </Button>
                    <Button iconRight rounded block style={{marginTop:15,flexGrow:2,marginBottom:5}} onPress={() => props.navigation.navigate('Login') }>
                        <Text style={styles.text}>ورود به حساب کاربری</Text>
                        <Icon name='key' />
                    </Button>
                </Form>
            </Content>
        </Container>
    )
};


export default Register;