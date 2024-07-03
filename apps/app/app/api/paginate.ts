export function paginate<T>(array: T[], page = 1, pageSize = 100) {
  const totalRecords = array.length;
  const totalPages = Math.ceil(totalRecords / pageSize);
  const currentPage = page;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;
  const previousPage = currentPage > 1 ? currentPage - 1 : null;

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = array.slice(startIndex, startIndex + pageSize);

  return {
    data: paginatedData,
    records: {
      currentPage,
      nextPage,
      previousPage,
      totalRecordsFound: totalRecords,
      totalPages,
    },
  };
}
