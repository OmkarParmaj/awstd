
import React, { useState, useEffect } from 'react';
import { generateKey, encrypt, decrypt } from './CryptoUtils';



const NewEncrypt = () => {

    const [key, setKey] = useState(null);
    const [encrypted, setEncrypted] = useState('');
    const [decrypted, setDecrypted] = useState('');
    const [message, setMessage] = useState('Hello, World!');

    useEffect(() => {
        async function initKey() {
            const generatedKey = await generateKey();
            setKey(generatedKey);
        }

        initKey();
    }, []);

    const handleEncrypt = async () => {
        if (key) {
            const encryptedData = await encrypt(message, key);
            setEncrypted(encryptedData);
        }
    };

    const handleDecrypt = async () => {
        if (key && encrypted) {
            const decryptedData = await decrypt(encrypted, key);
            setDecrypted(decryptedData);
        }
    };




    return (
        <>
            <div>
                <h1>AES-GCM-256 Encryption/Decryption Example</h1>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button className='btn btn-primary' onClick={handleEncrypt}>Encrypt</button>
                <button className='btn btn-primary' onClick={handleDecrypt}>Decrypt</button>
                <p><strong>Encrypted:</strong> {encrypted}</p>
                <p><strong>Decrypted:</strong> {decrypted}</p>
            </div>

        </>
    );
}



export default NewEncrypt;