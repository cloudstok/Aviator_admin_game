import React from 'react';
import '../../components/model/model.css'

const AddOperatorModal = ({ show, setShowModal }) => {
    if (!show) return null;

    const handleClose = () => {
        setShowModal(false);
    };

    return (
        <div className={`modal ${show ? 'show' : ''}`}>
            <div className="modal-content">
                <div className='add-operator'>
                    <h2>Add Operator</h2>
                    <span className="close" onClick={handleClose}>&times;</span>
                </div>
                <div className="form-container">

                    <form>
                        <div className="form-group">
                            <label for="user-id">User ID:</label>
                            <input type="text" id="user-id" name="user-id" placeholder="Enter User ID" required />
                        </div>
                        {/* <div className="form-group">
                            <label for="client-id">Client ID:</label>
                            <input type="text" id="client-id" name="client-id" placeholder="Enter Client ID" required />
                        </div>
                        <div className="form-group">
                            <label for="client-secret">Client Secret:</label>
                            <input type="text" id="client-secret" name="client-secret" placeholder="Enter Client Secret" required />
                        </div> */}
                        <div className='form-submit-btn'>
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default AddOperatorModal;

