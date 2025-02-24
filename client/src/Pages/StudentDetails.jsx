import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function StudentDetails() {
    const { id } = useParams(); // Destructure `id` directly from `useParams`
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State to manage the email form
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [formError, setFormError] = useState('');
    const [sendingEmail, setSendingEmail] = useState(false)

    const fetchStudent = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/students/${id}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            });
            setStudent(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const getPercentageValue = (value) => {
        return Number(value.slice(0, value.length - 1));
    };

    const sendEmail = async (e) => {
        e.preventDefault(); // Prevent page reload on form submit

        // Check if required fields are filled
        if (!subject || !message) {
            setFormError('All fields are required.');
            return;
        }
        setSendingEmail(true)
        try {
            const response = await axios.post(
                `http://localhost:5000/api/students/send-email/${id}`,
                {
                    subject,
                    message,
                },
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                }
            );
            if (response.status === 200) {
                alert('Email sent successfully');
            }
        } catch (err) {
            alert('Failed to send email: ' + err.message);
        }finally{
            setSendingEmail(false)
        }
    };

    useEffect(() => {
        fetchStudent();
    }, [id]); // Add `id` to the dependency array

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-900">
                <div className="text-white text-2xl">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-900">
                <div className="text-red-500 text-2xl">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold text-white mb-4">{student?.name}</h1>
                <h2 className="text-xl text-gray-300 mb-6"><a href={`mailto:${student?.email}`}>{student?.email}</a></h2>
                {student?.profileSummary && <p className="text-gray-300"><strong>PROFILE SUMMARY</strong> - {student?.profileSummary}</p>}
                <p className="text-gray-300"><strong>JOB DESCRIPTION</strong> - {student?.jd}</p>
                {student?.atsScore && <p className="text-xl text-gray-300 mb-6">{student?.atsScore} - {getPercentageValue(student.atsScore) > 60 ? <span className='text-green-400'>PASSED</span> : <span className='text-red-500'>FAILED</span>}</p>}
                
                {/* Email form */}
                <form onSubmit={sendEmail} className="mt-6 space-y-4">
                    {formError && <p className="text-red-500">{formError}</p>}
                    
                    <div>
                        <label htmlFor="subject" className="text-gray-300">Subject:</label>
                        <input
                            type="text"
                            id="subject"
                            placeholder='Enter subject here...'
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            required
                            className="w-full p-2 mt-2 bg-gray-700 text-white rounded-md"
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="text-gray-300">Message:</label>
                        <textarea
                            id="message"
                            value={message}
                            placeholder='Enter meet link and time here...'
                            onChange={(e) => setMessage(e.target.value)}
                            required
                            className="w-full p-2 mt-2 bg-gray-700 text-white rounded-md"
                            rows="4"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={sendingEmail}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 mt-4 cursor-pointer"
                    >
                        {sendingEmail ? 'Sending...' : 'Send Invitation Email'}
                    </button>
                </form>
            </div>
        </div>
    );
}
