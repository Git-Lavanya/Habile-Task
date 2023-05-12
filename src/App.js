import { ControlBox } from "./components/control_box";
import "./App.css";
import { useState } from "react";

function App() {
  const [stepValue, setStepValue] = useState(0);
  const [file, setFile] = useState("");
  const model = [
    {
      containerType: "xbox",
      fields: [
        {
          label: "Property Name",
          placeholer: "Property Name",
          type: "textbox",
        },
        {
          label: "Property Type",
          placeholder: "Property Type",
          type: "dropdown",
          options: [
            { name: "ownhouse", value: "Own House" },
            { name: "rented", value: "Rented" },
          ],
          optionValue: "value",
          optionDesc: "name",
        },
        {
          label: "Number of Units",
          placeholder: "Number of Units",
          type: "dropdown",
          options: [
            { name: "ownhouse", value: "Own House" },
            { name: "rented", value: "Rented" },
          ],
          optionValue: "value",
          optionDesc: "name",
        },
      ],
    },
    {
      containerType: "vbox",
      fields: [
        {
          placeholder: "Enter Borrower Name",
          label: "Property Address",
          type: "textarea",
        },
        {
          label: "File Attachment",
          type: "fileupload",
          handleFileUpload: (file) => setFile(file),
          value: file,
        },
      ],
    },
  ];
  return (
    <div className="app-container">
      <div className="page-stepper">
        <ControlBox
          type="stepper"
          steps={[
            "Borrower Company Info",
            "Director Info",
            "Financial Info",
            "Past Performance Details",
            "Document Upload",
          ]}
          activeStep={stepValue}
          label={"Financial Info"}
          handleStep={(val) => setStepValue(val)}
        />
      </div>
      <div className="shadow-box">
        <div className="shadow-body">
          <h2>Borrower Company Info</h2>
          <div className="vbox">
            {model.map(({ containerType, fields }, index) => (
              <div className={containerType} key={index}>
                {fields.map((props, ind) => (
                  <ControlBox {...props} key={ind} />
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="button-footer">
          <ControlBox
            type="button"
            color="dark"
            variant="outlined"
            text="Back"
            onClick={() => stepValue && setStepValue((val) => val - 1)}
          />
          <ControlBox
            type="button"
            color="primary"
            variant="contained"
            text="Continue"
            onClick={() => stepValue !== 4 && setStepValue((val) => val + 1)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
