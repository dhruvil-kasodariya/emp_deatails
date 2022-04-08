import React from 'react'

function Pagination({search,previousPage,currentPage,nextPage,pagination,pageNumber}) {
  return (
    <div>  {(Object.values(search).join("").length<1)? <ul className="container">
    <li className="page-item">
      <a className="page-link" onClick={previousPage} href>Previous</a>
    </li>
{pageNumber.map(number =>(
    <li className={number===currentPage?"page-item active":"page-item"} key={number}>
      <a className="page-link" onClick={()=>pagination(number)} href> {number}</a>
    </li>  
))}
    <li className="page-item">
      <a className="page-link" onClick={nextPage} href>Next</a>
    </li>
  </ul> :""
}</div>
  )
}

export default Pagination