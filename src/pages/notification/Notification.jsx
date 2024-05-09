import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { useFormik } from 'formik';
import { deleteCaller, getCaller, postCaller } from '../../services/api'
import { toastData } from '../Toast'
import { MdDelete } from 'react-icons/md'
import ToggleButton from '../../component/toggleButton/ToggleButton'
import './notification.css'
import { icon } from '../Toast'
import Pagination from '../../component/pagination/Pagination';

const success = Swal.mixin(toastData.success)
const error = Swal.mixin(toastData.error)


const Notification = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [getNotificationData, setNotificationData] = useState([])
  const [currentPage, setCurrentPage] = useState(1);

  const notificationDevice = async (tou_key) => {
    const res = await getCaller(`admin/v1/get/all/devices`)
    setNotificationData(res?.data)
  }
  useEffect(() => {
    notificationDevice()
  }, [])

  const totalPages = Math.ceil(getNotificationData?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = getNotificationData?.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const deleteNotification = async (id) => {
    toastData.confirm.text = "You won't to Delete Device"
    Swal.fire(toastData.confirm).then(async (result) => {
      if (result.isConfirmed) {
        const res = await postCaller(`admin/v1/update/notification?id=${id}`, { is_deleted: 0 })
        if (res?.status === 'success') {
        }
        icon.confirm.text = "Device Deleted Successfully"
        Swal.fire(icon.confirm)
        notificationDevice()
      }
    })

  }



  const formik = useFormik({
    initialValues: {
      notification: '',
    },
    onSubmit: async (values, { resetForm }) => {
      const res = await postCaller(`admin/v1/send/notification`, values)
      if (res?.status === "success") {
        await success.fire(Object.assign(icon.success, { title: res.msg }))
      }
      else {
        error.fire(Object.assign(icon.error, { title: res.msg }))

      }
      resetForm()

    },

  });
  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = parseInt(e.target.value, 10);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to the first page when changing items per page
  };
  return (
    <>
     
      <div className="main-table-header">
            <div className="main-table-content">
                <div className="wrapper-head">
                    <h3>Notification List</h3>
             
          <form onSubmit={formik.handleSubmit} className='notifiaction-section'>
           <div className="noti-input">
           <input
              type="text"
              placeholder="Please enter notification"
              name="notification"
              value={formik.values.notification}
              onChange={formik.handleChange}
            />
           </div>
           <div className="head-btn noti-send">
           <button type="submit">Send</button>
           </div>
          </form>
  
                </div>
            </div>
            <div className="scroll-table">
                <div className="table-header">
                <table>
            <thead>

              <tr className='custom-row-1'>
                <th width={200} > Mobile </th>
                <th width={500} > Device Id </th>
                <th width={200}>Subscribe</th>
                <th width={180} >Action</th>
              </tr>
          </thead>
          <tbody>
              {

                currentData?.length > 0 ? currentData?.map((e, index) => (

                  <tr height={65} className='custom-row' key={index}>
                    <td width={200} data-label="UID"> {e?.user_id ?? "none"} </td>
                    <td width={550} data-label="SPORT"> {e?.device_id ?? "none"} </td>
                    <td width={200} data-label="MARKET" style={{ pointerEvents: "none" }}> <ToggleButton
                      defaultChecked={e?.is_subscribe === 1 ? true : false} />
                    </td>
                    <td width={180} data-label="STATUS">
                      <div className='user-icon' >
                        <div className="icon-action" style={{ backgroundColor: "#F44464" }} onClick={() => deleteNotification(e.noti_id)}>
                          <MdDelete className='mdDelete'/>
                          <span className="tooltiptext">Delete</span>

                        </div>
                      </div>
                    </td>
                  </tr>
                )) : <tr className=''><td className='no-data-coloumn' align='center' colSpan={10}>No Data</td></tr>

              }
              </tbody>
            </table>
                </div>
            </div>
            <div className="pagination-container">
            {
  getNotificationData?.length>0 ?
  <Pagination
    currentPage={currentPage}
    totalPages={totalPages}
    itemsPerPage={itemsPerPage}
    handleItemsPerPageChange={handleItemsPerPageChange}
    onPageChange={handlePageChange}
  />:null
}
            </div>
        </div>
    </>
  )
}

export default Notification