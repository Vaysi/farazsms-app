import React,{useState,useEffect} from 'react';
import Common from './helpers/Common';
import { Container , Header, ListItem , Separator , Fab , Picker, Title, Content, Card , CardItem, Toast , Footer, FooterTab, Button, Left, Right, Body, Icon, Text , Form , Item , Input, Textarea, View, Root } from 'native-base';
import styles from './css/Styles';
import Modal from "react-native-modal";

const Groups = (props)=>{
    const[name,setName] = useState('');
    const[showModal,setShowModal] = useState(false);
    const[groups,setGroups] = useState([]);
    useEffect(() => {
        async function checkIt() {
            await Common.retrieveItem('groups').then(data=>{
                if(data != null){
                    setGroups(data);
                }
            }).catch(err=>{
                setGroups([]);
            });
        }
        checkIt();
    });
    const addGroup = ()=>{
        setGroups(groups.push({name:name,data:[]}));
        Common.storeItem('groups',groups);
    };
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
                <Card>
                    <CardItem>
                    <Body style={styles.card}>
                        <Text style={styles.text}>
                            در این قسمت میتوانید گروه های دلخواه ایجاد کنید و آنها را مدیریت نمایید 
                        </Text>
                        <Text style={{fontFamily:'Vazir',fontSize:12,color:'#bababa'}}>
                            (برای حذف گروه لیست را به چپ بکشید)
                        </Text>
                    </Body>
                    </CardItem>
                </Card>
                <View>
                {
                    groups.map((group)=>
                    <View style={{marginTop:0}}>
                        <Separator  bordered style={{paddingHorizontal:5}}>
                            <Text style={styles.text}>{group.name}</Text>
                        </Separator>
                        <ListItem>
                            <Text>Caroline Aaron</Text>
                        </ListItem>
                    </View> 
                    )
                }
                </View>
            </Content>
            <Fab
                active={false}
                direction="up"
                containerStyle={{marginBottom:50}}
                style={{ backgroundColor: '#5067FF' }}
                position="bottomRight"
                onPress={()=>{setShowModal(true)}}>
                <Icon name="plus" type="FontAwesome5" />
            </Fab>
            <Modal backdropColor={"white"} backdropOpacity={0.9} isVisible={showModal} onBackdropPress={() => setShowModal(false) }>
                <View style={{justifyContent:'flex-start',flexDirection:'row'}}>
                    <Button rounded small danger bordered style={{marginVertical:10}} onPress={()=>{setShowModal(false);}}>
                        <Icon name='close' type="FontAwesome" />
                    </Button>
                </View>
                <Form>
                    <Item last>
                        <Input style={styles.text} onChangeText={(text)=>{setName(text)}} placeholder="نام گروه"/> 
                    </Item>
                    <Button block success iconRight style={{marginTop:15,flexGrow:2}} onPress={()=>{setShowModal(false);addGroup()}}>
                        <Text style={styles.text}>افزودن</Text>
                        <Icon name='plus' type="FontAwesome5"/>
                    </Button>
                </Form>
            </Modal>
            <Footer>
                <FooterTab>
                    <Button vertical small onPress={() => props.navigation.navigate('Dashboard') }>
                        <Icon name="sms" type="FontAwesome5" />
                        <Text style={styles.text}>داشبورد</Text>
                    </Button>
                    <Button active vertical small>
                        <Icon name="users" type="FontAwesome5"/>
                        <Text style={styles.text}>گروه ها</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    );
};

export default Groups;