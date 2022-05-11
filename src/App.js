import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import "./App.css";

const formValidationSchema = yup.object({
  mail: yup
    .string()
    .min(5, "Enter valid email")
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Pattern not matched")
    .required("Required"),
  name: yup.string().min(3, "Minimum 3 characters").required("Required"),
  mobile: yup.number().min(5, "Enter valid mobile number").required("Required"),
  comment: yup
    .string()
    .min(15, "Enter minimum 15 characters")
    .max(100, "Maximum 100 characters")
    .required("Required"),
});

//

function App() {
  const { handleBlur, handleChange, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: { name: "", mobile: "", mail: "", comment: "" },
      validationSchema: formValidationSchema,
      onSubmit: (values, { resetForm }) => {
        console.log("OnSubmit", values);
        const datas = {
          Name: values.name,
          Mobile: values.mobile,
          Mail_id: values.mail,
          Comments: values.comment,
        };
        axios.post(
          "https://sheet.best/api/sheets/754ea3ea-5e03-433f-938c-e1b0fd9a14de",
          datas
        );
        axios.post("https://mimedia-form.herokuapp.com/form", datas);
        resetForm();
      },
    });

  return (
    <form onSubmit={handleSubmit}>
      <div className="App">
        <div className="form-container">
          <div className="topborder"></div>
          <h2 className="heading">Feedback Form</h2>
          <div className="form-body">
            <h3>Name :</h3>
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
            {touched.name && errors.name ? errors.name : ""}
            <h3>Mobile No. :</h3>
            <TextField
              id="mobile"
              label="Mobile no."
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.mobile}
            />
            {touched.mobile && errors.mobile ? errors.mobile : ""}
            <h3>E-Mail ID :</h3>
            <TextField
              id="mail"
              label="Mail id"
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.mail}
            />
            {touched.mail && errors.mail ? errors.mail : ""}
            <h3>Comments :</h3>
            <TextareaAutosize
              id="comment"
              aria-label="minimum height"
              minRows={6}
              placeholder="Comments"
              style={{ width: "100%" }}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.comment}
            />
            {touched.comment && errors.comment ? errors.comment : ""}
            <div className="submit-section">
              <button type="submit" className="submit-button">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default App;
