import React from "react";

const PaymentHistory = ({ payments }) => {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold text-gray-1000">Payment History</h3>
      {payments.length === 0 ? (
        <p className="mt-4 text-gray-600">No payment history available.</p>
      ) : (
        <table className="table-auto w-full mt-4 border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-900">
              <th className="border border-gray-900 px-4 py-2 text-gray-100">Payment ID</th>
              <th className="border border-gray-900 px-4 py-2 text-gray-100">Payment Description</th>
              <th className="border border-gray-900 px-4 py-2 text-gray-100">Amount Paid</th>
              <th className="border border-gray-900 px-4 py-2 text-gray-100">Payment Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.paymentId} className="bg-blue-200">
                <td className="border border-gray-900 px-4 py-2">{payment.paymentId}</td>
                <td className="border border-gray-900 px-4 py-2">{payment.Description}</td>
                <td className="border border-gray-900 px-4 py-2">₹{payment.amount}</td>
                <td className="border border-gray-900 px-4 py-2">{payment.paymentDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PaymentHistory;