import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import endPoints from '../../api/endPoints';

function AllCustomers() {
  const [customers, setCustomers] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [actionType, setActionType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchCustomers = async () => {
    try {
      const response = await axiosInstance.get(endPoints.ADMIN.GET_ALL_USERS);
      setCustomers(response.data.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleBlockUnblock = (customerId, isBlocked) => {
    setSelectedCustomer(customerId);
    setActionType(isBlocked ? 'unblock' : 'block');
    setShowConfirmModal(true);
  };

  const confirmBlockUnblock = async () => {
    if (selectedCustomer) {
      try {
        const endpoint =
          actionType === 'block'
            ? endPoints.ADMIN.BLOCK_USER(selectedCustomer)
            : endPoints.ADMIN.UNBLOCK_USER(selectedCustomer);
        await axiosInstance.patch(endpoint);
        fetchCustomers();
        setShowConfirmModal(false);
      } catch (error) {
        console.error('Error updating customer status:', error);
      }
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter((customer) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      (customer.username?.toLowerCase().includes(lowerCaseSearchTerm) || false)
    );
  });

  return (
    <div className="p-8 bg-gray-100">
      <h1 className="text-3xl font-bold text-center text-pink-500 mt-1 mb-4">All Customers</h1>

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row sm:justify-center mb-4">
        <input
          type="text"
          placeholder="Search customers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar text-gray-800 w-full sm:w-64 mb-4 sm:mb-0 border-2 border-pink-400 rounded-full px-3 py-1 focus:outline-pink-400"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border w-20">ID</th>
              <th className="py-2 px-4 border w-40">Name</th>
              <th className="py-2 px-4 border w-40">Email</th>
              <th className="py-2 px-4 border w-32">Mobile No.</th>
              <th className="py-2 px-4 border w-20">Status</th>
              <th className="py-2 px-4 border w-24">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer) => (
                <tr key={customer._id} className="hover:bg-gray-100">
                  <td className="py-2 px-2 border text-gray-600">{customer._id}</td>
                  <td className="py-2 px-2 border text-gray-600 font-bold">{customer.username || 'N/A'}</td>
                  <td className="py-2 px-2 border text-gray-600">{customer.email || 'N/A'}</td>
                  <td className="py-2 px-2 border text-gray-600">{customer.mobilenumber || 'N/A'}</td>
                  <td className="py-2 px-2 border">
                    <span className={`font-bold ${customer.isBlocked ? 'text-red-500' : 'text-green-500'}`}>
                      {customer.isBlocked ? 'Blocked' : 'Active'}
                    </span>
                  </td>

                  <td className="py-2 px-2 border">
                    <button
                      onClick={() => handleBlockUnblock(customer._id, customer.isBlocked)}
                      className={`border-2 p-2 rounded ${customer.isBlocked ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-red-500 text-white hover:bg-red-600'}`}
                    >
                      {customer.isBlocked ? 'Unblock' : 'Block'}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 ml-64">
            <h2 className="text-lg font-bold mb-4 text-pink-400 text-center">
              Are you sure you want to {actionType} this customer?
            </h2>
            <div className="flex justify-between">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="bg-green-300 text-gray-700 py-2 px-4 rounded hover:bg-green-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmBlockUnblock}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllCustomers;
