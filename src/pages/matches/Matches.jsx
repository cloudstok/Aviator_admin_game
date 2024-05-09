import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Pagination from '../../component/pagination/Pagination'
import { getCaller } from '../../services/api'
import '../../pages/tournament/tournament.css'
import MatchesTable from './MatchesTable'
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import Select from 'react-select';
import { DateRangePicker } from 'react-dates';
import { AiOutlineClose } from 'react-icons/ai'
import { IoSearchOutline } from 'react-icons/io5'

const Matches = () => {
    const navigate = useNavigate()

    const storedAssociation = localStorage?.getItem('selectedAssociation');
    const [selectedAssociation, setSelectedAssociation] = useState(() => {
        return storedAssociation ? JSON.parse(storedAssociation) : null;
    });
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [inputValue, setInputValue] = useState("")
    const storedTournament = localStorage?.getItem('selectedTournament');

    const [selectedTournament, setSelectedTournament] = useState(() => {
        return storedTournament ? JSON.parse(storedTournament) : null;
    });
    const [associationOptions, setAssociationOptions] = useState([]);
    const [tournamentOptions, setTournamentOptions] = useState([]);
    const [matchData, setMatchData] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [focusedInput, setFocusedInput] = useState(null);
    // const [currentPage, setCurrentPage] = useState(1)


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
    console.log()
    useEffect(() => {
        const fetchTournaments = async () => {
            if (!selectedAssociation) return;
            try {
                const response = await getCaller(`admin/v1/get/association/tournaments?ass_key=${selectedAssociation.value}`);
                const options = response?.data?.map((tournament) => ({
                    value: tournament.tou_key,
                    label: `${tournament.name} ${tournament?.formats[0]}`,
                }));
                setTournamentOptions(options);
            } catch (error) {
                console.error('Error fetching tournaments:', error);
            }
        };

        fetchTournaments();
    }, [selectedAssociation]);

    useEffect(() => {
        fetchMatches(1);
    }, [selectedTournament]);
    const fetchMatches = async (page) => {
        if (!selectedTournament) return;
        try {
            const res = await getCaller(`admin/v1/tournament/matches/${selectedTournament.value}`)
            setMatchData(res.data);
        } catch (error) {
            console.error('Error fetching matches:', error);
        }
    };
    useEffect(() => {
        localStorage?.setItem('selectedAssociation', JSON.stringify(selectedAssociation));
        localStorage?.setItem('selectedTournament', JSON.stringify(selectedTournament));
    }, [selectedAssociation, selectedTournament])


    const customStyles = {
        control: (provided) => ({
            ...provided,
            width: "100%",
            marginTop: ".5rem",
            padding: ".3rem"
        }),
    };
    const [currentPage, setCurrentPage] = useState(
        parseInt(localStorage.getItem('currentPage')) || 1
    );

    const totalPages = Math.ceil(matchData?.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = matchData?.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const handleItemsPerPageChange = (e) => {
        const newItemsPerPage = parseInt(e.target.value, 10);
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1); // Reset to the first page when changing items per page
    };
    useEffect(() => {
        localStorage.setItem('currentPage', currentPage);
    }, [currentPage]);
    const completeData = currentData?.filter((el) => el?.name?.toLowerCase().indexOf(inputValue?.toLowerCase()) !== -1);

    return (
        <>
        
            <div className="">
<div className="match-head">
<h3>Match List</h3>

                <div className='searchcard' style={{ marginTop: 0 }}>
                        <input type="text" name="" id="" placeholder='By Match Name' className='result-input'
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

      <div className="main-table-header" style={{marginTop:"1rem"}}>
        <div className="main-table-content">
        <div className='Assication'>
                    <div className="select-drop">
                        <label htmlFor="associationSelect" >Select Association</label>
                        <Select className='select-style-1'
                            id="associationSelect"
                            value={selectedAssociation}
                            onChange={(selectedOption) => {
                                setSelectedAssociation(selectedOption);
                                setSelectedTournament(null);
                            }}
                            styles={customStyles}
                            options={associationOptions}
                            isSearchable
                            placeholder="Search or Select Association"
                        />
                    </div>

                    <div className="select-drop">
                        {selectedAssociation && (
                            <>
                                <label htmlFor="tournamentSelect">Select Tournament</label>
                                <Select className='select-style-1'
                                    id="tournamentSelect"
                                    styles={customStyles}
                                    value={selectedTournament}
                                    onChange={(selectedOption) => {
                                        setSelectedTournament(selectedOption);
                                    }}

                                    options={tournamentOptions}
                                    isSearchable
                                    placeholder="Search or Select Tournament"
                                />
                            </>
                        )}
                    </div>
                    <div className="calendar-component2">
                        <DateRangePicker
                            startDate={startDate}
                            startDateId="s_id"
                            endDate={endDate}
                            endDateId="e_id"
                            onDatesChange={({ startDate, endDate }) => { setStartDate(startDate); setEndDate(endDate); }}
                            focusedInput={focusedInput}
                            onFocusChange={e => setFocusedInput(e)}
                            displayFormat="DD/MM/YYYY"
                            block
                            showClearDates
                            transitionDuration={2000}
                            withPortal
                        // withFullScreenPortal
                        />
                    </div>
                </div>
            
        </div>
        <div className="scroll-table" >
          <div className="table-header">
          {
                    matchData?.length === 0 ? null :
                        <>
                            <MatchesTable
                                getMatchesData={completeData}
                                getMatchesByTournament={fetchMatches}
                                startDate={startDate}
                                endDate={endDate}
                            />


                        </>
                }
          </div>
        </div>
        <div className="pagination-container">
        {
                matchData?.length>0 ? <Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                handleItemsPerPageChange={handleItemsPerPageChange}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />:null
               }
        </div>
      </div>
</div>
        </>
    )
}

export default Matches
