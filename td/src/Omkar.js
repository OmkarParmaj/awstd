import React, { useState } from 'react';
import axios from 'axios';
import Barcode from 'react-barcode';
import './omkar.css'

const Omkar = () => {
    const [uid, setUid] = useState('');
    const [setnumber, setSetnumber] = useState('');
    const [designnumber, setDesignnumber] = useState('');

    const handlechange = (uid) => {
        axios.get(`https://www.api.textilediwanji.com/omkarsample/data?uid=${uid}`, { withCredentials: true })
            .then(res => {
                // Assuming res.data is an object with SetNo and DesignNo properties
                setSetnumber(res.data[0].SetNo);
                setDesignnumber(res.data[0].DesignNo);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const handleUidChange = (e) => {
        const value = e.target.value;
        setUid(value); // Update UID state immediately on input change
        if (value !== '') {
            handlechange(value); // Fetch data when UID input is not empty
        } else {
            // Clear setnumber and designnumber if UID is empty
            setSetnumber('');
            setDesignnumber('');
        }
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <>
            <div className='container-fluid main'>
                <div className='row'>
                    <div className='col'>
                        <label className='form-label float-start'>UID</label>
                        <input
                            className='form-control'
                            type='number'
                            value={uid}
                            onChange={handleUidChange}
                        />

                        <label className='form-label float-start'>Set no</label>
                        <input
                            className='form-control'
                            type='number'
                            value={setnumber}
                            readOnly // Make this input read-only since it's derived from API response
                        />

                        <label className='form-label float-start'>Design no</label>
                        <input
                            className='form-control'
                            type='text'
                            value={designnumber}
                            readOnly // Make this input read-only since it's derived from API response
                        />
                    </div>
                </div>
            </div>

            <div className='container-fluid mt-4 divToPrint'>
                <div className='row'>
                    <div className='col'>
                        <Barcode
                            value={"hiOmkar8653"}
                            width={1.5}
                            height={53}
                        />
                    </div>
                </div>
            </div>

            <div className='container-fluid'>
                <div className='row'>
                    <div className='col'>
                        <button className="btn btn-primary btn-sm" onClick={handlePrint}>Print</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Omkar;
