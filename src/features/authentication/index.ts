// Hooks
export { useSignup } from "./hooks/useSignup";

// Services
export { authService } from "./services/authService";

// Types
export type {
   SignupFormData,
   SignupFormErrors,
   LoginFormData,
   LoginFormErrors,
   User,
   AuthResponse,
} from "./types";

// Data
export { medicalSpecialties } from "./data/specialtyData";
export type { MedicalSpecialty } from "./data/specialtyData";

// Utils
export {
   validateEmail,
   validatePassword,
   validatePasswordStrength,
   validateSignupForm,
   validateLoginForm,
} from "./utils/validation";
