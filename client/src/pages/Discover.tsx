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

const Discover = () => {
  const { data } = useQuery(QUERY_ALL_GROUPS);
  const groupData: [] = data?.allGroups;
  console.log(groupData);

  const [createGroup] = useMutation(CREATE_GROUP);
  const [newGroupData, setNewGroupData] = useState({
    name: "",
    is_private: false,
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
    } catch (err) {
      console.error(err);
    }
  };

  // const handleJoinGroup = async (event: any) => {
  // }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Create Group
      </Button>

      <Modal show={show} onHide={handleClose}>
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
            <Col>{group.name}
            <Button variant="primary">Join</Button>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Discover;
