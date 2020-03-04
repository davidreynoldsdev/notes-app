import React from 'react';
import { useHistory } from "react-router-dom";
import {Formik} from 'formik';
import { Form, Row, Col, ButtonGroup, Button } from 'react-bootstrap';
import * as Yup from 'yup';

import './NoteForm.scss';

export const NoteForm: React.FC = () => {

     const Markdown = require('react-markdown')
     const history = useHistory();

    const handleCancel = (e:any) => {
        history.push("/");
    }

    const SignupSchema = Yup.object().shape({
        title: Yup.string()
          .min(5, 'Too Short!')
          .max(100, 'Too Long!')
          .required('Required'),
        body: Yup.string()
          .required('Required'),
      });

    return (
        <Formik
        initialValues={{
          title: '',
          body: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={values => {
            fetch('https://localhost:44375/notes', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values, null, 2)
            }).then(function() {
                history.push("/");
            });
        }}
      >
        {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            isValid,
            errors,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        onChange={handleChange}
                        value={values.title}
                        onBlur={handleBlur}
                        isValid={touched.title && !errors.title}
                        isInvalid={touched.title && !!errors.title}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                        {errors.title}
                    </Form.Control.Feedback>
                </Form.Group>

                <Row>
                    <Col>
                        <Form.Group controlId="body">
                            <Form.Label>Body</Form.Label>
                            <Form.Control 
                                as="textarea"
                                rows="20"
                                onChange={handleChange}
                                value={values.body}
                                onBlur={handleBlur}
                                isValid={touched.body && !errors.body}
                                isInvalid={touched.body && !!errors.body}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                {errors.body}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Preview</Form.Label>
                            <Markdown
                                className="pl-2 pr-2 markdown"
                                source={values.body}
                                escapeHtml
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <ButtonGroup>
                    <Button variant="secondary" onClick={handleCancel}>
                        Cancel
                    </Button>
                    
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </ButtonGroup>
          </Form>
        )}
      </Formik>
    );
};