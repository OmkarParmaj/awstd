import React, { useState } from "react";
import Foot from "./Pages/Foot";


const Countconverter = () => {
    const [size, setSize] = useState(0);
    const [selectedOption, setSelectedOption] = useState('');
    const [tex, setTex] = useState(0);
    const [denier, setDenier] = useState(0);
    const [decitex, setDecitex] = useState(0);
    const [linen, setLinen] = useState(0);
    const [cotton, setCotton] = useState(0);
    const [spunsilk, setSpunsilk] = useState(0);

    const counts = ['Tex', 'Denier', 'Decitex', 'Linen', 'Cotton(English)', 'Spun silk'];

    const countarray = [
        { count: "Tex", value: tex.toFixed(4), unit: "grams/kilometer" },
        { count: "Denier", value: denier.toFixed(4), unit: "grams/9,000 meters" },
        { count: "Decitex", value: decitex.toFixed(4), unit: "grams/10,000 meters" },
        { count: "Linen", value: linen.toFixed(4), unit: "300 yd(lea)/lb" },
        { count: "Cotton(English)", value: cotton.toFixed(4), unit: "840 yd(hank)/lb" },
        { count: "Spun silk", value: spunsilk.toFixed(4), unit: "840 yd/lb" }
    ];

    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedOption === "Denier") {
            setTex(size * 0.1111);
            setDenier(size * 1);
            setDecitex(size * 1.1111);
            setLinen(size * 0.0032);
            setCotton(5315 / size);
            setSpunsilk(5315 / size);
        } else if (selectedOption === "Tex") {
            setTex(size * 1);
            setDenier(size * 9);
            setDecitex(size * 10);
            setLinen(size * 0.0290);
            setCotton(590.5412 / size);
            setSpunsilk(590.5412 / size);
        } else if (selectedOption === "Decitex") {
            setTex(size * 0.1);
            setDenier(size * 0.910);
            setDecitex(size * 1);
            setLinen(size * 0.0290);
            setCotton(5910 / size);
            setSpunsilk(5910 / size);
        } else if (selectedOption === "Linen") {
            setTex(1653.5155 / size);
            setDenier(14881.6394 / size);
            setDecitex(16535.1549 / size);
            setLinen(size);
            setCotton(size / 2.8);
            setSpunsilk(size / 2.8);
        } else if (selectedOption === "Cotton(English)") {
            setTex(590.5412 / size);
            setDenier(5315 / size);
            setDecitex(5910 / size);
            setLinen(size * 2.8);
            setCotton(size);
            setSpunsilk(size);
        } else if (selectedOption === "Spun silk") {
            setTex(590.5412 / size);
            setDenier(5315 / size);
            setDecitex(5910 / size);
            setLinen(size * 2.8);
            setCotton(size);
            setSpunsilk(size);
        }
    };

    return (
        <div className="container-fluid" style={{background: "#F9FBFC"}}>
            <div className="row" style={{background: "#F9FBFC"}}>
                <h2 className="text-center mt-5">YARN CONVERSION CALCULATOR</h2>
            </div>

            <div className="row justify-content-center " style={{ marginTop: "100px", background:"#F9FBFC", margintop: "30px", marginBottom: "200px" }}>
                <div className="col-lg-6  col-md-12 col-sm-12 d-flex justify-content-center align-items-center">
                    <div className="card shadow-sm" style={{width: "600px"}}>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="size" className="form-label">Size</label>
                                    <input
                                        type="number"
                                        id="size"
                                        className="form-control"
                                        value={size}
                                        onChange={(e) => setSize(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="measurement" className="form-label">Measurement</label>
                                    <select
                                        id="measurement"
                                        className="form-select"
                                        value={selectedOption}
                                        onChange={handleSelectChange}
                                        required
                                    >
                                        <option value="">-- Please choose an option --</option>
                                        {counts.map((option, index) => (
                                            <option key={index} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="row mt-5 mb-3 d-flex justify-content-end align-items-center">
                                    <div className="col-12">
                                    <button type="submit" className="btn btn-primary float-end">Convert</button>


                                    </div>

                                </div>
                              
                            </form>
                        </div>
                    </div>
                </div>

                <div className="col-lg-6 col-md-12 col-sm-12">
                    <div className="card shadow">
                        <div className="card-body">
                            <h4 className="card-title text-center mb-4">Conversion Results</h4>
                            <div className="table-responsive">
                                <table className="table table-bordered table-hover text-center">
                                    <thead className="table-dark">
                                        <tr>
                                            <th scope="col">Sr. No.</th>
                                            <th scope="col">Measurement</th>
                                            <th scope="col">Value</th>
                                            <th scope="col">Unit</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {countarray.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.count}</td>
                                                <td>{item.value}</td>
                                                <td>{item.unit}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <Foot></Foot>
            {/* <div className="row mt-4 mb-4 d-flex justify-content-center align-items-center">

            
                
            </div> */}
            {/* <div className="row" style={{ backgroundColor: "#F4F5FF" }}>
                <div className="col-3 ">
                    <img src="sourabh textile logo.jpg" className="" alt="Logo" style={{ height: "120px", width: "150px", marginLeft: "90px", marginTop: "50px" }} />
                    <p className="" style={{ marginLeft: "30px", marginBottom: "0px", marginTop: "5px" }}> One stop solution for weaving company</p>
                    <p className="" style={{ marginLeft: "50px", marginTop: "0px" }}>All operation data input seamlessly</p>
                </div>
                <div className="col-3 ">
                    <h5 style={{ marginLeft: "100px", marginTop: "50px" }}>OPERATIONS</h5>
                    <div className="" style={{ marginLeft: "110px", marginTop: "20px", marginBottom: "30px" }}>
                        <p className="m-0 mt-1" style={{}}>Beam inward</p>
                        <p className="m-0 mt-1" style={{}}>Production</p>
                        <p className="m-0 mt-1" style={{}}>Packing slip</p>
                        <p className="m-0 mt-1" style={{}}>Yarn inward</p>
                        <p className="m-0 mt-1" style={{}}>Billing</p>
                        <p className="m-0 mt-1" style={{}}>Reports</p>
                    </div>
                </div>
                <div className="col-3 ">
                    <h5 style={{ marginLeft: "100px", marginTop: "50px" }}>YARN CONVERSION</h5>
                    <div className="" style={{ marginLeft: "110px", marginTop: "20px", marginBottom: "30px" }}>
                        <p className="m-0 mt-1" style={{}}>Tex</p>
                        <p className="m-0 mt-1" style={{}}>Denier</p>
                        <p className="m-0 mt-1" style={{}}>Decitex</p>
                        <p className="m-0 mt-1" style={{}}>Linen</p>
                        <p className="m-0 mt-1" style={{}}>Cotton (Ne)</p>
                        <p className="m-0 mt-1" style={{}}>Wool</p>
                    </div>
                </div>
                <div className="col-3 ">

                </div>
                <hr className=""></hr>

                <div className="row">
                    <p className="text-center">Textile diwanji Copywrite all Right reserves</p>
                </div>
            </div> */}
        </div>
    );
};

export default Countconverter;
