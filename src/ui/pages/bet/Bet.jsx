import React from 'react'
import Button from '../../components/button/Button'
import PaginationComponent from '../../components/pagination/PaginationComponent'
import './bet.css'
const Bet = () => {
  return (
    <div className='bet-container'>
      <div className="data-table-container">
        <div className="data-header-container">
        <div className="search-table-container">
            <h1 className="search-h1"> Bets List</h1>
            <div className="search-container">
              <input type="text" placeholder="Search..." />
             
                <Button name="Add Operator"/>
             
            </div>

          </div>

          {/* /////// table ////////// */}
          <div>
            <div class="table-container2">
              <table>
                  <thead>
                      <tr>
                          <th>Title</th>
                          <th>Category</th>
                          <th>Teacher</th>
                          <th>Lesson</th>
                          <th>Enrolled</th>
                          <th>Price</th>
                          <th>Status</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td>title here 1</td>
                          <td>Category name</td>
                          <td>John Doe</td>
                          <td>10</td>
                          <td>50</td>
                          <td>$49</td>
                          <td className='avai'>
                            <button>Available</button>
                          </td>
                      </tr>
                      <tr>
                          <td>title here 1</td>
                          <td>Category name</td>
                          <td>John Doe</td>
                          <td>10</td>
                          <td>50</td>
                          <td>$49</td>
                          <td>
                            <button>Available</button>
                          </td>
                      </tr>
                      <tr>
                          <td>title here 1</td>
                          <td>Category name</td>
                          <td>John Doe</td>
                          <td>10</td>
                          <td>50</td>
                          <td>$49</td>
                          <td>
                            <button>Available</button>
                          </td>
                      </tr>
                      <tr>
                          <td>title here 1</td>
                          <td>Category name</td>
                          <td>John Doe</td>
                          <td>10</td>
                          <td>50</td>
                          <td>$49</td>
                          <td>
                            <button>Available</button>
                          </td>
                      </tr>
                      <tr>
                          <td>title here 1</td>
                          <td>Category name</td>
                          <td>John Doe</td>
                          <td>10</td>
                          <td>50</td>
                          <td>$49</td>
                          <td>
                            <button>Available</button>
                          </td>
                      </tr>
                  </tbody>
              </table>
              {/* <PaginationComponent
            currentPage={currentPage}
            itemsPerPage={pageSize}
            totalPages={totalPages1}
            onPageChange={handlePageChange}
            handleItemsPerPageChange={handleItemsPerPageChange}
          /> */}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Bet