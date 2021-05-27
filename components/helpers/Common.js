import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';
import uniqueId from 'react-native-unique-id';
const storage = new Storage({
    // maximum capacity, default 1000
    size: 1000,
   
    // Use AsyncStorage for RN apps, or window.localStorage for web apps.
    // If storageBackend is not set, data will be lost after reload.
    storageBackend: AsyncStorage, // for web: window.localStorage
   
    // expire time, default: 1 day (1000 * 3600 * 24 milliseconds).
    // can be null, which means never expire.
    defaultExpires: 1000 * 3600 * 24 * 7,
   
    // cache data in the memory. default is true.
    enableCache: true,
   
    // if data was not found in storage or expired data was found,
    // the corresponding sync method will be invoked returning
    // the latest data.
    sync: {
      // we'll talk about the details later.
    }
  });

isLoggedIn = async ()=>{
    return new Boolean(await retrieveItem('userData'));
}



function loginDetails(){
    return new Promise((resolve)=>{
        resolve(retrieveItem('userData'))
    })
}

encryptIt = (str)=>{
    return str;
}

decryptIt = (str)=>{
    return str;
}

errorMsg = (number)=>{
    let str = '';
    switch(number){
        case 1 : str = 'متن پیام خالی میباشد';break;
        case 2 : str = 'حساب کاربری شما محدود گردیده';break;
        case 3 : str = 'شماره ارسال کننده به شما تعلق ندارد';break;
        case 4 : str = 'شماره گیرنده خالی میباشد';break;
        case 5 : str = 'اعتبار حساب شما کافی نیست';break;
        case 7 : str = 'خط مورد نظر برای پیامک انبوه مناسب نیست';break;
        case 9 : str = 'خط مورد نظر در این ساعات امکان ارسال ندارد';break;
        case 98: str = 'حداکثر تعداد گیرندگان رعایت نشده';break;
        case 99: str = 'اپراتور خط ارسالی قطع میباشد';break;
        case 306:str = 'کد ملی وارد نگردیده';break;
        case 307:str = 'کد ملی نادرست است';break;
        case 308:str = 'شماره شناسنامه نامعتبر است';break;
        case 309:str = 'شماره شناسنامه وارد نگردیده';break;
        case 310:str = 'ایمیل شما وارد نشده';break;
        case 311:str = 'شماره تلفن وارد نشده';break;
        case 313:str = 'آدرس شما وارد نگردیده';break;
        case 314:str = 'شماره موبایل را وارد نگردیده';break;
        case 316:str = 'سطح دسترسی غیر مجاز';break;
        case 962:str = 'نام کاربری یا کلمه عبور نادرست است';break;
        case 963:str = 'دسترسی نامعتبر';break;
        case 992:str = 'ارسال پیام از ساعت 8 تا 23 میباشد';break;
        case 994:str = 'لطفا تصویری از کارت بانکی خود را در سایت ارسال کنید';break;
        case 998:str = 'کارت ملی یا بانکی شما تایید نشده است';break
        default:str='خطای نامشخص , لطفا به پشتیبانی خبر دهید !';
        break;
    }
    return str;
}

function storeItem(key, item) {
    storage.save({
        key: key, 
        data: item,
        expires: null
    });
    return true;
}

async function retrieveItem(key) {
    let returner = null;
    await storage.load({
        key: key,
        autoSync: true,
        syncInBackground: false,
    })
    .then(ret => {
        returner = ret;
    })
    .catch(err => {
        returner = null;
    });
    return await returner;
}

function clearLogin(){
    storage.remove({
        key: 'userData'
    });
}

export default {
    encryptIt,decryptIt,isLoggedIn,storeItem,retrieveItem,loginDetails,errorMsg,clearLogin
}