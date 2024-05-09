import React, { useEffect, useState } from 'react'
import { MdEdit } from 'react-icons/md'
import { MdDelete } from 'react-icons/md'
import { EmpData } from '../../EmpData'
import { AiOutlineClose } from 'react-icons/ai'
import { IoSearchOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

const BetAmount = () => {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [inputValue, setInputValue] = useState("")

  const handleEdit = (id) => {
    const dt = data.filter(item => item.id === id);
    if (dt !== undefined) {

    }
  }

  const handleDelete = (id) => {
    if (id > 0) {
      if (window.confirm("Are Your Sure To Delete ?")) {
        const dt = data.filter(item => item.id !== id);
        setData(dt);
      }
    }
  }

  useEffect(() => {
    setData(EmpData)
  }, []);
  return (
    <div className="main-table-header">
      <div className="main-table-content">
        <div className="wrapper-head">
          <h3>Amount List</h3>
          <div className='search-news-section'>
            <div className="head-btn">
              <button onClick={(() => navigate('/betAmount/addAmount'))}>Add Amount</button>
            </div>
            {/* <div className='searchcard' >
              <input type="text" name="" id="" placeholder='Search' className='result-input'
                onChange={event => { setInputValue(event.target.value); }}
                value={inputValue}
              />
              {inputValue ? <div className="ai-close">
                <AiOutlineClose onClick={(event) => setInputValue('')}
                />
              </div> : <div className='ai-close'> <IoSearchOutline /></div>
              }
            </div> */}
          </div>

        </div>
      </div>
      <div className="table-header">
        <table style={{ overflowX: "auto", whiteSpace: "nowrap", border: ".5rem" }}>
          <thead>
            <tr className='custom-row'>
              <th> Id </th>
              <th>cash 1</th>
              <th> cash 2</th>
              <th>cash 3</th>
              <th>cash 4</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>

            {
              data.map((item, index) => {
                return (

                  <tr className='custom-row' style={{ backgroundColor: "white" }} key={index}>
                    <td data-label="UID"> <p className='uid_name' > {item?.id} </p> </td>
                    <td data-label="SPORT">{item?.case1}</td>
                    <td data-label="MARKET" height={70} > {item.case2} </td>
                    <td data-label="MARKET" height={70} > {item.case3} </td>
                    <td data-label="MARKET" height={70} > {item.case4}</td>

                    <td data-label="STATUS">
                      <div className='user-icon' width={100}>
                        <div className="icon-action" onClick={() => handleEdit(item.id)} >
                          <MdEdit className='mdDelete' />

                        </div>
                        <div className="icon-action" style={{ backgroundColor: "#F44464" }} onClick={() => handleDelete(item.id)}>
                          <MdDelete className='mdDelete' />

                        </div>
                      </div>
                    </td>
                  </tr>
                )
              })
            }



          </tbody>
        </table>
      </div>
    </div>
  )
}

export default BetAmount