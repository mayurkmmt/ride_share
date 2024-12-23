enum LoginSteps {
  NUMBER = 0,
  OTP = 1,
  NAME = 2,
  EMAIL = 3,
}

// Constants
const INITIAL_STEP = LoginSteps.NUMBER;
const MIN_STEP_FOR_BACK = LoginSteps.OTP;
const FINAL_STEP = LoginSteps.EMAIL;

export { LoginSteps, INITIAL_STEP, FINAL_STEP, MIN_STEP_FOR_BACK };
