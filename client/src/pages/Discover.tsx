import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";

import ClubCard from "../components/club-card";
import { QUERY_ALL_GROUPS } from "../utils/queries";
import { CREATE_GROUP } from "../utils/mutations";
import "../styles/discover.css";
import { DropdownDivider } from "react-bootstrap";

const Discover = () => {
  const { data, refetch } = useQuery(QUERY_ALL_GROUPS);
  const groupData: [] = data?.allGroups;

  const router = useNavigate();

  const handleRefresh = () => {
    refetch();
  };

  const [createGroup] = useMutation(CREATE_GROUP);

  const [newGroupData, setNewGroupData] = useState({
    name: "",
    description: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

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
      console.log("Submit create group Data", data);
      handleClose();
      handleRefresh();
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message);
    }
  };

  const handleViewButton = (group: any) => {
    router(`/clubs/${group.name}`);
  };

  return (
    <div>
      <div className="discover-main">
        {/* Header */}
        <div className="discover-container">
          <div className="discover-header">
            <h1>The Book Club Omnibus</h1>
          </div>
          <p className="discover-description">
            Not seeing anything you like? Try creating your own!
          </p>
          <Button className="create-group-button" onClick={handleShow}>
            Create a Club
          </Button>
          <Modal
            show={show}
            onHide={handleClose}
            size={"xl"}
            className="modal-content"
          >
            <Modal.Header closeButton>
              <Modal.Title>Create Your Own Club</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Club Name</Form.Label>
                  <Form.Control
                    className="form-control"
                    name="name"
                    type="text"
                    placeholder="My Book Club"
                    autoFocus
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    name="description"
                    type="text"
                    placeholder="Description"
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Form>
              <p>{errorMessage}</p>
            </Modal.Body>
            <Modal.Footer className="modal-footer">
              <Button className="close-button" onClick={handleClose}>
                Close
              </Button>
              <Button className="save-button" onClick={handleFormSubmit}>
                Create Club
              </Button>
            </Modal.Footer>
          </Modal>
          <div className="groups-container">
            <h1>Book Clubs</h1>
            <Row>
              {!groupData && <h2 className="no-groups">No clubs yet</h2>}
              {groupData?.map((group: any) => (
                <ClubCard
                  key={group.id}
                  title={group.name}
                  description={group.description}
                  profilePicture={group.profilePicture}
                  onView={() => handleViewButton(group)}
                />
              ))}
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discover;
