import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

  const router = useNavigate();

  const [createGroup] = useMutation(CREATE_GROUP);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [newGroupData, setNewGroupData] = useState({
    name: "",
    description: "",
    admin: user?.username
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setNewGroupData({ ...newGroupData, [name]: value });
    console.log(newGroupData);
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
    router(`/groups/${group.name}`);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Create Group
      </Button>

      <Modal show={show} onHide={handleClose} size={"xl"}>
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
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                type="text"
                placeholder="Description"
                onChange={handleInputChange}
              />
            </Form.Group>
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
            <Col key={group._id}>
              {group.name}
              <Button variant="primary" onClick={() => handleViewButton(group)}>
                View
              </Button>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Discover;
