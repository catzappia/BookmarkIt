import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
//import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
//import Col from "react-bootstrap/Col";
import ClubCard from "../components/club-card";

import { QUERY_ALL_GROUPS } from "../utils/queries";
import { CREATE_GROUP } from "../utils/mutations";
import BookSearch from "../components/bookSearch";
import { Book } from "../models/Book";
import '../styles/discover.css'

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

  //const handleViewButton = (group: any) => {
  //  window.location.replace('/' + group.name);
 // }

  const handleChildData = (data: Book): void => {
    const newCurrentBook = data;
    console.log('DISCOVER CHILD DATA:', newCurrentBook);
    setNewGroupData({ ...newGroupData, currentBook: newCurrentBook });
  }

  function handleViewGroup(group: any): void {
    window.location.href = `/${group.name}`;
  }
  return (
    <>
      <div className="discover-main">
    {/* Header */}
    <div className="discover-container">
    <div className="discover-header">
      <h1>The Book Club Omnibus</h1>
    </div>
      <p className="discover-description">
        Not seeing anything you like? Try creating your own!</p>
      <Button className="create-group-button" onClick={handleShow}>
        Create a Club
        </Button>
      <Modal show={show} onHide={handleClose} size={'xl'} className="modal-content">
        <Modal.Header closeButton>
          <Modal.Title>Create Your Own Club</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
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
            <Form.Check>
              <Form.Check.Input
                type="checkbox"
                name="is_private"
                onChange={handleCheckboxChange}
              />
              <Form.Check.Label className="form-check-label">Is this a private club?</Form.Check.Label>
            </Form.Check>
            <BookSearch onDataChange={handleChildData}/>
          </Form>
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
            onView={() => handleViewGroup(group)}
          />
          ))}
        </Row>
      </div>
    </div>
    </div>
    </>
  );
};

export default Discover;
