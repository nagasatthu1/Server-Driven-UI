// Data Table Renderer Component
import React from 'react';

interface DataTableProps {
  title: string;
  columns: string[];
  data: any[][];
}

const DataTableRenderer: React.FC<DataTableProps> = ({ title, columns, data }) => {
  const getStatusBadgeClass = (status: string) => {
    if (status === 'Hoàn thành') {
      return 'bg-green-100 text-green-800';
    } else if (status === 'Đang xử lý') {
      return 'bg-yellow-100 text-yellow-800';
    }
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-4 text-gray-800">{title}</h3>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
              {columns.map((column, index) => (
                <th key={index} className="px-6 py-4 text-left font-semibold">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50 border-b border-gray-100">
                {row.map((cell, cellIndex) => {
                  // Check if this is the last column (status column)
                  const isStatusColumn = cellIndex === row.length - 1;
                  const isStatusValue = ['Hoàn thành', 'Đang xử lý'].includes(cell);
                  
                  if (isStatusColumn && isStatusValue) {
                    return (
                      <td key={cellIndex} className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadgeClass(cell)}`}>
                          {cell}
                        </span>
                      </td>
                    );
                  }
                  
                  return (
                    <td key={cellIndex} className="px-6 py-4 text-gray-700">
                      {cell}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTableRenderer;
