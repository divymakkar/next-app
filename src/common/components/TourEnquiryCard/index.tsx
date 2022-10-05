import { Formik, useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import React from "react";
import CheckBoxOption from "../CheckBoxOption";
import TourContentCard from "../TourContentCard";
import * as Yup from "yup";
import { isEmpty } from "lodash";

function TourEnquiryCard(props: { tourData: any; discount: string | number }) {
  const { slug, name, region, product_location, primary_destination } =
    props.tourData;

  let formattedName = `${name} ${
    props?.discount && Number(props?.discount) > 0
      ? `: Get ${props?.discount}% off!`
      : `: Get in touch to know more!`
  }`;

  const DOTFixed = "fixed";
  const DOTNotFixed = "not sure";

  const initialEnquiryData = {
    customer_id: "",
    date_of_travel: "",
    enquirer_email: "",
    enquirer_name: "",
    enquirer_phone: "",
    enquirer_phone_country_code: "",
    phone: "",
    email: "",
    message: "",
    number_of_pax: null,

    utm_params: {},
    location_name: primary_destination,
    origin_source: "thrillophilia_website", //TODO
    page_source: "product_page", //TODO
    page_url: "",
    section_source: "sidebar_enquiry_form", //TODO
    url: "",
    exploringOtherDestinations: false,
    whatsAppSubscribed: false,
    product_slug: slug,
    region_id: region.id,
    region_name: region.name,
    is_lead_from_new_system: true,
  };
  const enquiryFormSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    number_of_pax: Yup.number()
      .min(1, "Select at least 1 Guest")
      .typeError("Required"),
    enquirer_name: Yup.string().required("Required"),
  });
  const enquiryForm = useFormik({
    initialValues: initialEnquiryData,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      resetForm();
    },
    validationSchema: enquiryFormSchema,
  });
  const handleFormChange = (name: string, value: any) => {
    enquiryForm.setFieldValue(name, value);
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    enquiryForm.setFieldValue("page_url", window?.location?.origin || "");
    enquiryForm.setFieldValue("url", window?.location?.origin || "");
    enquiryForm.handleSubmit();
  };

  return (
    <TourContentCard className="tour-enquiry-card-container">
      <div className="enquiry-title">{formattedName}</div>

      <FormInput
        name="enquirer_name"
        formik={enquiryForm}
        placeholder="Your Name"
        onChange={enquiryForm.handleChange}
      />

      <FormInput
        name="email"
        formik={enquiryForm}
        placeholder="Your Email"
        onChange={enquiryForm.handleChange}
      />

      <FormInput
        name="number_of_pax"
        placeholder="No Of People"
        formik={enquiryForm}
        numberInput
      />

      <FormInput
        name="message"
        placeholder="Message"
        formik={enquiryForm}
        inputClassName="message-input"
        onChange={enquiryForm.handleChange}
        textarea
      />

      <button
        type="submit"
        className="btn btn__md btn__brand-filled send-enquiry-btn"
        onClick={handleFormSubmit}
      >
        Get Quotes
      </button>
    </TourContentCard>
  );
}

const FormInput = (props: {
  name: string;
  inputClassName?: string;
  label?: string;
  description?: string;
  placeholder?: string;
  onChange?: (input: any) => void;
  formik?: any;
  textarea?: boolean;
  numberInput?: boolean;
  minNumber?: number;
  maxNumber?: number;
}) => {
  const {
    name,
    inputClassName,
    label,
    placeholder,
    description,
    onChange,
    formik,
    textarea,
    numberInput,
    minNumber,
    maxNumber,
  } = props;
  return (
    <div className="form-input">
      <div className="field">
        {label && (
          <label className="text text__label" htmlFor={label}>
            {label}
          </label>
        )}
        {(() => {
          switch (true) {
            case numberInput:
              return (
                <InputNumber
                  id={label}
                  className={`${inputClassName || ""} form-input-tag  ${
                    formik?.touched[name] && formik?.errors[name]
                      ? "p-invalid"
                      : ""
                  }`}
                  mode="decimal"
                  value={formik?.values[name]}
                  onValueChange={(e: any) =>
                    formik.setFieldValue(name, e.value)
                  }
                  showButtons={true}
                  placeholder={placeholder}
                  min={minNumber || 0}
                  max={maxNumber}
                />
              );
            case textarea:
              return (
                <InputTextarea
                  id={label}
                  name={name}
                  value={formik?.values[name]}
                  className={`${inputClassName || ""} form-input-tag  ${
                    formik?.touched[name] && formik?.errors[name]
                      ? "p-invalid"
                      : ""
                  }`}
                  placeholder={placeholder}
                  onChange={onChange}
                  rows={10}
                />
              );

            default:
              return (
                <InputText
                  id={label}
                  name={name}
                  value={formik?.values[name]}
                  className={`${inputClassName || ""} form-input-tag  ${
                    formik?.touched[name] && formik?.errors[name]
                      ? "p-invalid"
                      : ""
                  }`}
                  placeholder={placeholder}
                  onChange={onChange}
                />
              );
          }
        })()}

        {formik?.touched[name] && formik?.errors[name] && (
          <small id="email-help" className="p-error block">
            {formik?.errors[name]}
          </small>
        )}
        {description && (
          <small className="text text__desc">{description}</small>
        )}
      </div>
    </div>
  );
};

export default TourEnquiryCard;

{
  /* <CheckBoxOption
        id="exploring-other-destinations"
        className="enquiry-checkboxes"
        title="Exploring other destinations too"
        state={enquiryForm.values.exploringOtherDestinations}
        onCheck={() => {
          enquiryForm.setFieldValue(
            "exploringOtherDestinations",
            !enquiryForm.values.exploringOtherDestinations
          );
        }}
      /> */
}

{
  /* <div className="date-of-travel-wrapper">
        <div className="text">Date Of Travel (Choose any)</div>
        <div className="buttons">
          <button
            className={`btn btn__md btn__greyed ${
              enquiryForm.values.date_of_travel === DOTFixed
                ? "btn__greyed__active"
                : ""
            }`}
            onClick={() => handleFormChange("date_of_travel", DOTFixed)}
          >
            Fixed
          </button>
          <button
            className={`btn btn__md btn__greyed ${
              enquiryForm.values.date_of_travel === DOTNotFixed
                ? "btn__greyed__active"
                : ""
            }`}
            onClick={() => handleFormChange("date_of_travel", DOTNotFixed)}
          >
            Not Sure
          </button>
        </div>
      </div> */
}

{
  /* <CheckBoxOption
        id="whatsapp-subscription-check"
        className="enquiry-checkboxes"
        title="Keep me posted on exciting deals."
        state={enquiryForm.values.whatsAppSubscribed}
        onCheck={() => {
          enquiryForm.setFieldValue(
            "whatsAppSubscribed",
            !enquiryForm.values.whatsAppSubscribed
          );
        }}
      /> */
}
