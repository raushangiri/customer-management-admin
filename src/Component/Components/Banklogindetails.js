import React, { useState, useEffect } from 'react';
import { useOverview } from '../ContentHook/OverviewContext';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'; // Import useNavigate

const Banklogindetails = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [bankDetail, setBankDetail] = useState({});
  const baseurl = process.env.REACT_APP_API_BASE_URL;
  const { formData } = useOverview();
  const [personalDetails, setPersonalDetails] = useState(null);
  const [coapplicantOneDetails, setCoapplicantOneDetails] = useState(null);
  const [coapplicantTwoDetails, setCoapplicantTwoDetails] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);
  // const [bankDetails, setBankDetails] = useState([]);
  const [selectedBankDetails, setSelectedBankDetails] = useState([]);
  const { _id } = useParams();
  const userId = localStorage.getItem('userId');
    const userRole = localStorage.getItem('userRole');

  const [bankDetails, setBankDetails] = useState([
    {
      _id: 1,
      bank_name: '',
      rm1_name: '',
      rm1_contact_number: '',
      emails: [''],
      ccEmails: [''],
      remarks: '',
      document_status: ''
    }
  ]);

  const [references, setReferences] = useState([]);
  const toggleSection = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // This will take the user to the previous page
  };

  // Fetch personal details
  useEffect(() => {
    const fetchPersonalDetails = async () => {
      try {
        const response = await axios.get(`${baseurl}/getpersonadetails/${formData.file_number}`);
        setPersonalDetails(response.data.data);
      } catch (error) {
        console.error('Error fetching personal details:', error);
      }
    };
    const fetchcoapplicantOneData = async () => {
      try {
        const response = await axios.get(`${baseurl}/getcoapplicantonedetails/${formData.file_number}`);
        setCoapplicantOneDetails(response.data.data);
      } catch (error) {
        console.error('Error fetching co-applicant one details:', error);
      }
    };
      const fetchcoapplicantTwoData = async () => {
      try {
        const response = await axios.get(`${baseurl}/getcoapplicanttwopersonadetails/${formData.file_number}`);
        setCoapplicantTwoDetails(response.data.data);
      } catch (error) {
        console.error('Error while fetching details:', error);
      }
    };
    const fetchReferences = async () => {
      try {
        const response = await axios.get(`${baseurl}/getreferencedetail/${formData.file_number}`);
        setReferences(Array.isArray(response.data.data) ? response.data.data : [response.data.data]);
      } catch (error) {
        console.error("Error fetching references", error);
      }
    };
    if (formData.file_number) {
      fetchPersonalDetails();
      fetchReferences();
      fetchcoapplicantOneData();
      fetchcoapplicantTwoData();
    }
  }, [formData.file_number]);

  useEffect(() => {
    const fetchBankDetails = async () => {
      try {
        const response = await axios.get(`${baseurl}/getbanklogindetailsbyid/${_id}`);
        const bankDataArray = response.data;

        if (bankDataArray && bankDataArray.length > 0) {
          const bankData = bankDataArray[0];

          // Set the state with fetched data
          setBankDetail({
            bank_name: bankData.bank_name || '',
            rm1_name: bankData.rm1_name || '',
            rm1_contact_number: bankData.rm1_contact_number || '',
            emails: bankData.email_1 ? [bankData.email_1] : [], 
            ccEmails: bankData.email_2 ? [bankData.email_2] : [],
            remarks: bankData.remarks || '',
            document_status: bankData.document_status || '',
          });
        }
      } catch (error) {
        console.error('Error fetching bank details:', error);
      }
    };

    if (formData.file_number) {
      fetchBankDetails();
    }
  }, [formData.file_number, baseurl]);
  const handleInputChange = (field, value) => {
    setBankDetail((prevDetail) => ({ ...prevDetail, [field]: value }));
  };

  const handleEmailChange = (emailType, emailIndex, value) => {
    setBankDetail((prevDetail) => {
      const updatedEmails = [...prevDetail[emailType]];
      updatedEmails[emailIndex] = value;
      return { ...prevDetail, [emailType]: updatedEmails };
    });
  };

  const handleAddEmail = (emailType) => {
    setBankDetail((prevDetail) => ({
      ...prevDetail,
      [emailType]: [...prevDetail[emailType], ''],
    }));
  };

  const handleRemoveEmail = (emailType, emailIndex) => {
    setBankDetail((prevDetail) => {
      const updatedEmails = [...prevDetail[emailType]];
      updatedEmails.splice(emailIndex, 1);
      return { ...prevDetail, [emailType]: updatedEmails };
    });
  };
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get(`${baseurl}/getdocumentdata/${formData.file_number}`);
        setDocuments(response.data.attachments || []);
      } catch (error) {
        setError('Error fetching documents');
      }
    };
    fetchDocuments();
  }, [formData.file_number]);
  const fetchRMDetails = async () => {
    try {
      const response = await axios.get(`${baseurl}/getbanklogindetailsbyid/${_id}`);
      setBankDetails(response.data || []);
    } catch (error) {
      console.error('Error fetching RM details:', error);
    }
  };
  useEffect(() => {
    fetchRMDetails();
  }, []);


  const [selectedDocuments, setSelectedDocuments] = useState([]);

  const handleDocumentSelection = (docId) => {
    setSelectedDocuments((prevSelected) => {
      if (prevSelected.includes(docId)) {
        return prevSelected.filter((id) => id !== docId);
      } else {
        return [...prevSelected, docId];
      }
    });
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {

      const allDocumentIds = documents.map((doc) => doc._id);
      setSelectedDocuments(allDocumentIds);
    } else {
      setSelectedDocuments([]);
    }
  };
  const [loading, setLoading] = useState(false);
// console.log("coapplicantOneDetails", coapplicantOneDetails);
// Format Co-Applicant One (if exists)
const coapplicantOneText = coapplicantOneDetails
  ? `\n\n--- Co-Applicant One Details ---\n` +
   `Name: ${coapplicantOneDetails.coapplicant_one_name || 'N/A'}\n` +
`Customer Name: ${coapplicantOneDetails.coapplicant_one_customerName || 'N/A'}\n` +
`Mobile Number: ${coapplicantOneDetails.coapplicant_one_mobile_number || 'N/A'}\n` +
`Alternate Number: ${coapplicantOneDetails.coapplicant_one_alternate_number || 'N/A'}\n` +
`Date of Birth: ${coapplicantOneDetails.coapplicant_one_date_of_birth || 'N/A'}\n` +
`Father's Name: ${coapplicantOneDetails.coapplicant_one_father_name || 'N/A'}\n` +
`Mother's Name: ${coapplicantOneDetails.coapplicant_one_mother_name || 'N/A'}\n` +
`Spouse Name: ${coapplicantOneDetails.coapplicant_one_spouse_name || 'N/A'}\n` +
`Marital Status: ${coapplicantOneDetails.coapplicant_one_marital_status || 'N/A'}\n` +
`Occupation Type: ${coapplicantOneDetails.coapplicant_one_occupation_type || 'N/A'}\n` +
`Nature of Business: ${coapplicantOneDetails.coapplicant_one_nature_of_business || 'N/A'}\n` +
`Service Type: ${coapplicantOneDetails.coapplicant_one_service_type || 'N/A'}\n` +
`Other Income: ${coapplicantOneDetails.coapplicant_one_other_income || 'N/A'}\n` +
`GST and ITR Income: ${coapplicantOneDetails.coapplicant_one_gst_and_itr_income || 'N/A'}\n` +
`GST/ITR Filed: ${coapplicantOneDetails.coapplicant_one_gst_itr_filed || 'N/A'}\n` +
`Inhand Salary: ${coapplicantOneDetails.coapplicant_one_inhand_salary || 'N/A'}\n` +
`Years at Current Organization: ${coapplicantOneDetails.coapplicant_one_years_at_current_organization || 'N/A'}\n` +
`Years at Current Residence: ${coapplicantOneDetails.coapplicant_one_years_at_current_residence || 'N/A'}\n` +
`Total Time in Delhi: ${coapplicantOneDetails.coapplicant_one_total_time_in_delhi || 'N/A'}\n` +
`Loan Category: ${coapplicantOneDetails.coapplicant_one_loan_category || 'N/A'}\n` +
`Type of Loan: ${coapplicantOneDetails.coapplicant_one_type_of_loan || 'N/A'}\n` +
`Required Amount: ${coapplicantOneDetails.coapplicant_one_required_amount || 'N/A'}\n` +
`Permanent Address: ${coapplicantOneDetails.coapplicant_one_permanent_address || 'N/A'}\n` +
`Permanent Address Landmark: ${coapplicantOneDetails.coapplicant_one_permanent_address_landmark || 'N/A'}\n` +
`Current Address: ${coapplicantOneDetails.coapplicant_one_current_address || 'N/A'}\n` +
`Office Name: ${coapplicantOneDetails.coapplicant_one_office_name || 'N/A'}\n` +
`Office Address: ${coapplicantOneDetails.coapplicant_one_office_address || 'N/A'}\n` +
`Office Address Landmark: ${coapplicantOneDetails.coapplicant_one_office_address_landmark || 'N/A'}\n` +
`Personal Email ID: ${coapplicantOneDetails.coapplicant_one_personal_email_id || 'N/A'}\n` +
`Official Email ID: ${coapplicantOneDetails.coapplicant_one_official_email_id || 'N/A'}\n` +
`Type of Resident: ${coapplicantOneDetails.coapplicant_one_type_of_resident || 'N/A'}\n` +
`Note: ${coapplicantOneDetails.coapplicant_one_note || 'N/A'}\n`

  : "";

// Format Co-Applicant Two (if exists)
const coapplicantTwoText = coapplicantTwoDetails
  ? `\n\n--- Co-Applicant Two Details ---\n` +
   `Name: ${coapplicantTwoDetails.coapplicant_two_name || 'N/A'}\n` +
`Customer Name: ${coapplicantTwoDetails.coapplicant_two_customerName || 'N/A'}\n` +
`Mobile Number: ${coapplicantTwoDetails.coapplicant_two_mobile_number || 'N/A'}\n` +
`Alternate Number: ${coapplicantTwoDetails.coapplicant_two_alternate_number || 'N/A'}\n` +
`Date of Birth: ${coapplicantTwoDetails.coapplicant_two_date_of_birth || 'N/A'}\n` +
`Father's Name: ${coapplicantTwoDetails.coapplicant_two_father_name || 'N/A'}\n` +
`Mother's Name: ${coapplicantTwoDetails.coapplicant_two_mother_name || 'N/A'}\n` +
`Spouse Name: ${coapplicantTwoDetails.coapplicant_two_spouse_name || 'N/A'}\n` +
`Marital Status: ${coapplicantTwoDetails.coapplicant_two_marital_status || 'N/A'}\n` +
`Occupation Type: ${coapplicantTwoDetails.coapplicant_two_occupation_type || 'N/A'}\n` +
`Nature of Business: ${coapplicantTwoDetails.coapplicant_two_nature_of_business || 'N/A'}\n` +
`Service Type: ${coapplicantTwoDetails.coapplicant_two_service_type || 'N/A'}\n` +
`Other Income: ${coapplicantTwoDetails.coapplicant_two_other_income || 'N/A'}\n` +
`GST and ITR Income: ${coapplicantTwoDetails.coapplicant_two_gst_and_itr_income || 'N/A'}\n` +
`GST/ITR Filed: ${coapplicantTwoDetails.coapplicant_two_gst_itr_filed || 'N/A'}\n` +
`Inhand Salary: ${coapplicantTwoDetails.coapplicant_two_inhand_salary || 'N/A'}\n` +
`Years at Current Organization: ${coapplicantTwoDetails.coapplicant_two_years_at_current_organization || 'N/A'}\n` +
`Years at Current Residence: ${coapplicantTwoDetails.coapplicant_two_years_at_current_residence || 'N/A'}\n` +
`Total Time in Delhi: ${coapplicantTwoDetails.coapplicant_two_total_time_in_delhi || 'N/A'}\n` +
`Loan Category: ${coapplicantTwoDetails.coapplicant_two_loan_category || 'N/A'}\n` +
`Type of Loan: ${coapplicantTwoDetails.coapplicant_two_type_of_loan || 'N/A'}\n` +
`Required Amount: ${coapplicantTwoDetails.coapplicant_two_required_amount || 'N/A'}\n` +
`Permanent Address: ${coapplicantTwoDetails.coapplicant_two_permanent_address || 'N/A'}\n` +
`Permanent Address Landmark: ${coapplicantTwoDetails.coapplicant_two_permanent_address_landmark || 'N/A'}\n` +
`Current Address: ${coapplicantTwoDetails.coapplicant_two_current_address || 'N/A'}\n` +
`Office Name: ${coapplicantTwoDetails.coapplicant_two_office_name || 'N/A'}\n` +
`Office Address: ${coapplicantTwoDetails.coapplicant_two_office_address || 'N/A'}\n` +
`Office Address Landmark: ${coapplicantTwoDetails.coapplicant_two_office_address_landmark || 'N/A'}\n` +
`Personal Email ID: ${coapplicantTwoDetails.coapplicant_two_personal_email_id || 'N/A'}\n` +
`Official Email ID: ${coapplicantTwoDetails.coapplicant_two_official_email_id || 'N/A'}\n` +
`Type of Resident: ${coapplicantTwoDetails.coapplicant_two_type_of_resident || 'N/A'}\n` +
`Note: ${coapplicantTwoDetails.coapplicant_two_note || 'N/A'}\n`

  : "";






  const sendEmail = async () => {
    if (!personalDetails) {
      alert('Personal details or recipient email not available.');
      return;
    }
    const extractFileName = (url, index) => {
      const fileNameWithExtension = url.substring(url.lastIndexOf('/') + 1, url.indexOf('?'));
      const dotIndex = fileNameWithExtension.lastIndexOf('.');
      const fileName = fileNameWithExtension.substring(0, dotIndex);
      const extension = fileNameWithExtension.substring(dotIndex);
      return `${fileName}_${index}${extension}`;
    };
    // const documentUrls = documents.map((doc) => doc.downloadUrl);
    // const documentNames = documents.map((doc, index) => extractFileName(doc.downloadUrl, index));

const selectedDocs = documents.filter((doc) =>
  selectedDocuments.includes(doc._id)
);

const documentUrls = selectedDocs.map(
  (doc) => doc.downloadUrl
);

const documentNames = selectedDocs.map(
  (doc, index) =>
    extractFileName(doc.downloadUrl, index)
);

    const referenceDetails = references.map((ref, index) => (
      `\n\nReference ${index + 1}:\n` +
      `Name: ${ref.reference_name || 'N/A'}\n` +
      `Mobile Number: ${ref.reference_mobile_number || 'N/A'}\n` +
      `Occupation Type: ${ref.reference_occupation_type || 'N/A'}\n` +
      `Nature of Business: ${ref.reference_nature_of_business || 'N/A'}\n` +
      `Company Name: ${ref.company_name || 'N/A'}\n` +
      `Address: ${ref.reference_address || 'N/A'}`
    )).join('\n');
    let ccemail = bankDetail.ccEmails || [];
    const emailData = {
      email: bankDetail.emails,
      cc: [...ccemail, "jbjassociate@gmail.com"],
      subject: `Loan application from JBJ fintech for customer ${personalDetails.name}`,
      text: `Here are the personal details for customer ${personalDetails.name}:\n\n` +
        `File Number: ${personalDetails.file_number || 'N/A'}\n` +
        `Name: ${personalDetails.name || 'N/A'}\n` +
        `Mobile Number: ${personalDetails.mobile_number || 'N/A'}\n` +
        `Alternate Number: ${personalDetails.alternate_number || 'N/A'}\n` +
        `Date of Birth: ${personalDetails.date_of_birth || 'N/A'}\n` +
        `Father's Name: ${personalDetails.father_name || 'N/A'}\n` +
        `Mother's Name: ${personalDetails.mother_name || 'N/A'}\n` +
        `Spouse Name: ${personalDetails.spouse_name || 'N/A'}\n` +
        `Marital Status: ${personalDetails.marital_status || 'N/A'}\n` +
        `Occupation Type: ${personalDetails.occupation_type || 'N/A'}\n` +
        `Nature of Business: ${personalDetails.nature_of_business || 'N/A'}\n` +
        `Service Type: ${personalDetails.service_type || 'N/A'}\n` +
        `Other Income: ${personalDetails.other_income || 'N/A'}\n` +
        `GST and ITR Income: ${personalDetails.gst_and_itr_income || 'N/A'}\n` +
        `GST/ITR Filed: ${personalDetails.gst_itr_filed || 'N/A'}\n` +
        `Inhand Salary: ${personalDetails.inhand_salary || 'N/A'}\n` +
        `Years at Current Organization: ${personalDetails.years_at_current_organization || 'N/A'}\n` +
        `Years at Current Residence: ${personalDetails.years_at_current_residence || 'N/A'}\n` +
        `Total Time in Delhi: ${personalDetails.total_time_in_delhi || 'N/A'}\n` +
        `Loan Category: ${personalDetails.loan_category || 'N/A'}\n` +
        `Type of Loan: ${personalDetails.type_of_loan || 'N/A'}\n` +
        `Required Amount: ${personalDetails.required_amount || 'N/A'}\n` +
        `Permanent Address: ${personalDetails.permanent_address || 'N/A'}\n` +
        `Permanent Address Landmark: ${personalDetails.permanent_address_landmark || 'N/A'}\n` +
        `Current Address: ${personalDetails.current_address || 'N/A'}\n` +
        `Office Name: ${personalDetails.office_name || 'N/A'}\n` +
        `Office Address: ${personalDetails.office_address || 'N/A'}\n` +
        `Office Address Landmark: ${personalDetails.office_address_landmark || 'N/A'}\n` +
        `Personal Email ID: ${personalDetails.personal_email_id || 'N/A'}\n` +
        `Official Email ID: ${personalDetails.official_email_id || 'N/A'}\n` +
        `Type of Resident: ${personalDetails.type_of_resident || 'N/A'}\n` +
        `Note: ${personalDetails.note || 'N/A'}\n\n` +
        `References:\n${referenceDetails}`+
         (personalDetails.is_coapplicant === "yes"
      ? `\n\nCo-Applicant One Details:\n${coapplicantOneText}\n\nCo-Applicant Two Details:\n${coapplicantTwoText}`
      : ""
    ) +
        `\n\nPlease find the attached documents for further processing.\n\n` +
        `Best regards,\nJBJ Fintech`,
///////////////Co applicant one details ////////////////


      documentUrls: documentUrls,
      documentNames: documentNames,
      _id: _id
    };

  const dispositionPayload = {
  userId,
  role: userRole,
  call_status: "Connected",
  is_interested: "Interested",
  disposition: "bank_login_underprocess",
 selected_documents: selectedDocs.map(doc => ({
  document_name: doc.document_name,
  document_url: doc.downloadUrl
})),
  expected_document_date: new Date(),
  not_interested_reason: "NA",
  remarks: `Email shared with ${bankDetail.bank_name} RM`,
  file_status: "bank_login_underprocess",
  file_number: personalDetails.file_number,
  type_of_loan: personalDetails.type_of_loan
};


    try {
      setLoading(true);
      await axios.post(`${baseurl}/sendEmailWithAttachment`, emailData);
      await axios.post(`${baseurl}/createdesposition`, dispositionPayload);
      alert('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email.');
    } finally {
      setLoading(false);
    }
  };




  return (
    <div className="position-relative container mt-4">
      {/* Personal Details Section */}
      {loading && (
        <div
          className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-light bg-opacity-75"
          style={{ zIndex: 1050 }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">
            <button className="btn btn-link" onClick={() => toggleSection(0)}>
              Personal Details
            </button>
          </h5>
        </div>
        <div className={`collapse ${activeIndex === 0 ? 'show' : ''}`}>
          <div className="card-body">
            {personalDetails ? (
              <div>
                <p><strong>File Number:</strong> {personalDetails.file_number}</p>
                <p><strong>Name:</strong> {personalDetails.customerName || 'N/A'}</p>
                <p><strong>Mobile Number:</strong> {personalDetails.mobile_number || 'N/A'}</p>
                <p><strong>Alternate Number:</strong> {personalDetails.alternate_number || 'N/A'}</p>
                <p><strong>Date of Birth:</strong> {personalDetails.date_of_birth || 'N/A'}</p>
                <p><strong>Father's Name:</strong> {personalDetails.father_name || 'N/A'}</p>
                <p><strong>Mother's Name:</strong> {personalDetails.mother_name || 'N/A'}</p>
                <p><strong>Spouse Name:</strong> {personalDetails.spouse_name || 'N/A'}</p>
                <p><strong>Marital Status:</strong> {personalDetails.marital_status || 'N/A'}</p>
                <p><strong>Occupation Type:</strong> {personalDetails.occupation_type || 'N/A'}</p>
                <p><strong>Nature of Business:</strong> {personalDetails.nature_of_business || 'N/A'}</p>
                <p><strong>Service Type:</strong> {personalDetails.service_type || 'N/A'}</p>
                <p><strong>Other Income:</strong> {personalDetails.other_income || 'N/A'}</p>
                <p><strong>GST and ITR Income:</strong> {personalDetails.gst_and_itr_income || 'N/A'}</p>
                <p><strong>GST/ITR Filed:</strong> {personalDetails.gst_itr_filed || 'N/A'}</p>
                <p><strong>Inhand Salary:</strong> {personalDetails.inhand_salary || 'N/A'}</p>
                <p><strong>Years at Current Organization:</strong> {personalDetails.years_at_current_organization || 'N/A'}</p>
                <p><strong>Years at Current Residence:</strong> {personalDetails.years_at_current_residence || 'N/A'}</p>
                <p><strong>Total Time in Delhi:</strong> {personalDetails.total_time_in_delhi || 'N/A'}</p>
                <p><strong>Loan Category:</strong> {personalDetails.loan_category || 'N/A'}</p>
                <p><strong>Type of Loan:</strong> {personalDetails.type_of_loan || 'N/A'}</p>
                <p><strong>Required Amount:</strong> {personalDetails.required_amount || 'N/A'}</p>
                <p><strong>Permanent Address:</strong> {personalDetails.permanent_address || 'N/A'}</p>
                <p><strong>Permanent Address Landmark:</strong> {personalDetails.permanent_address_landmark || 'N/A'}</p>
                <p><strong>Current Address:</strong> {personalDetails.current_address || 'N/A'}</p>
                <p><strong>Office Name:</strong> {personalDetails.office_name || 'N/A'}</p>
                <p><strong>Office Address:</strong> {personalDetails.office_address || 'N/A'}</p>
                <p><strong>Office Address Landmark:</strong> {personalDetails.office_address_landmark || 'N/A'}</p>
                <p><strong>Personal Email ID:</strong> {personalDetails.personal_email_id || 'N/A'}</p>
                <p><strong>Official Email ID:</strong> {personalDetails.official_email_id || 'N/A'}</p>
                <p><strong>Type of Resident:</strong> {personalDetails.type_of_resident || 'N/A'}</p>
                <p><strong>Years at current Residence:</strong> {personalDetails.years_at_current_residence || 'N/A'}</p>
                <p><strong>Years at current Organization:</strong> {personalDetails.years_at_current_organization || 'N/A'}</p>
                {/* Add more fields as necessary */}
              </div>
            ) : (
              <p>Loading personal details...</p>
            )}
          </div>
        </div>
      </div>

      {/* Document Section */}
      <div className="card mt-2">
        <div className="card-header">
          <h5 className="mb-0">
            <button className="btn btn-link" onClick={() => toggleSection(1)}>
              Document
            </button>
          </h5>
        </div>
        <div className={`collapse ${activeIndex === 1 ? 'show' : ''}`}>
          <div className="card-body">
            {documents.length > 0 ? (
              <>
                {/* Select All Checkbox */}
                <div className="mb-2">
                  <input
                    type="checkbox"
                    id="selectAll"
                    checked={selectedDocuments.length === documents.length}
                    onChange={handleSelectAll}
                  />
                  <label htmlFor="selectAll" className="ml-2">
                    Select All
                  </label>
                </div>

                <ul className="list-group">
                  {documents.map((doc) => (
                    <li
                      key={doc._id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <div>
                        {/* Individual Document Checkbox */}
                        <input
                          type="checkbox"
                          id={`doc-${doc._id}`}
                          checked={selectedDocuments.includes(doc._id)}
                          onChange={() => handleDocumentSelection(doc._id)}
                        />
                        <label htmlFor={`doc-${doc._id}`} className="ml-2">
                          {doc.document_name}
                        </label>
                      </div>
                      <a
                        href={doc.readUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-primary mr-2"
                      >
                        View
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p>No documents found.</p>
            )}
          </div>
        </div>
      </div>

      
      <div className="collapse show">
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Select</th>
                <th>Bank Name</th>
                <th>RM Name</th>
                <th>RM Contact No</th>
                <th>Email (To)</th>
                <th>Email (CC)</th>
                <th>Remarks</th>
                <th>Document Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    // className="form-control"
                    checked={selectedBankDetails.includes(0)}
                    onChange={() => setSelectedBankDetails([0])}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={bankDetail.bank_name}
                    onChange={(e) => handleInputChange('bank_name', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={bankDetail.rm1_name}
                    onChange={(e) => handleInputChange('rm1_name', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={bankDetail.rm1_contact_number}
                    onChange={(e) => handleInputChange('rm1_contact_number', e.target.value)}
                  />
                </td>

                {/* Emails - To (email_1) */}
                <td>
                  {Array.isArray(bankDetail.emails) && bankDetail.emails.map((email, emailIndex) => (
                    <div key={emailIndex} className="input-group mb-2">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => handleEmailChange('emails', emailIndex, e.target.value)}
                        className="form-control"
                        placeholder="Enter recipient email"
                        required
                      />
                      {bankDetail.emails.length > 1 && (
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => handleRemoveEmail('emails', emailIndex)}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => handleAddEmail('emails')}
                  >
                    Add
                  </button>
                </td>

                {/* Emails - CC (email_2) */}

                <td>
                  {Array.isArray(bankDetail.ccEmails) && bankDetail.ccEmails.map((ccEmail, emailIndex) => (
                    <div key={emailIndex} className="input-group mb-2">
                      <input
                        type="email"
                        value={ccEmail}
                        onChange={(e) => handleEmailChange('ccEmails', emailIndex, e.target.value)}
                        className="form-control"
                        placeholder="Enter CC email"
                      />
                      {bankDetail.ccEmails.length > 1 && (
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => handleRemoveEmail('ccEmails', emailIndex)}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => handleAddEmail('ccEmails')}
                  >
                    Add
                  </button>
                </td>



                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={bankDetail.remarks}
                    onChange={(e) => handleInputChange('remarks', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={bankDetail.document_status}
                    onChange={(e) => handleInputChange('document_status', e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className='text-center'>
        <button className="btn btn-secondary mt-3 me-2" onClick={handleBack}>
          Back
        </button>
        <button className="btn btn-primary mt-3" onClick={sendEmail}>
          Share with RM
        </button>
      </div>
    </div>
  );
};

export default Banklogindetails;



//   const sendEmail = async () => {
  //     if (!personalDetails) {
  //       alert('Personal details or recipient email not available.');
  //       return;
  //     }
  //     const documentList = documents.map((doc) => ({
  //       url: doc.downloadUrl,
  //       name: doc.document_name
  //     }));
  // let ccemail=bankDetail.ccEmails;
  //     const emailData = {
  //       email: bankDetail.emails,
  //       cc: [...ccemail,"jbjassociate@gmail.com"],
  //       subject: `Loan application from JBJ fintech for customer ${personalDetails.customerName}`,
  //       text: `Here are the personal details for customer ${personalDetails.customerName}:\n\n` +
  //         `File Number: ${personalDetails.file_number || 'N/A'}\n` +
  //         `Name: ${personalDetails.customerName || 'N/A'}\n` +
  //         `Mobile Number: ${personalDetails.mobile_number || 'N/A'}\n` +
  //         `Alternate Number: ${personalDetails.alternate_number || 'N/A'}\n` +
  //         `Date of Birth: ${personalDetails.date_of_birth || 'N/A'}\n` +
  //         `Father's Name: ${personalDetails.father_name || 'N/A'}\n` +
  //         `Mother's Name: ${personalDetails.mother_name || 'N/A'}\n` +
  //         `Spouse Name: ${personalDetails.spouse_name || 'N/A'}\n` +
  //         `Marital Status: ${personalDetails.marital_status || 'N/A'}\n` +
  //         `Occupation Type: ${personalDetails.occupation_type || 'N/A'}\n` +
  //         `Nature of Business: ${personalDetails.nature_of_business || 'N/A'}\n` +
  //         `Service Type: ${personalDetails.service_type || 'N/A'}\n` +
  //         `Other Income: ${personalDetails.other_income || 'N/A'}\n` +
  //         `GST and ITR Income: ${personalDetails.gst_and_itr_income || 'N/A'}\n` +
  //         `GST/ITR Filed: ${personalDetails.gst_itr_filed || 'N/A'}\n` +
  //         `Inhand Salary: ${personalDetails.inhand_salary || 'N/A'}\n` +
  //         `Years at Current Organization: ${personalDetails.years_at_current_organization || 'N/A'}\n` +
  //         `Years at Current Residence: ${personalDetails.years_at_current_residence || 'N/A'}\n` +
  //         `Total Time in Delhi: ${personalDetails.total_time_in_delhi || 'N/A'}\n` +
  //         `Loan Category: ${personalDetails.loan_category || 'N/A'}\n` +
  //         `Type of Loan: ${personalDetails.type_of_loan || 'N/A'}\n` +
  //         `Required Amount: ${personalDetails.required_amount || 'N/A'}\n` +
  //         `Permanent Address: ${personalDetails.permanent_address || 'N/A'}\n` +
  //         `Permanent Address Landmark: ${personalDetails.permanent_address_landmark || 'N/A'}\n` +
  //         `Current Address: ${personalDetails.current_address || 'N/A'}\n` +
  //         `Office Name: ${personalDetails.office_name || 'N/A'}\n` +
  //         `Office Address: ${personalDetails.office_address || 'N/A'}\n` +
  //         `Office Address Landmark: ${personalDetails.office_address_landmark || 'N/A'}\n` +
  //         `Personal Email ID: ${personalDetails.personal_email_id || 'N/A'}\n` +
  //         `Official Email ID: ${personalDetails.official_email_id || 'N/A'}\n` +
  //         `Type of Resident: ${personalDetails.type_of_resident || 'N/A'}\n` +
  //         `Years at Current Residence: ${personalDetails.years_at_current_residence || 'N/A'}\n` +
  //         `Years at Current Organization: ${personalDetails.years_at_current_organization || 'N/A'}\n`+
  //         `Note: ${personalDetails.note || 'N/A'}\n`,
  //         documents: documentList
  //     };

  //     try {
  //       setLoading(true);
  //       await axios.post(`${baseurl}/sendEmailWithAttachment`, emailData);
  //       alert('Email sent successfully!');
  //     } catch (error) {
  //       console.error('Error sending email:', error);
  //       alert('Failed to send email.');
  //     }
  //     finally {
  //       setLoading(false);
  //     }
  //   };

  // const sendEmail = async () => {
  //   if (!personalDetails) {
  //     alert('Personal details or recipient email not available.');
  //     return;
  //   }

  //   // Function to extract file name with extension and append unique identifier if necessary
  //   const extractFileName = (url, index) => {
  //     // Extract file name with extension
  //     const fileNameWithExtension = url.substring(url.lastIndexOf('/') + 1, url.indexOf('?'));

  //     // Separate file name and extension
  //     const dotIndex = fileNameWithExtension.lastIndexOf('.');
  //     const fileName = fileNameWithExtension.substring(0, dotIndex);
  //     const extension = fileNameWithExtension.substring(dotIndex);

  //     // Return file name with index and extension intact
  //     return `${fileName}_${index}${extension}`;
  //   };

  //   // Extracting document URLs and document names with unique identifiers
  //   const documentUrls = documents.map((doc) => doc.downloadUrl);
  //   const documentNames = documents.map((doc, index) => extractFileName(doc.downloadUrl, index));

  //   let ccemail = bankDetail.ccEmails || [];
  //   const emailData = {
  //     email: bankDetail.emails,
  //     cc: [...ccemail, "jbjassociate@gmail.com"],
  //     subject: `Loan application from JBJ fintech for customer ${personalDetails.customerName}`,
  //     text: `Here are the personal details for customer ${personalDetails.customerName}:\n\n` +
  //       `File Number: ${personalDetails.file_number || 'N/A'}\n` +
  //       `Name: ${personalDetails.customerName || 'N/A'}\n` +
  //       `Mobile Number: ${personalDetails.mobile_number || 'N/A'}\n` +
  //       `Alternate Number: ${personalDetails.alternate_number || 'N/A'}\n` +
  //       `Date of Birth: ${personalDetails.date_of_birth || 'N/A'}\n` +
  //       `Father's Name: ${personalDetails.father_name || 'N/A'}\n` +
  //       `Mother's Name: ${personalDetails.mother_name || 'N/A'}\n` +
  //       `Spouse Name: ${personalDetails.spouse_name || 'N/A'}\n` +
  //       `Marital Status: ${personalDetails.marital_status || 'N/A'}\n` +
  //       `Occupation Type: ${personalDetails.occupation_type || 'N/A'}\n` +
  //       `Nature of Business: ${personalDetails.nature_of_business || 'N/A'}\n` +
  //       `Service Type: ${personalDetails.service_type || 'N/A'}\n` +
  //       `Other Income: ${personalDetails.other_income || 'N/A'}\n` +
  //       `GST and ITR Income: ${personalDetails.gst_and_itr_income || 'N/A'}\n` +
  //       `GST/ITR Filed: ${personalDetails.gst_itr_filed || 'N/A'}\n` +
  //       `Inhand Salary: ${personalDetails.inhand_salary || 'N/A'}\n` +
  //       `Years at Current Organization: ${personalDetails.years_at_current_organization || 'N/A'}\n` +
  //       `Years at Current Residence: ${personalDetails.years_at_current_residence || 'N/A'}\n` +
  //       `Total Time in Delhi: ${personalDetails.total_time_in_delhi || 'N/A'}\n` +
  //       `Loan Category: ${personalDetails.loan_category || 'N/A'}\n` +
  //       `Type of Loan: ${personalDetails.type_of_loan || 'N/A'}\n` +
  //       `Required Amount: ${personalDetails.required_amount || 'N/A'}\n` +
  //       `Permanent Address: ${personalDetails.permanent_address || 'N/A'}\n` +
  //       `Permanent Address Landmark: ${personalDetails.permanent_address_landmark || 'N/A'}\n` +
  //       `Current Address: ${personalDetails.current_address || 'N/A'}\n` +
  //       `Office Name: ${personalDetails.office_name || 'N/A'}\n` +
  //       `Office Address: ${personalDetails.office_address || 'N/A'}\n` +
  //       `Office Address Landmark: ${personalDetails.office_address_landmark || 'N/A'}\n` +
  //       `Personal Email ID: ${personalDetails.personal_email_id || 'N/A'}\n` +
  //       `Official Email ID: ${personalDetails.official_email_id || 'N/A'}\n` +
  //       `Type of Resident: ${personalDetails.type_of_resident || 'N/A'}\n` +
  //       `Years at Current Residence: ${personalDetails.years_at_current_residence || 'N/A'}\n` +
  //       `Years at Current Organization: ${personalDetails.years_at_current_organization || 'N/A'}\n` +
  //       `Note: ${personalDetails.note || 'N/A'}\n`,
  //     documentUrls: documentUrls,  // Sending document URLs
  //     documentNames: documentNames // Sending document names with unique identifiers
  //   };

  //   try {
  //     setLoading(true);
  //     await axios.post(`${baseurl}/sendEmailWithAttachment`, emailData);
  //     alert('Email sent successfully!');
  //   } catch (error) {
  //     console.error('Error sending email:', error);
  //     alert('Failed to send email.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  {/* RM Details Section */}
      {/* <div className="card mt-2">
        <div className="card-header">
          <h5 className="mb-0">
            <button className="btn btn-link" onClick={() => toggleSection(2)}>
              RM Details
            </button>
          </h5>
        </div>
        <div className={`collapse ${activeIndex === 2 ? 'show' : ''}`}>
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Bank Name</th>
                  <th>RM Name</th>
                  <th>RM Contact No</th>
                  <th>Email 1</th>
                  <th>Email 2</th>
                  <th>Remarks</th>
                  <th>Document Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bankDetails.map((detail, index) => (
                  <tr key={detail._id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedBankDetails.includes(index)}
                        onChange={() => handleSelectChange(index)}
                      />
                    </td>
                    <td>{detail.bank_name}</td>
                    <td>{detail.rm1_name}</td>
                    <td>{detail.rm1_contact_number}</td>
                    <td>{detail.email_1}</td>
                    <td>{detail.email_2 || 'N/A'}</td>
                    <td>{detail.remarks}</td>
                    <td>{detail.document_status}</td>
                    <td>
                      <button className="btn btn-primary btn-sm" onClick={() => handleEdit(index)}>
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div> */}