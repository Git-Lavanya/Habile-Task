import React from "react";
import "./styles.css";
import FileImg from "../resource/images/file.png";
import { makeStyles } from "@material-ui/core/styles";
import { StepButton, Step, Stepper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  outlinedBtn: ({ color }) => ({
    border: `1px solid ${color}`,
    color: `${color}`,
  }),
  containedBtn: ({ color }) => ({
    backgroundColor: `${color}`,
    color: "white",
  }),
  genericBtn: {
    backgroundColor: "white",
    minWidth: "6rem",
    padding: 10,
    fontSize: 14,
    borderRadius: 4,
    boxShadow: "none",
    border: "none",
    fontFamily: "Avenir",
    cursor: "pointer",
  },
  stepperRoot: {
    padding: 10,
    "& .MuiStepIcon-root.MuiStepIcon-active": {
      color: "#0090ffdb",
    },
    "& .MuiStepLabel-labelContainer .MuiStepLabel-label.MuiStepLabel-active": {
      color: "#0090ffdb",
    },
    "& .MuiStepLabel-label": {
      color: "#000000bd",
    },
    "& .MuiStepIcon-root": {
      color: "#dbdbdb",
    },
  },
  stepRoot: {
    "& .MuiStepConnector-alternativeLabel .MuiStepConnector-lineHorizontal": {
      borderTopStyle: "dotted",
      borderTopWidth: 5,
    },
    "& .MuiStepConnector-active .MuiStepConnector-lineHorizontal": {
      borderColor: "#1976d2",
    },
  },
  mobileViewStep: {
    "& button": {
      display: "none",
    },
  },
}));
export const ControlBox = (props) => {
  const {
    label,
    type,
    options,
    value,
    optionValue = "",
    optionDesc = "",
    placeholder,
    text = "",
    color = "dark",
    variant = "outlined",
    steps = null,
    activeStep = 0,
    handleStep = () => {},
    handleFileUpload = () => {},
  } = props;
  const fileInputRef = React.useRef("");
  const [btnColor, setBtnColor] = React.useState("");
  React.useMemo(() => {
    setBtnColor(color === "primary" ? "#1976d2" : "black");
  }, [color]);

  const classes = useStyles({ color: btnColor });
  if (type === "textbox") {
    return (
      <div className="control-box">
        {label && <label>{label}</label>}
        <input type="text" {...props} />
      </div>
    );
  } else if (type === "textarea") {
    return (
      <div className="control-box">
        {label && <label>{label}</label>}
        <textarea rows="5" cols="50" {...props}></textarea>
      </div>
    );
  } else if (type === "dropdown") {
    return (
      <div className="control-box">
        {label && <label>{label}</label>}
        <select>
          {placeholder && (
            <option disabled defaultValue={!value} value="">
              {placeholder}
            </option>
          )}
          {options?.map((item) => (
            <option key={item[optionValue]} value={item[optionValue]}>
              {item[optionDesc]}
            </option>
          ))}
        </select>
      </div>
    );
  } else if (type === "fileupload") {
    return (
      <div className="control-box" onClick={() => fileInputRef.current.click()}>
        <div className="file-upload-box">
          {value && (
            <>
              <img src={FileImg} alt="upload" className="upload-img" />
              <div className="file-info">{value}</div>
            </>
          )}
          <>
            <span>Browser</span>
            <span>&nbsp;to Attach a file</span>
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => handleFileUpload(e.target.files[0].name)}
              hidden
            />
          </>
        </div>
      </div>
    );
  } else if (type === "button") {
    const styleEntities = {
      contained: "containedBtn",
      outlined: "outlinedBtn",
    };
    return (
      <button
        className={`${classes.genericBtn} ${classes[styleEntities[variant]]}`}
        {...props}
      >
        {text}
      </button>
    );
  } else if (type === "stepper") {
    return (
      <Stepper
        alternativeLabel
        nonLinear
        activeStep={activeStep}
        classes={{ root: classes.stepperRoot }}
      >
        {steps?.map((label, index) => {
          return (
            <Step
              key={label}
              classes={{
                root: classes.stepRoot,
              }}
              className={
                index === activeStep ? "active-stepper" : "inactive-stepper"
              }
            >
              <StepButton onClick={() => handleStep(index)}>{label}</StepButton>
            </Step>
          );
        })}
      </Stepper>
    );
  } else return <></>;
};
