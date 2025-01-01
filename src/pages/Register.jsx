// src/pages/Register.js
import React from "react";
import { Formik, Form } from "formik";
import { registerValidationSchema } from "../utils/ValidationSchema";
import InputField from "../components/InputField";
import Button from "../components/Button";

const Register = () => {
  const handleSubmit = (values) => {
    console.log("Register data:", values);
    // Add your registration logic here (e.g., API call)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4 text-center">Register</h1>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={registerValidationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-4">
              <InputField label="Name" name="name" type="text" />
              <InputField label="Email Address" name="email" type="email" />
              <InputField label="Password" name="password" type="password" />
              <InputField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
              />
              <Button type="submit">Register</Button>
              <div className="mt-6">
                <div className="flex items-center justify-center">
                  <div className="w-full border-t border-gray-300"></div>
                  <span className="px-4 text-gray-500">or</span>
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="space-y-2 mt-4">
                  <Button className="flex items-center justify-center bg-gray-300 text-black hover:bg-gray-200">
                    <span className="mr-2">{/* Add Facebook Icon here */}</span>
                    <p className="text-black"> Continue with Google</p>
                  </Button>
                  <Button className="flex items-center justify-center bg-gray-300 text-black hover:bg-gray-200">
                    <span className="mr-2">{/* Add Facebook Icon here */}</span>
                    <p className="text-black"> Continue with Facebook</p>
                  </Button>
                  <Button className="flex items-center justify-center bg-gray-300 text-black hover:bg-gray-400">
                    <span className="mr-2 text-black">
                      {/* Add Microsoft Icon here */}
                    </span>
                    <p className="text-black"> Continue with Microsoft</p>
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
