import React from 'react';
import {Formik} from 'formik';
import { Form, Row, Col, ButtonGroup, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { Note } from '../../Models/Note';
import CodeBlock from "../../../Common/CodeBlock";

import './NoteForm.scss';

interface IProps {
    handleSave: (values:any) => void,
    handleCancel: () => void,
    data?:Note
};

export const NoteForm: React.FC<IProps> = (props) => {

    const Markdown = require('react-markdown')

    const noteSchema = Yup.object().shape({
        title: Yup.string()
          .max(100, 'Too Long!')
          .required('Required'),
        body: Yup.string()
          .required('Required'),
      });

    return (
        <Formik
            enableReinitialize={true} 
            initialValues={{
                title: props.data?.title,
                body: props.data?.body,
            }}
            validationSchema={noteSchema}
            onSubmit={props.handleSave}
        >
        {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
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
                                renderers={{ code: CodeBlock }}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <ButtonGroup>
                    <Button variant="secondary" onClick={props.handleCancel}>
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