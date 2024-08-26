import { signupSchema } from "@eulerbutcooler/proj-common";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import eyeopen from '../assets/eye-open.svg' 
import eyeshut from '../assets/eye-shut.svg';
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const [postInputs, setPostInputs] = useState<signupSchema>({
    username: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPostInputs(prev => ({ ...prev, [name]: value }));
  };

  const Navigate = useNavigate();

  async function sendRequest(){
    try{
      const response = await axios.post(`${BACKEND_URL}user/${type == 'signup' ? 'signup' : 'signin'}`, postInputs)
      const jwt = response.data
      localStorage.setItem("token", jwt)
      Navigate(`/blog/all`)
    }catch(e){

    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-a_blue to-a_gray p-4 sm:p-0">
      <div className="bg-a_beige flex flex-col pt-8 sm:pt-10 px-6 sm:px-10 pb-10 sm:pb-14 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2 text-gray-800">Create an account</h1>
        <p className="text-a_blue text-sm sm:text-md text-center mb-2">
          {type === 'signup' ? 'Already have an account?' : "Don't have an account?"}
          <Link className="underline ml-1 hover:text-blue-600 transition duration-300" to={type === 'signup' ? '/signin' : '/signup'}>
            {type === 'signup' ? 'Sign in' : 'Sign up'}
          </Link>
        </p>
        <form className="text-base sm:text-lg">
          <LabelledInput
            label="Username"
            name="username"
            type="text"
            placeholder="👤"
            onChange={handleInputChange}
          />
          {type === 'signup' && (
            <div>
              <LabelledInput
                label="Email"
                name="email"
                type="email"
                placeholder="📧"
                onChange={handleInputChange}
              />
            </div>
          )}
          <div className="relative">
            <LabelledInput
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="🔑"
              onChange={handleInputChange}
            />
            <button
              type="button"
              className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              <img src={showPassword ? eyeopen : eyeshut} alt="Toggle password visibility" className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={sendRequest}
            type="button"
            className="w-full mt-8 sm:mt-12 bg-a_blue text-white py-2 rounded-lg hover:bg-blue-500 transition duration-300">
            {type === 'signup' ? 'Sign up' : 'Sign in' }
          </button>
        </form>
      </div>
    </div>
  );
};
interface LabelledInputProps {
  label: string;
  name: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type: string;
}

function LabelledInput({
  label,
  name,
  onChange,
  placeholder,
  type,
}: LabelledInputProps) {
  return (
    <div className="mt-4">
      <label htmlFor={name} className="block mb-1 text-sm sm:text-md font-medium text-gray-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        onChange={onChange}
        type={type}
        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm sm:text-md 
                   focus:outline-none focus:ring-2 focus:ring-a_blue focus:border-transparent
                   placeholder-gray-400 text-gray-900"
        placeholder={placeholder}
        required
      />
    </div>
  );
}