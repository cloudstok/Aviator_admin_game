import React, { useEffect, useState } from 'react'
import { EmpData } from '../../../EmpData'
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
   
    <div className="commissionContainer">
        <div
          className="TableContainer"
          style={{ overflowX: "auto", whiteSpace: "nowrap" }}
        >
          <table>
            <thead>
              <tr>
              <th> Lobby Id</th>
              <th> Id </th>
              <th>cash 1</th>
              <th> cash 2</th>
              <th>cash 3</th>
              <th>cash 4</th>
              <th>Action</th>

              </tr>
            </thead>
            <tbody>
              {data?.length > 0 ? (
                data?.map((el, i) => (
                  <tr  key={i}>




                   

                  </tr>
                ))
              ) : (
                <tr style={{ border: 0 }}>
                  <td colSpan={10}>
                    <div className="data-not-found">
                      {/* <DataNotFound /> */}
                      <h3>Data Not Found</h3>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
  )
}

export default BetAmount