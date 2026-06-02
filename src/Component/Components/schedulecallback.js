import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useOverview } from '../ContentHook/OverviewContext';

const ScheduleCallback = () => {

    const baseurl = process.env.REACT_APP_API_BASE_URL;

    const { formData } = useOverview();

    const [showForm, setShowForm] = useState(false);

    const [callbackList, setCallbackList] = useState([]);

    const [selectedCallback, setSelectedCallback] = useState(null);

    const [updateStatus, setUpdateStatus] = useState('');

    const [loading, setLoading] = useState(false);

    const [successMessage, setSuccessMessage] = useState('');

    const [callbackData, setCallbackData] = useState({
        expectedCallbackDate: '',
        expectedCallbackTime: '',
        remark: '',
        status: 'pending'
    });

    // Logged In User
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');
    const userRole = localStorage.getItem('userRole');

    // Fetch Callback List
    const fetchCallbackList = async () => {

        try {

            const response = await axios.get(
                `${baseurl}/getcallbacklistbyfilenumber`,
                {
                    params: {
                        file_number: formData.file_number
                    }
                }
            );

            if (response.data.success) {

                setCallbackList(
                    response.data.data
                );
            }

        } catch (error) {

            console.log(
                'Fetch Callback Error:',
                error
            );
        }
    };

    useEffect(() => {
        fetchCallbackList();
    }, []);

    // Handle Input Change
    const handleChange = (e) => {

        const { name, value } = e.target;

        setCallbackData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Create Callback
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const payload = {

                file_number:
                    formData.file_number,

                userId,

                username,

                role: userRole,

                file_status:
                    formData.file_status ||
                    'details_not_completed',

                call_back_status:
                    callbackData.status,

                expected_call_back_date:
                    callbackData.expectedCallbackDate,

                expected_call_back_time:
                    callbackData.expectedCallbackTime,

                remark:
                    callbackData.remark
            };

            const response = await axios.post(
                `${baseurl}/schedulecallback`,
                payload
            );

            if (response.data.success) {

                setSuccessMessage(
                    'Callback Scheduled Successfully'
                );

                fetchCallbackList();

                setShowForm(false);

                setCallbackData({
                    expectedCallbackDate: '',
                    expectedCallbackTime: '',
                    remark: '',
                    status: 'pending'
                });

                setTimeout(() => {
                    setSuccessMessage('');
                }, 3000);
            }

        } catch (error) {

            console.log(
                'Create Callback Error:',
                error
            );

            alert(
                error?.response?.data?.message ||
                'Something went wrong'
            );

        } finally {

            setLoading(false);
        }
    };

    // Update Callback
    const handleStatusUpdate = async () => {

        try {

            const payload = {

                call_back_status: updateStatus
            };

            // If Rescheduled
            if (updateStatus === 'rescheduled') {

                payload.expected_call_back_date =
                    selectedCallback.expected_call_back_date;

                payload.expected_call_back_time =
                    selectedCallback.expected_call_back_time;
            }

            const response = await axios.put(

                `${baseurl}/updatecallbackstatus/${selectedCallback._id}`,

                payload
            );

            if (response.data.success) {

                setSuccessMessage(
                    'Callback Updated Successfully'
                );

                fetchCallbackList();

                setTimeout(() => {
                    setSuccessMessage('');
                }, 3000);
            }

        } catch (error) {

            console.log(
                'Update Status Error:',
                error
            );
        }
    };

    return (

        <div
            className="container-fluid mt-3 px-4"
            style={{
                minHeight: '100vh',
                background: '#f5f7fb'
            }}
        >

            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">

                <h4 className="fw-bold">
                    Callback Management
                </h4>

                <button
                    className="btn btn-primary"
                    onClick={() =>
                        setShowForm(!showForm)
                    }
                >
                    {
                        showForm
                            ? 'Close'
                            : 'Schedule Callback'
                    }
                </button>

            </div>

            {/* Success Message */}
            {
                successMessage && (

                    <div
                        className="alert alert-success alert-dismissible fade show"
                        role="alert"
                    >

                        {successMessage}

                        <button
                            type="button"
                            className="btn-close"
                            onClick={() =>
                                setSuccessMessage('')
                            }
                        ></button>

                    </div>
                )
            }

            {/* Schedule Form */}
            {
                showForm && (

                    <div className="card shadow mb-4">

                        <div className="card-header bg-primary text-white">

                            <h5 className="mb-0">
                                Schedule Callback
                            </h5>

                        </div>

                        <div className="card-body">

                            <form onSubmit={handleSubmit}>

                                <div className="row">

                                    {/* Date */}
                                    <div className="col-md-4 mb-3">

                                        <label className="form-label">
                                            Callback Date
                                        </label>

                                        <input
                                            type="date"
                                            className="form-control"
                                            name="expectedCallbackDate"
                                            value={
                                                callbackData.expectedCallbackDate
                                            }
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    {/* Time */}
                                    <div className="col-md-4 mb-3">

                                        <label className="form-label">
                                            Callback Time
                                        </label>

                                        <input
                                            type="time"
                                            className="form-control"
                                            name="expectedCallbackTime"
                                            value={
                                                callbackData.expectedCallbackTime
                                            }
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    {/* Status */}
                                    <div className="col-md-4 mb-3">

                                        <label className="form-label">
                                            Status
                                        </label>

                                        <select
                                            className="form-select"
                                            name="status"
                                            value={
                                                callbackData.status
                                            }
                                            onChange={handleChange}
                                        >

                                            <option value="pending">
                                                Pending
                                            </option>

                                            <option value="completed">
                                                Completed
                                            </option>

                                            <option value="missed">
                                                Missed
                                            </option>

                                            <option value="rescheduled">
                                                Rescheduled
                                            </option>

                                        </select>

                                    </div>

                                    {/* Remark */}
                                    <div className="col-md-12 mb-3">

                                        <label className="form-label">
                                            Remark
                                        </label>

                                        <textarea
                                            className="form-control"
                                            rows="3"
                                            name="remark"
                                            value={
                                                callbackData.remark
                                            }
                                            onChange={handleChange}
                                            placeholder="Enter remarks"
                                        ></textarea>

                                    </div>

                                    {/* Submit */}
                                    <div className="col-md-12">

                                        <button
                                            type="submit"
                                            className="btn btn-success"
                                            disabled={loading}
                                        >

                                            {
                                                loading
                                                    ? 'Saving...'
                                                    : 'Save Callback'
                                            }

                                        </button>

                                    </div>

                                </div>

                            </form>

                        </div>

                    </div>
                )
            }

            {/* Callback List */}
            <div
                className="card shadow"
                style={{
                    height: 'calc(100vh - 140px)'
                }}
            >

                <div className="card-header bg-dark text-white">

                    <h5 className="mb-0">
                        Callback History
                    </h5>

                </div>

                <div
                    className="card-body"
                    style={{
                        overflowY: 'auto'
                    }}
                >

                    <div className="table-responsive">

                        <table className="table table-bordered table-hover align-middle">

                            <thead className="table-light">

                                <tr>

                                    <th>File Number</th>

                                    <th>Date</th>

                                    <th>Time</th>

                                    <th>Status</th>

                                    <th>Remark</th>

                                    <th>Action</th>

                                </tr>

                            </thead>

                            <tbody>

                                {
                                    callbackList.length > 0 ? (

                                        callbackList.map((item) => (

                                            <tr key={item._id}>

                                                <td>
                                                    {item.file_number}
                                                </td>

                                                <td>
                                                    {
                                                        item.expected_call_back_date?.split('T')[0]
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        item.expected_call_back_time
                                                    }
                                                </td>

                                                <td>

                                                    <span
                                                        className={`badge ${item.call_back_status === 'completed'
                                                            ? 'bg-success'
                                                            : item.call_back_status === 'missed'
                                                                ? 'bg-danger'
                                                                : item.call_back_status === 'rescheduled'
                                                                    ? 'bg-warning text-dark'
                                                                    : 'bg-primary'
                                                            }`}
                                                    >
                                                        {
                                                            item.call_back_status
                                                        }
                                                    </span>

                                                </td>

                                                <td>
                                                    {item.remark}
                                                </td>

                                                <td>

                                                    <div className="dropdown">

                                                        <button
                                                            className="btn btn-secondary btn-sm dropdown-toggle"
                                                            type="button"
                                                            data-bs-toggle="dropdown"
                                                        >
                                                            Action
                                                        </button>

                                                        <ul className="dropdown-menu">

                                                            {/* View */}
                                                            <li>

                                                                <button
                                                                    className="dropdown-item"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#viewModal"
                                                                    onClick={() =>
                                                                        setSelectedCallback(item)
                                                                    }
                                                                >
                                                                    View Details
                                                                </button>

                                                            </li>

                                                            {/* Edit */}
                                                            <li>

                                                                <button
                                                                    className="dropdown-item"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#updateModal"
                                                                    onClick={() => {

                                                                        setSelectedCallback(item);

                                                                        setUpdateStatus(
                                                                            item.call_back_status
                                                                        );
                                                                    }}
                                                                >
                                                                    Update
                                                                </button>

                                                            </li>

                                                        </ul>

                                                    </div>

                                                </td>

                                            </tr>

                                        ))

                                    ) : (

                                        <tr>

                                            <td
                                                colSpan="6"
                                                className="text-center"
                                            >
                                                No Callback Found
                                            </td>

                                        </tr>
                                    )
                                }

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

            {/* View Modal */}
            <div
                className="modal fade"
                id="viewModal"
                tabIndex="-1"
            >

                <div
                    className="modal-dialog modal-xl modal-dialog-scrollable"
                >

                    <div className="modal-content">

                        <div className="modal-header bg-primary text-white">

                            <h5 className="modal-title">
                                Callback Details
                            </h5>

                            <button
                                type="button"
                                className="btn-close btn-close-white"
                                data-bs-dismiss="modal"
                            ></button>

                        </div>

                        <div className="modal-body">

                            {
                                selectedCallback && (

                                    <div className="row">

                                        {
                                            Object.entries(selectedCallback).map(
                                                ([key, value]) => (

                                                    <div
                                                        className="col-md-6 mb-3"
                                                        key={key}
                                                    >

                                                        <strong>
                                                            {key}
                                                        </strong>

                                                        <br />

                                                        {
                                                            typeof value === 'object'
                                                                ? JSON.stringify(value)
                                                                : String(value)
                                                        }

                                                    </div>
                                                )
                                            )
                                        }

                                    </div>
                                )
                            }

                        </div>

                    </div>

                </div>

            </div>

            {/* Update Modal */}
            <div
                className="modal fade"
                id="updateModal"
                tabIndex="-1"
            >

                <div
                    className="modal-dialog modal-lg modal-dialog-scrollable"
                >

                    <div className="modal-content">

                        <div className="modal-header bg-primary text-white">

                            <h5 className="modal-title">
                                Update Callback
                            </h5>

                            <button
                                type="button"
                                className="btn-close btn-close-white"
                                data-bs-dismiss="modal"
                            ></button>

                        </div>

                        <div className="modal-body">

                            {
                                selectedCallback && (

                                    <div className="row">

                                        {/* File Number */}
                                        <div className="col-md-6 mb-3">

                                            <label className="form-label fw-bold">
                                                File Number
                                            </label>

                                            <input
                                                type="text"
                                                className="form-control"
                                                value={
                                                    selectedCallback.file_number
                                                }
                                                disabled
                                            />

                                        </div>

                                        {/* User */}
                                        <div className="col-md-6 mb-3">

                                            <label className="form-label fw-bold">
                                                Username
                                            </label>

                                            <input
                                                type="text"
                                                className="form-control"
                                                value={
                                                    selectedCallback.username
                                                }
                                                disabled
                                            />

                                        </div>

                                        {/* Role */}
                                        <div className="col-md-6 mb-3">

                                            <label className="form-label fw-bold">
                                                Role
                                            </label>

                                            <input
                                                type="text"
                                                className="form-control"
                                                value={
                                                    selectedCallback.role
                                                }
                                                disabled
                                            />

                                        </div>

                                        {/* File Status */}
                                        <div className="col-md-6 mb-3">

                                            <label className="form-label fw-bold">
                                                File Status
                                            </label>

                                            <input
                                                type="text"
                                                className="form-control"
                                                value={
                                                    selectedCallback.file_status
                                                }
                                                disabled
                                            />

                                        </div>

                                        {/* Remark */}
                                        <div className="col-md-12 mb-3">

                                            <label className="form-label fw-bold">
                                                Remark
                                            </label>

                                            <textarea
                                                className="form-control"
                                                rows="3"
                                                value={
                                                    selectedCallback.remark
                                                }

                                            ></textarea>

                                        </div>

                                        {/* Status */}
                                        <div className="col-md-6 mb-3">

                                            <label className="form-label fw-bold">
                                                Callback Status
                                            </label>

                                            <select
                                                className="form-select"
                                                value={updateStatus}
                                                onChange={(e) =>
                                                    setUpdateStatus(
                                                        e.target.value
                                                    )
                                                }
                                            >

                                                <option value="pending">
                                                    Pending
                                                </option>

                                                <option value="completed">
                                                    Completed
                                                </option>

                                                <option value="missed">
                                                    Missed
                                                </option>

                                                <option value="rescheduled">
                                                    Rescheduled
                                                </option>
                                                <option value="busy">
                                                    Busy
                                                </option>
                                            </select>

                                        </div>

                                        {/* Reschedule Date */}
                                        {
                                            updateStatus === 'rescheduled' && (

                                                <>

                                                    <div className="col-md-3 mb-3">

                                                        <label className="form-label fw-bold">
                                                            New Date
                                                        </label>

                                                        <input
                                                            type="date"
                                                            className="form-control"
                                                            value={
                                                                selectedCallback.expected_call_back_date?.split('T')[0]
                                                            }
                                                            onChange={(e) =>
                                                                setSelectedCallback({
                                                                    ...selectedCallback,
                                                                    expected_call_back_date:
                                                                        e.target.value
                                                                })
                                                            }
                                                        />

                                                    </div>

                                                    <div className="col-md-3 mb-3">

                                                        <label className="form-label fw-bold">
                                                            New Time
                                                        </label>

                                                        <input
                                                            type="time"
                                                            className="form-control"
                                                            value={
                                                                selectedCallback.expected_call_back_time
                                                            }
                                                            onChange={(e) =>
                                                                setSelectedCallback({
                                                                    ...selectedCallback,
                                                                    expected_call_back_time:
                                                                        e.target.value
                                                                })
                                                            }
                                                        />

                                                    </div>

                                                </>
                                            )
                                        }

                                    </div>
                                )
                            }




                            <div className="modal-footer">

                                <button
                                    className="btn btn-primary text-white"
                                    style={{
                                        backgroundColor: '#0d6efd',
                                        borderColor: '#0d6efd'
                                    }}
                                    onClick={handleStatusUpdate}
                                    data-bs-dismiss="modal"
                                >
                                    Update Callback
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default ScheduleCallback;