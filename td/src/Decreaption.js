
import CryptoJS from 'crypto-js';

export const Decrypt = (number, key) => {
    const decodedSetNo = decodeURIComponent(number);
    const bytesSetNo = CryptoJS.AES.decrypt(decodedSetNo, key);
    const originalSetNo = bytesSetNo.toString(CryptoJS.enc.Utf8);
    return originalSetNo;
}



export const Decrypt2 = (number, key) => {
    const decodedSetNo = decodeURIComponent(number);
    const bytesSetNo = CryptoJS.AES.decrypt(decodedSetNo, key);
    const originalSetNo1 = bytesSetNo.toString(CryptoJS.enc.Utf8);
    const originalDesignNo = originalSetNo1.replace(/"/g, '');
    return originalDesignNo;
}



export const Encrypt = (number, key) => {
    
    const ciphertex = CryptoJS.AES.encrypt(JSON.stringify(number), key).toString();

    const encrypted = encodeURIComponent(ciphertex);

    return encrypted
}



