import React, { useEffect, useState } from 'react'
import './tournament.css'
import img from '../../assets/person-dummy.jpg'
import { AiOutlineClose } from 'react-icons/ai'
import { IoSearchOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { icon, toastData } from '../Toast'
import { getCaller, postCaller, updateCaller } from '../../services/api'
import Select from 'react-select';
import Swal from 'sweetalert2'
import { MdDelete } from 'react-icons/md'
import { LuRefreshCcw } from 'react-icons/lu'
import { BsUpload } from "react-icons/bs";
import Pagination from '../../component/pagination/Pagination';
const success = Swal.mixin(toastData.success)
const error = Swal.mixin(toastData.error)

const Tournament = () => {

  const [inputValue, setInputValue] = useState("")
  const storedAssociation = localStorage?.getItem('selectedass');
  const [selectedAssociation, setSelectedAssociation] = useState(() => {
    return storedAssociation ? JSON.parse(storedAssociation) : null;
  });

  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
  const [sortField, setSortField] = useState('start_date');
  const [selectedImage, setSelectedImage] = useState(null);
  const [tournaments, setTournaments] = useState([]);
  const [associationOptions, setAssociationOptions] = useState([]);


  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: "100%",
      marginTop: ".5rem",
      padding: ".3rem"
    }),
  };
  useEffect(() => {
    const fetchAssociations = async () => {
      try {
        const res = await getCaller(`admin/v1/association/list`)
        const options = res.map((association) => ({
          value: association?.ass_key,
          label: association.name,
        }));
        setAssociationOptions(options);
      } catch (error) {
        console.error('Error fetching associations:', error);
      }
    };

    fetchAssociations();
  }, []);
  useEffect(() => {
    fetchTournaments();
  }, [selectedAssociation, sortOrder, sortField]);

  const fetchTournaments = async () => {
    if (!selectedAssociation) return;
    try {
      const response = await getCaller(`admin/v1/get/association/tournaments?ass_key=${selectedAssociation.value}`);

      setTournaments(response.data);
    } catch (error) {
      console.error('Error fetching matches:', error);
    }
  };


  useEffect(() => {
    localStorage?.setItem('selectedass', JSON.stringify(selectedAssociation));
  }, [selectedAssociation])

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const totalPages = Math.ceil(tournaments?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTournaments = tournaments?.slice(startIndex, endIndex);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = parseInt(e.target.value, 10);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to the first page when changing items per page
  };
  const handleFileChange = (e, item) => {
    console.log(e.target.files[0])
    setSelectedImage(e.target.files[0]);

  };
  const handleCoverImage = async (item) => {
    if (!selectedImage) {
      alert("Please Select File")
      return;
    }
    let formData = new FormData();
    formData.append("docs", selectedImage);
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/v1/upload/tournament/image?tou_key=${item?.tou_key}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      }
    ).then(response => response.json())
      .then((data) => {
        console.log('Image uploaded successfully:', data);

        if (data.status === true) {
          success.fire(Object.assign(icon.success, { title: data?.msg }))
            .then(async (response) => {
              if (response) {
                fetchTournaments()
                setSelectedImage(null);
              }
            })
        }
        else {
          error.fire(Object.assign(icon.error, { title: data?.errMsg }))

        }

      })
      .catch(error => console.log(error))

  }

  const handleToggle = async (item) => {
    const status = item.is_Active === 1 ? 0 : 1
    const res = await updateCaller(`admin/v1/update/tournament/status?tou_key=${item.tou_key}&value=${status}`)
    if (res?.status === "success") {

      success.fire(Object.assign(icon.success, { title: res.msg }))
        .then(async (response) => {
          if (response) {
            fetchTournaments()
          }
        })
    }
    else {
      error.fire(Object.assign(icon.error, { title: res?.errMsg }))

    }
  };
  const addMatchbyTournament = async (item) => {
    updateMatchbyTournament(item)
    const res = await postCaller(`admin/v1/add/tournament/matches?tou_key=${item}`)
    if (res?.status === true) {
      await postCaller(`admin/v1/tournaments/stats/${item}`)
      await success.fire(Object.assign(icon.success, { title: "Tournament Refresh Successfully" }))
    }
    else {
      error.fire(Object.assign(icon.error, { title: res?.msg }))

    }
  }
  const updateMatchbyTournament = async (item) => {
    const res = await postCaller(`admin/v1/update/tournament/matches?tou_key=${item}`)
    const response = await postCaller(`admin/v1/tournament/points?tou_key=${item}`)
    const respons = await postCaller(`admin/v1/update/tournament?tou_key=${item}`)
  }

  const handleDeleteTou = async (item) => {
    toastData.confirm.text = "You won't to Delete Tournament"
    Swal.fire(toastData.confirm).then(async (result) => {
      if (result.isConfirmed) {
        const res = await updateCaller(`admin/v1/delete/tournaments/${item.tou_key}`)
        if (res?.status === 'success') {
          fetchTournaments()
        }
        icon.confirm.text = "Tournament Deleted Successfully"
        Swal.fire(icon.confirm)
      }
    })
  }

  const completeData = currentTournaments?.filter((el) => el?.name?.toLowerCase().indexOf(inputValue?.toLowerCase()) !== -1);

  return (
    <>
<div className="">
<h3>Tournament List</h3>
      <div className="main-table-header" style={{marginTop:"1rem"}}>
        <div className="main-table-content">
          <div className='Assication' >
            <div className="select-drop">
              <label htmlFor="associationSelect" >Select Association</label>
              <Select className='select-style-1'
                id="associationSelect"
                value={selectedAssociation}
                onChange={(selectedOption) => {
                  setSelectedAssociation(selectedOption);

                }}
                styles={customStyles}
                options={associationOptions}
                isSearchable
                placeholder="Search or Select Association"
              />
            </div>
           <div className="search-card-container">
           <div className='searchcard'>
              <input type="text" name="" id="" placeholder='Search' className='result-input'
                onChange={event => { setInputValue(event.target.value); }}
                value={inputValue}
              />
              {inputValue ? <div className="ai-close">
                <AiOutlineClose onClick={(event) => setInputValue('')}
                />
              </div> : <div className='ai-close'> <IoSearchOutline /></div>
              }
            </div>
           </div>
          </div>
        </div>
        <div className="scroll-table" >
          <div className="table-header">
            <table style={{overflowX:"auto",whiteSpace:"nowrap"}}>
              <thead>
                <tr className='custom-row-1'>
                  <th width={400} > Name </th>
                  <th width={300} >Cover Image</th>
                  <th width={150}  > Action</th>
                  <th width={200}>Date/Time</th>
                  {/* <th width={200} align='center'>Status</th> */}
                  <th width={100} > Enable</th>
                </tr>
              </thead>
              <tbody>
                {completeData?.length > 0 ? completeData?.map((tour) => (
                  <tr key={tour?.tou_key} className={`custom-row-1 ${tour?.is_Active === 0 ? "disabled-row" : ""}`} >
                    <td width={400} align='left'>
                      <div className="user-flex-1">
                      {
                        tour?.imgURl ? <img src={tour?.imgURl} alt=""/> : <img src={img} alt=''/>
                      }
                      
                        <p className=""  >
                          {tour?.name.substring(0, 30) + "..."},<span style={{ textTransform: "capitalize" }}>{tour?.formats[0]}</span> </p>
                      </div>
                    </td>
                    <td   >
                      <div className="tournament-flex-1">
                        <div className="image-select">

                          <label className="custom-file-input">
                            <input type="file" disabled={tour?.is_Active === 0} accept="image/*" onChange={(e) => handleFileChange(e)} />

                          </label>
                        </div>
                        <button disabled={tour?.is_Active === 0} className="update-button-1" onClick={(e) => handleCoverImage(tour)}>
                          <BsUpload />
                        </button>

                      </div>

                    </td>
                    <td width={150}>
                      <div className='user-icon' >
                        <button className="icon-action" disabled={tour?.is_Active === 0}>
                          <LuRefreshCcw style={{ color: "white", fontSize: "2rem" }} onClick={() => addMatchbyTournament(tour.tou_key)} />
                          <span className="tooltiptext">Refresh</span>
                        </button>

                        <button className="icon-action" disabled={tour.is_Active === 0} style={{ backgroundColor: "#F44464" }} onClick={() => handleDeleteTou(tour)}>
                          <MdDelete style={{ color: "white", fontSize: "2rem" }} />
                          <span className="tooltiptext">Delete Match</span>
                        </button>
                      </div>
                    </td>
                    <td  >
                      {new Date(tour.start_date * 1000).toLocaleString()}
                    </td>
                    <td>
                      <button className={`enabled ${tour?.is_Active === 0 ? 'disabled' : null}`} onClick={() => handleToggle(tour)}>
                        {
                          tour.is_Active !== 1 ? "Enabled" : "Disabled"
                        }
                      </button>
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
            tournaments.length > 0 ? <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              itemsPerPage={itemsPerPage}
              handleItemsPerPageChange={handleItemsPerPageChange}
            /> : null
          }
        </div>
      </div>
</div>


    </>
  )
}

export default Tournament