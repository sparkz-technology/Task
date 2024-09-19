import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { createUser, updateUser } from "../redux/Slices/UserListSlice";
import InputComponent from "./Input";
import ButtonComponent from "./Button";

const schema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

const UserForm = ({ userDetails, handleClose }) => {
  const isCreate = userDetails?.id ? false : true;
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    console.log(values);
    if (isCreate) {
      dispatch(createUser(values));
      handleClose();
    } else {
      dispatch(updateUser(values));
      handleClose();
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md p-6 rounded-lg">
      <Formik
        initialValues={{
          id: userDetails?.id ?? crypto.randomUUID(),
          name: userDetails?.name ?? "",
          email: userDetails?.email ?? "",
        }}
        validationSchema={schema}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ errors, touched, handleChange, values }) => (
          <Form className="space-y-6">
            <h1 className="text-2xl font-semibold mb-4 text-center">
              {isCreate ? "Create User" : `Update User - ${userDetails?.name}`}
            </h1>

            <div>
              <InputComponent
                name="name"
                value={values?.name}
                handleOnchage={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.name && touched.name ? (
                <div className="text-red-500 text-sm">{errors.name}</div>
              ) : null}
            </div>

            <div>
              <InputComponent
                name="email"
                handleOnchage={handleChange}
                type="email"
                value={values?.email}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.email && touched.email ? (
                <div className="text-red-500 text-sm">{errors.email}</div>
              ) : null}
            </div>

            <ButtonComponent
              label={isCreate ? "Create" : "Update"}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition duration-300"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserForm;
