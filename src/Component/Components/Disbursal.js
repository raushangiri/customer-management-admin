import React, { useState, useEffect } from "react";
import { useOverview } from "../ContentHook/OverviewContext";

/* Input Component */
const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange
}) => (

  <div className="mb-3">

    <label className="form-label fw-semibold">
      {label}
    </label>

    <input
      type={type}
      name={name}
      value={value || ""}
      onChange={onChange}
      className="form-control"
    />

  </div>
);

const Disbursal = () => {

  const { formData, setFormData } =
    useOverview();

  const baseurl =
    process.env.REACT_APP_API_BASE_URL;

  const fileNumber =
    formData?.file_number;

  /* States */
  const [localFormData, setLocalFormData] =
    useState({});

  const [similarToApproval,
    setSimilarToApproval] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  /* Allowed Fields */
  const allowedFields = [

    "loanType",

    "customerName",

    "bankName",

    "emiDate",

    "asset",

    "basicLoanAmount",

    "loanSuraksha",

    "pfCharges",

    "docCharges",

    "stampDuty",

    "emiAmount",

    "tenure",

    "deductFc",

    "rto",

    "netDisbursalAmount",

    "customerPaymentDD",

    "holdPayment",

    "docOnline",

    "carInsurance",

    "minusFcAmount",

    "preEmi",

    "roiType",

    "subjectivity",

    "inhandAmountCustomer",

    "remark",

    "cashback"
  ];

  /* Number Fields */
  const numberFields = [

    "basicLoanAmount",

    "loanSuraksha",

    "pfCharges",

    "docCharges",

    "stampDuty",

    "emiAmount",

    "tenure",

    "deductFc",

    "rto",

    "netDisbursalAmount",

    "customerPaymentDD",

    "holdPayment",

    "docOnline",

    "carInsurance",

    "minusFcAmount",

    "preEmi",

    "inhandAmountCustomer",

    "cashback"
  ];

  /* ONLY Toggle decides API */
  useEffect(() => {

    if (!fileNumber) return;

    if (similarToApproval) {

      fetchApprovalData();

    } else {

      fetchDisbursalData();
    }

  }, [similarToApproval, fileNumber]);

  /* Fetch Existing Disbursal */
  const fetchDisbursalData = async () => {

    try {

      const res = await fetch(
        `${baseurl}/getdisbursal/${fileNumber}`
      );

      const data = await res.json();

      if (
        data.success &&
        data.data
      ) {

        setLocalFormData(
          data.data
        );

        setFormData((prev) => ({

          ...prev,

          ...data.data
        }));
      }

    } catch (err) {

      console.error(
        "Disbursal Fetch Error:",
        err
      );
    }
  };

  /* Fetch Approval Data */
  const fetchApprovalData = async () => {

    try {

      const res = await fetch(
        `${baseurl}/getloanapproval/${fileNumber}`
      );

      const data = await res.json();

      if (
        data.success &&
        data.data
      ) {

        setLocalFormData(
          data.data
        );

        setFormData((prev) => ({

          ...prev,

          ...data.data
        }));
      }

    } catch (err) {

      console.error(
        "Approval Fetch Error:",
        err
      );
    }
  };

  /* Toggle */
  const handleApprovalToggle = (
    e
  ) => {

    setSimilarToApproval(
      e.target.checked
    );
  };

  /* Input Change */
  const handleChange = (e) => {

    const { name, value } =
      e.target;

    setLocalFormData((prev) => ({

      ...prev,

      [name]: value
    }));
  };

  /* Submit */
  const handleSubmit = async () => {

    try {

      setLoading(true);

      let filteredData = {};

      allowedFields.forEach((key) => {

        if (
          localFormData[key] !== undefined
        ) {

          filteredData[key] =
            localFormData[key];
        }
      });

      /* Convert Numbers */
      numberFields.forEach((key) => {

        if (
          filteredData[key] !== "" &&
          filteredData[key] !== undefined
        ) {

          filteredData[key] =
            Number(
              filteredData[key]
            );
        }
      });

      const payload = {

        file_number: fileNumber,

        similarToApproval,

        ...filteredData
      };

      const res = await fetch(

        `${baseurl}/createOrUpdatedisbursal`,

        {

          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify(payload)
        }
      );

      const data = await res.json();

      if (data.success) {

        setLocalFormData(
          data.data || {}
        );

        setFormData((prev) => ({

          ...prev,

          ...data.data
        }));

        alert(
          data.message ||
          "Disbursal Saved Successfully"
        );
      }

    } catch (err) {

      console.error(
        "Disbursal Submit Error:",
        err
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="container py-4">

      {/* Header */}
      <div className="card shadow-sm border-0 mb-4">

        <div className="card-body">

          <div className="row align-items-center">

            {/* Loan Type */}
            <div className="col-md-6">

              <label className="form-label fw-semibold">
                Loan Type
              </label>

              <select
                className="form-control"
                name="loanType"
                value={
                  localFormData.loanType || ""
                }
                onChange={handleChange}
              >

                <option value="">
                  Select Loan Type
                </option>

                <option value="Auto_loan">
                  Auto Loan
                </option>

                <option value="Personal_loan">
                  Personal Loan
                </option>

                <option value="Business Loan">
                  Business Loan
                </option>

                <option value="Home_Loan">
                  Home Loan
                </option>

                <option value="LAP">
                  LAP
                </option>

              </select>

            </div>

            {/* Toggle */}
            <div className="col-md-6">

              <div className="d-flex justify-content-md-end mt-4 mt-md-0">

                <div className="form-check form-switch">

                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="approvalToggle"
                    checked={
                      similarToApproval
                    }
                    onChange={
                      handleApprovalToggle
                    }
                    style={{
                      width: '55px',
                      height: '28px',
                      cursor: 'pointer'
                    }}
                  />

                  <label
                    className="form-check-label ms-2 fw-semibold"
                    htmlFor="approvalToggle"
                  >
                    Similar to Approval
                  </label>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Form */}
      <div className="card shadow-sm border-0">

        <div className="card-body">

          <div className="row">

            {
              allowedFields.map((field) => (

                field !== "loanType" &&
                field !== "roiType" &&
                field !== "remark" && (

                  <div
                    className="col-md-4"
                    key={field}
                  >

                    <InputField

                      label={
                        field
                          .replace(
                            /([A-Z])/g,
                            ' $1'
                          )
                          .replace(
                            /^./,
                            str =>
                              str.toUpperCase()
                          )
                      }

                      name={field}

                      value={
                        localFormData[field]
                      }

                      onChange={
                        handleChange
                      }
                    />

                  </div>
                )
              ))
            }

            {/* ROI */}
            <div className="col-md-4 mb-3">

              <label className="form-label fw-semibold">
                ROI Type
              </label>

              <select
                name="roiType"
                value={
                  localFormData.roiType || ""
                }
                onChange={
                  handleChange
                }
                className="form-control"
              >

                <option value="">
                  Select
                </option>

                <option value="Reducing">
                  Reducing
                </option>

                <option value="Flat">
                  Flat
                </option>

              </select>

            </div>

            {/* Remark */}
            <div className="col-md-12 mb-3">

              <label className="form-label fw-semibold">
                Remark
              </label>

              <textarea
                name="remark"
                value={
                  localFormData.remark || ""
                }
                onChange={
                  handleChange
                }
                className="form-control"
                rows="4"
              />

            </div>

          </div>

        </div>

      </div>

      {/* Submit */}
      <div className="text-center mt-4">

        <button
          className="btn btn-primary px-5"
          onClick={handleSubmit}
          disabled={loading}
        >

          {
            loading
              ? "Saving..."
              : "Submit / Update"
          }

        </button>

      </div>

    </div>
  );
};

export default Disbursal;