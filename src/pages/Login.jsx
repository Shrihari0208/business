// src/pages/Login.js
import React from "react";
import { Formik, Form } from "formik";
import { loginValidationSchema } from "../utils/ValidationSchema";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { Link } from "react-router-dom";

const Login = () => {
  const handleSubmit = (values) => {
    console.log("Login data:", values);
    // Add your login logic here (e.g., API call)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Login
        </h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginValidationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-6">
              <InputField label="Email Address" name="email" type="email" />
              <InputField label="Password" name="password" type="password" />
              <Button type="submit" className="w-full">
                Login
              </Button>
              <div className="mt-6">
                <div className="flex items-center justify-center">
                  <div className="w-full border-t border-gray-300"></div>
                  <span className="px-4 text-gray-500">or</span>
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="space-y-2 mt-4">
                  <Button className="flex items-center justify-center bg-gray-300 text-black hover:bg-gray-200">
                    Continue with Google
                  </Button>
                  <Button className="flex items-center justify-center bg-gray-300 text-black hover:bg-gray-200">
                    Continue with Facebook
                  </Button>
                  <Button className="flex items-center justify-center bg-gray-300 text-black hover:bg-gray-400">
                    Continue with Microsoft
                  </Button>
                </div>
                <div className="mt-4 text-center">
                  <span className="text-gray-600">Don't have an account? </span>
                  <Link
                    to="/register"
                    className="text-blue-500 hover:underline"
                  >
                    Register
                  </Link>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
