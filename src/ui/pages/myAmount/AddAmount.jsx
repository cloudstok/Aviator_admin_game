import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';


const AddAmount = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        id: '',
        amount: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Do something with the form data, e.g., send it to an API
        console.log(formData);
    };

    

    return (
        <div className="main-container">
            <div className="form-content">
                <div>
                    <div className='form-heading'>
                        {/* <p>{isAddMode ? "Add News" : "Update News"}</p> */}
                        <AiOutlineClose className='ai-close' onClick={() => navigate("/betAmount")} />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='form-input-head'>
                            <div className="form-input-field">
                                <label htmlFor="date"> ID<span style={{
                                    color: 'red'
                                }}>*</span> </label> <br />
                                <input
                                    type="text"
                                    name="id"
                                    value={formData.id}
                                    onChange={handleChange}
                                    placeholder="ID"
                                    className='input-field'
                                />
                            </div>

                            <div className="form-input-field">
                                <label htmlFor="date"> Case 1 <span style={{
                                    color: 'red'
                                }}>*</span> </label> <br />
                                <input
                                    type="text"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleChange}
                                    placeholder="Amount"
                                    className='input-field'
                                />
                            </div>
                            <div className="form-input-field">
                                <label htmlFor="date"> Case 2 <span style={{
                                    color: 'red'
                                }}>*</span> </label> <br />
                                <input
                                    type="text"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleChange}
                                    placeholder="Amount"
                                    className='input-field'
                                />
                            </div>
                            <div className="form-input-field">
                                <label htmlFor="date"> Case 3 <span style={{
                                    color: 'red'
                                }}>*</span> </label> <br />
                                <input
                                    type="text"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleChange}
                                    placeholder="Amount"
                                    className='input-field'
                                />
                            </div>
                            <div className="form-input-field">
                                <label htmlFor="date"> Case 4 <span style={{
                                    color: 'red'
                                }}>*</span> </label> <br />
                                <input
                                    type="text"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleChange}
                                    placeholder="Amount"
                                    className='input-field'
                                />
                            </div>
                            <div className='submit-btn'>
                                <button type="submit">Submit</button>

                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddAmount



