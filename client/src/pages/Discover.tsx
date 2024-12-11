import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { QUERY_ALL_GROUPS } from "../utils/queries";
import { CREATE_GROUP } from "../utils/mutations";
import BookSearch from "../components/bookSearch";
import { Book } from "../models/Book";

const Discover = () => {
  const { data } = useQuery(QUERY_ALL_GROUPS);
  const groupData: [] = data?.allGroups;
  console.log(groupData);

  const [createGroup] = useMutation(CREATE_GROUP);
  const [newGroupData, setNewGroupData] = useState({
    name: "",
    is_private: false,
    currentBook: {},
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setNewGroupData({ ...newGroupData, [name]: value });
  };

  const handleCheckboxChange = (event: any) => {
    const { name, checked } = event.target;
    setNewGroupData({ ...newGroupData, [name]: checked });
  };

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();
    console.log(newGroupData);
    try {
      const { data } = await createGroup({
        variables: { input: newGroupData },
      });
      console.log(data);
      handleClose();
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const handleViewButton = (group: any) => {
    window.location.replace('/' + group.name);
  }

  const handleChildData = (data: Book): void => {
    const newCurrentBook = data;
    console.log('DISCOVER CHILD DATA:', newCurrentBook);
    setNewGroupData({ ...newGroupData, currentBook: newCurrentBook });
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Create Group
      </Button>

      <Modal show={show} onHide={handleClose} size={'xl'}>
        <Modal.Header closeButton>
          <Modal.Title>Create Your Own Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Group Name</Form.Label>
              <Form.Control
                name="name"
                type="text"
                placeholder="My Group"
                autoFocus
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Check>
              <Form.Check.Input
                type="checkbox"
                name="is_private"
                onChange={handleCheckboxChange}
              />
              <Form.Check.Label>Private Group</Form.Check.Label>
            </Form.Check>
            <BookSearch onDataChange={handleChildData}/>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleFormSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Container>
        <h1>Groups</h1>
        <Row>
          {!groupData && <h2>No groups yet</h2>}
          {groupData?.map((group: any) => (
            <Col key={group._id}>{group.name}
            <Button variant="primary"
            onClick={() => handleViewButton(group)}>View</Button>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Discover;
