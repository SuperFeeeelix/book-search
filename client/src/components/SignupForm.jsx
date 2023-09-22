//Here, we import the dependencies necessary for "Sign"ing "up" a new user. Importantly, we reference the "ADD_USER" defined in our "mutations" file and code important to "Auth"enticating a new user.
import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

import { useMutation } from "@apollo/client";

import { ADD_USER } from "../utils/mutations";

import Auth from "../utils/auth";

//Here, we set the initial "State" of the "SignupForm" (via the "useState" hook), with empty strings populating the "username", "email" and "password" fields.
const SignupForm = () => {
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  //Here, we declare the "validated" variable and set its initial "State" to "false", meaning that as a default, no validation has been provided.
  const [validated] = useState(false);

  //Here, we again use "State" to provide control over whether or not an error message regarding validation from on our "signupForm" will appear. It begins with a value of "false", meaning it will not show by default.
  const [showAlert, setShowAlert] = useState(false);

  //This function gets called whenever the "event" of a "Change" occurs on the "target" (the "Data" of our "Form"). When the "name" here essentially refers to the "name" of the fields ("username", "email" and "password") and the "value" of those fields (input by the user).
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    
    //The "..." (spread operator) spreads the existing "userFormData" and updates it to the new values input by the user. This is done so that each field is able to reflect the changes to its value, as those changes are being made.
    setUserFormData({ ...userFormData, [name]: value });
  };

  //Here, we enable the modification of data ("add"ing a new "User") through "Apollo's" "useMutation" hook and enable our code to catch an "error", should anything go awry in that process.
  const [addUser, { error }] = useMutation(ADD_USER);

  //"Form"s by "Default" will reload the webpage when the are "Submit"ted, so we "prevent" that behavior here.
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    //Here, we create a reference to our "form" and enable our app to notice the "currentTarget" (in our case, a button) "event" (in our case, a click on that button) that will begin the process of validating user-input data in the 3 fields of our form.
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    //Here, our app will "try" to execute the mutation on the data retrieved through "addUser" (declared above), expecting data in the "variables" listed.
    try {
      const { data } = await addUser({
        variables: {
          username: userFormData.username,
          email: userFormData.email,
          password: userFormData.password,
        },
      });

      if (data && data.addUser) {
        console.log("User data:", data.addUser);
      } else {
        console.log("User data is missing or empty");
      }

      //Here, we extract the "token" and "user" properties from the response data of the "addUser" mutation, expecting that data to match what is also stored in on the server-side. We provide "err"or handling as well.
      const { token, user } = data.addUser;
      Auth.login(token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    //At the end of this process, we reset the "signupForm"'s fields to empty, readying them for any addtional registrations of new users.
    setUserFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  //Here, we render the "React" components for the "signupForm" and provide a few error-handling features.
  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your signup!
        </Alert>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="username">Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your username"
            name="username"
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
          <Form.Control.Feedback type="invalid">
            Username is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Your email address"
            name="email"
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type="invalid">
            Email is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Your password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type="invalid">
            Password is required!
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={
            !(
              userFormData.username &&
              userFormData.email &&
              userFormData.password
            )
          }
          type="submit"
          variant="success"
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

//The above exports from here to be utilized in the "Navbar" component.
export default SignupForm;