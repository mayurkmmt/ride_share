import React from "react";
import TextInput from "../components/input/TextInput";
import { AtSign, Phone, RectangleEllipsis } from "lucide-react";
import { useNavigate } from "react-router";
import { enqueueSnackbar } from "notistack";
import TextLogo from "../components/common/TextLogo";
import {
  FINAL_STEP,
  INITIAL_STEP,
  LoginSteps,
  MIN_STEP_FOR_BACK,
} from "../helper/constants/Login";
import { emailRegex, onlyDigitRegex } from "../utils/regex";
import BackArrowBtn from "../components/common/BackArrowBtn";

const Login = () => {
  const navigate = useNavigate();

  const [loginStep, setLoginStep] = React.useState(0);
  const [formData, setFormData] = React.useState({
    phone_num: "",
    otp: "",
    first_name: "",
    last_name: "",
    email: "",
  });

  const renderStep = () => {
    switch (loginStep) {
      case LoginSteps.NUMBER:
        return (
          <>
            <h1 className="text-2xl font-bold">Welcome aboard (or back)</h1>
            <small>To sign up or log in, enter your number.</small>
            <TextInput
              label={
                <>
                  <Phone size={16} className="mr-2 text-theme" /> Phone Number
                </>
              }
              name="phone_num"
              placeholder="Enter mobile phone number"
              value={formData["phone_num"]}
              handleChange={(e) =>
                setFormData({ ...formData, phone_num: e.target.value })
              }
            />
          </>
        );
      case LoginSteps.OTP:
        return (
          <>
            <h1 className="text-2xl font-bold">
              Check your texts for the super-secret code
            </h1>
            <small>To confirm your number, enter the code.</small>
            <TextInput
              label={
                <>
                  <RectangleEllipsis size={16} className="mr-2 text-theme" />{" "}
                  OTP
                </>
              }
              name="otp"
              maxLength={4}
              placeholder="4-digit code"
              value={formData["otp"]}
              handleChange={(e) =>
                setFormData({
                  ...formData,
                  otp: e.target.value,
                })
              }
            />
          </>
        );
      case LoginSteps.NAME:
        return (
          <>
            <h1 className="text-2xl font-bold">Btw, what's your name?</h1>
            <small>
              Drivers will only see your first name, because we like to keep
              things casual.
            </small>
            <div className="flex flex-col gap-4">
              <TextInput
                label={"First Name"}
                name="first_name"
                placeholder="Enter your first name"
                value={formData["first_name"]}
                handleChange={(e) =>
                  setFormData({ ...formData, first_name: e.target.value })
                }
              />
              <TextInput
                label={"Last Name"}
                name="last_name"
                placeholder="Enter your last name"
                value={formData["last_name"]}
                handleChange={(e) =>
                  setFormData({ ...formData, last_name: e.target.value })
                }
              />
            </div>
          </>
        );
      case LoginSteps.EMAIL:
        return (
          <>
            <h1 className="text-2xl font-bold">
              {formData.first_name
                ? `Great to meet you, ${formData.first_name}`
                : "Great to meet you"}
              .<p className="text-2xl font-bold">Mind sharing your email?</p>
            </h1>
            <small>
              Ride receipts and account updates need to get sent somewhere.
            </small>
            <div>
              <TextInput
                label={
                  <>
                    <AtSign size={16} className="mr-2 text-theme" /> Email
                  </>
                }
                name="email"
                placeholder="Enter your email address"
                value={formData["email"]}
                handleChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const handleBack = () => {
    if (loginStep === INITIAL_STEP) navigate("/");
    else setLoginStep(loginStep - 1);
  };

  const handleLoginSubmit = () => {
    if (formData.phone_num.length === 10 && loginStep === INITIAL_STEP) {
      if (onlyDigitRegex.test(formData.phone_num)) {
        enqueueSnackbar("Otp sent successfully!!", { variant: "success" });
      } else {
        enqueueSnackbar("Invalid Number!", { variant: "error" });
        return;
      }
    } else if (
      !onlyDigitRegex.test(formData.otp) &&
      loginStep === LoginSteps.OTP
    ) {
      enqueueSnackbar("Only digits are valid as OTP!!", {
        variant: "error",
        preventDuplicate: true,
      });
      return;
    } else if (!formData.first_name && loginStep === LoginSteps.NAME) {
      enqueueSnackbar("First name is required!!", { variant: "error" });
      return;
    } else if (formData.email && loginStep === LoginSteps.EMAIL) {
      if (emailRegex.test(formData.email)) {
        localStorage.setItem("userData", JSON.stringify(formData));
        navigate("/dashboard");
        enqueueSnackbar("Successfully validated!!", { variant: "success" });
        return;
      } else {
        enqueueSnackbar("Invalid email!", { variant: "error" });
        return;
      }
    }
    setLoginStep(loginStep + 1);
  };

  return (
    <div className="relative space-y-8 p-8">
      <BackArrowBtn handleBack={handleBack} />

      <TextLogo />

      {renderStep()}
      <div className="flex flex-col items-center space-y-4">
        <button
          disabled={
            (loginStep === MIN_STEP_FOR_BACK &&
              String(formData.otp).length !== 4) ||
            formData.phone_num.length !== 10 ||
            (loginStep === FINAL_STEP && !formData.email)
          }
          className="disabled:bg-gray-400 bg-theme/80 hover:bg-theme rounded-full p-2 px-12 text-white text-xl font-semibold"
          onClick={handleLoginSubmit}
        >
          {loginStep === INITIAL_STEP ? "Continue with Phone" : "Next"}
        </button>
        {/* <p className="text-xl font-semibold text-gray-600">OR</p>
        <button className="bg-black/80 hover:bg-black rounded-full p-2 px-12 text-white">
          Continue with Email
        </button> */}
      </div>
    </div>
  );
};

export default Login;
