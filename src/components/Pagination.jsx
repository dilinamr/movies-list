// import React from 'react';

// function Pagination({ currentPage, totalPages, setCurrentPage }) {
//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//   };

//   const renderPaginationButtons = () => {
//     const buttons = [];
//     for (let i = 1; i <= totalPages; i++) {
//       buttons.push(
//         <button
//           key={i}
//           onClick={() => handlePageChange(i)}
//           className={i === currentPage ? 'active' : ''}
//         >
//           {i}
//         </button>
//       );
//     }
//     return buttons;
//   };

//   return (
//     <div className="pagination">
//       {totalPages > 1 && (
//         <div className="pagination-buttons">
//           {currentPage > 1 && (
//             <button onClick={() => handlePageChange(currentPage - 1)}>
//               Previous
//             </button>
//           )}
//           {renderPaginationButtons()}
//           {currentPage < totalPages && (
//             <button onClick={() => handlePageChange(currentPage + 1)}>
//               Next
//             </button>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Pagination;


import React from 'react';

function Pagination({ currentPage, totalPages, setCurrentPage }) {
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={i === currentPage ? 'active' : ''}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div className="pagination">
      {totalPages > 1 && (
        <div className="pagination-buttons">
          {currentPage > 1 && (
            <button onClick={() => handlePageChange(currentPage - 1)}>
              Previous
            </button>
          )}
          {renderPaginationButtons()}
          {currentPage < totalPages && (
            <button onClick={() => handlePageChange(currentPage + 1)}>
              Next
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Pagination;

