import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "../api/api";
import PaymentModal from "./PaymentModal"; // Import the PaymentModal component
import PaymentHistory from "./PaymentHistory";



const StudentPage = () => {
  const [student, setStudent] = useState({});
  const [bills, setBills] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBill, setSelectedBill] = useState(null); // State to manage the selected bill for the modal
  const [creditBalance, setCreditBalance] = useState(0); // State to store credit balance
  
  
  useEffect(() => {
    // Fetch student details from localStorage
    
    const user = JSON.parse(localStorage.getItem("user"));
    
    setStudent({
      firstName: user.firstName,
      email: user.identifier,
      id: user.id,
    });
  
  

    // Fetch bills and credit balance for the student
    const fetchStudentData = async () => {
      try {
        
        const billsResponse = await axios.get(`/student-bills/student/${user.id}`);
        const paymentsResponse = await axios.get(`/payments`,{
          headers: {student_id: user.id}
        });
        

        console.log(billsResponse.data);
        setBills(billsResponse.data);
        setPayments(paymentsResponse.data);
        if(billsResponse.data.length !== 0) setCreditBalance(billsResponse.data[0].creditBalance);

      
      } catch (error) {
        console.error("Error fetching student data:", error.message);
      } finally {
        setLoading(false);
      }
    };
    

    fetchStudentData();
  }, []);

  const handleOpenPaymentModal = (bill) => {
    setSelectedBill(bill); // Set the selected bill for the modal
  };

  const handleClosePaymentModal = async () => {
    setSelectedBill(null); // Close the modal
    try {
      // Refresh the bills and payment history after payment
      const billsResponse = await axios.get(`/student-bills/student/${student.id}`);
      const paymentsResponse = await axios.get(`/payments`,{
        headers: {student_id: student.id}
      });
      
      
      
      setBills(billsResponse.data);
      setPayments(paymentsResponse.data);

    } catch (error) {
      console.error("Error refreshing bills:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-000">
      {/* Navbar */}
      <Navbar name={student.firstName} email={student.email} />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Bills Section */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-1000">Pending Bills</h3>
          {loading ? (
            <p className="mt-4 text-gray-600">Loading bills...</p>
          ) : bills.length === 0 ? (
            <p className="mt-4 text-gray-600">You have no pending bills.</p>
          ) : (
            <table className="table-auto w-full mt-4 border-collapse border border-gray-300">
              <thead>
                <tr className="bg-blue-900">
                  <th className="border border-gray-900 px-4 py-2 text-gray-100">Description</th>
                  <th className="border border-gray-900 px-4 py-2 text-gray-100">Total Amount</th>
                  <th className="border border-gray-900 px-4 py-2 text-gray-100">Bill Date</th>
                  <th className="border border-gray-900 px-4 py-2 text-gray-100">Deadline Date</th>
                  <th className="border border-gray-900 px-4 py-2 text-gray-100">Pay</th>
                </tr>
              </thead>
              <tbody>
                {bills.map((bill) => (
                  <tr key={bill.billId} className="bg-blue-200">
                    <td className="border border-gray-900 px-4 py-2">{bill.description}</td>
                    <td className="border border-gray-900 px-4 py-2">{bill.amount}</td>
                    <td className="border border-gray-900 px-4 py-2">{bill.billDate}</td>
                    <td className="border border-gray-900 px-4 py-2">{bill.deadline}</td>
                    <td className="border border-gray-900 px-4 py-2 text-center">
                      <button
                        onClick={() => handleOpenPaymentModal(bill)} // Open the payment modal
                        className="bg-gray-900 text-white px-3 py-1 rounded-md hover:bg-orange-600"
                      >
                        Pay
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Payment History Section */}
        <PaymentHistory payments={payments} />

      </div>

      {/* Payment Modal */}
      {selectedBill && (
        <PaymentModal
          isOpen={!!selectedBill}
          onClose={handleClosePaymentModal}
          billId={selectedBill.billId}
          totalDue={selectedBill.currentDue}
          studentId={student.id}
        />
      )}
    </div>
  );
};

export default StudentPage;