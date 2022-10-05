import collection from "@/utils/collection";
import { useFormik } from "formik";
import { uniqWith } from "lodash";
import moment from "moment";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import React from "react";
import { getCountries, getCountryCallingCode } from "react-phone-number-input";

interface EnquiryFormProps {
  collectionSlug: string,
  onSubmitForm(): void,
}
function EnquiryForm(props: EnquiryFormProps) {
  const allCountries: any[] = uniqWith(
    getCountries(),
    (country1: any, country2: any) => {
      return getCountryCallingCode(country1) == getCountryCallingCode(country2);
    }
  );  

  const phoneCodes = allCountries.map((country: any) => ({
    code: `+${getCountryCallingCode(country)}`,
  }));
  const customerDetails = {
    name: "",
    email: "",
    phoneCountryCode: "+91",
    phoneNumber: null,
    date_of_travel: "",
    no_of_people: "",
  };
  const formik = useFormik({
    initialValues: customerDetails,
    validate: (data) => {
      console.log(!data.email)
      const errors: {
        name?: string;
        email?: string;
        phoneCountryCode?: string,
        phoneNumber?: string,
        date_of_travel?: string,
        no_of_people?: string,
      } = {};
      if (!data.name) {
        errors.name = "Name is required.";
      }
      if (!data.email) {
        errors.email = "Email is required.";
      }
      if (!data.phoneNumber) {
        errors.phoneNumber = "Phone Number is required.";
      }
      if (!data.date_of_travel) {
        errors.date_of_travel = "Date of Travel is required.";
      }
      if (!data.no_of_people) {
        errors.no_of_people = "No of Passengers is required.";
      }
      console.log(errors);
      return errors;
    },
    onSubmit: (values) => {
      let params = {
        enquirer_name: values.name,
        enquirer_email: values.email,
        enquirer_phone_country_code: values.phoneCountryCode,
        enquirer_phone: values.phoneCountryCode,
        date_of_travel: moment(values.date_of_travel).format('YYYY-MM-DD'),
        number_of_pax: values.no_of_people,
        page_url: `thrillophilia.com/collections/${props.collectionSlug}`,
        origin_source: 'thrillophilia_website',
        page_source: 'collection_page',
        section_source: 'sidebar_enquiry_form'
      }
      collection.sendEnquiry(params).then(() => {
        props.onSubmitForm();
      });
    },
  });
  return (
    <div className="form-col">
      <form
        className="new_lead_form_enquiry"
        id="landing-page-lead-form"
        onSubmit={formik.handleSubmit}
      >
        <div className="customer-details-form-group">
          <div className="form-item">
            <InputText
              value={formik.values.name}
              placeholder="Your Name"
              id="name"
              name="name"
              onChange={(e) => {
                formik.setFieldValue("name", e.target.value);
              }}
              className={
                formik.touched.name && formik.errors.name ? "p-invalid" : ""
              }
            />
            {formik.touched.name && formik.errors.name && (
              <small id="firstName-help" className="p-error block">
                {formik.errors.name}
              </small>
            )}
          </div>
          <div className="form-item">
            <InputText
              value={formik.values.email}
              placeholder="Your Email"
              id="email"
              name="email"
              onChange={(e) => {
                formik.setFieldValue("email", e.target.value);
              }}
              className={
                formik.touched.name && formik.errors.name ? "p-invalid" : ""
              }
            />
            {formik.touched.email && formik.errors.email && (
              <small id="firstName-help" className="p-error block">
                {formik.errors.email}
              </small>
            )}
          </div>
          <div className="form-item">
            <div className="form-item-sub-parts">
              <Dropdown
                name="phoneCountryCode"
                id="phoneCountryCode"
                value={{ code: formik.values.phoneCountryCode }}
                options={phoneCodes}
                onChange={(e) => {
                  formik.setFieldValue("phoneCountryCode", e.value.code);
                }}
                optionLabel="code"
                filter
                className={`form-item-sub-parts-dropdown ${
                  formik.touched.phoneCountryCode &&
                  formik.errors.phoneCountryCode
                    ? "p-invalid"
                    : ""
                }`}
              />
              <InputNumber
                inputId="phoneNumber"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formik.values.phoneNumber}
                onChange={(e) => {
                  formik.setFieldValue("phoneNumber", e.value);
                }}
                useGrouping={false}
                className={`form-item-sub-parts-input ${
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                    ? "p-invalid"
                    : ""
                }`}
              />
            </div>
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <small id="phoneNumber-help" className="p-error block'">
                {formik.errors.phoneNumber}
              </small>
            )}
          </div>

          <div className="form-item">
            <Calendar
              placeholder="Date of Travel"
              name="date_of_travel"
              inputId="date_of_travel"
              onChange={(e) => {
                formik.setFieldValue("date_of_travel", e.target.value);
              }}
              className={
                formik.touched.date_of_travel && formik.errors.date_of_travel
                  ? "p-invalid"
                  : ""
              }
            ></Calendar>
            {formik.touched.date_of_travel && formik.errors.date_of_travel && (
              <small id="firstName-help" className="p-error block">
                {formik.errors.date_of_travel}
              </small>
            )}
          </div>
          <div className="form-item">
            <InputNumber
              placeholder="No of People"
              step={1}
              min={1}
              id="no_of_people"
              name="no_of_people"
              onChange={(e) => {
                formik.setFieldValue("no_of_people", e.value);
              }}
              className={
                formik.touched.no_of_people && formik.errors.no_of_people
                  ? "p-invalid"
                  : ""
              }
            />
            {formik.touched.no_of_people && formik.errors.no_of_people && (
              <small id="no_of_people-help" className="p-error block'">
                {formik.errors.no_of_people}
              </small>
            )}
          </div>
          <div className="form-item">
            <InputTextarea  placeholder="Message"  />
          </div>
          <div className="submit-holder">
            <button type="submit" className="btn btn-submit">
              SEND ME DETAILS
            </button>
          </div>
          <ul className="form-list">
            <li>
              We assure the privacy of your contact data. This data will only be
              used by our team to contact you and no other purposes.
            </li>
          </ul>
        </div>
      </form>
    </div>
  );
}

export default EnquiryForm;
