import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { QUERY_ME } from "../utils/queries";
// import { QUERY_GROUPS_BY_IDS } from '../utils/queries';
import { EDIT_USER_BIO } from "../utils/mutations";
import { Group } from "../models/Group";

function Profile() {
  const router = useNavigate();

  const { loading, data, refetch } = useQuery(QUERY_ME);
  const userData = data?.me;
  console.log("UserData From Profile", data?.me);

  const [editUserBio] = useMutation(EDIT_USER_BIO);
  const [bio, setBio] = useState("");
  const [editShow, setEditShow] = useState(false);
  const handleEditClose = () => setEditShow(false);
  const handleEditShow = () => setEditShow(true);

  const handleRefresh = async () => {
    refetch;
  };

  const handleEditBio = async () => {
    try {
      await editUserBio({
        variables: { newBio: bio },
      });
    } catch (err) {
      console.error(err);
    }
    console.log('Bio Updated: ', bio);
    handleEditClose();
    handleRefresh();
  };

  const handleEditInputChange = (event: any) => {
    const { value } = event.target;
    setBio(value);
  };

  if (loading) return <p>Loading...</p>;

  const viewGroupPage = (group: any) => {
    router(`/clubs/${group.name}`);
  };

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{userData.username}</Card.Title>
        <Card.Text>
        <p>Bio: {userData?.bio} <a onClick={handleEditShow}>Edit</a></p>
        </Card.Text>
      </Card.Body>
      {data.me.adminGroups?.length > 0 ? (
        <ListGroup className="list-group-flush">
          <h3>Clubs I admin</h3>
          {data.me.adminGroups?.map((group: Group) => (
            <div key={group._id}>
              <ListGroup.Item>
                {group.name}
                <Button onClick={() => viewGroupPage(group)}>View</Button>
              </ListGroup.Item>
            </div>
          ))}
        </ListGroup>
      ) : null}
      ;
      {data.me.groups?.length > 0 ? (
        <ListGroup className="list-group-flush">
          <h3>Clubs I'm in</h3>
          {data.me.groups?.map((group: Group) => (
            <div key={group._id}>
              <ListGroup.Item>
                {group.name}
                <Button onClick={() => viewGroupPage(group)}>View</Button>
              </ListGroup.Item>
            </div>
          ))}
        </ListGroup>
      ) : null}
      ;
      <Card.Body>
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body>
      <Modal show={editShow} onHide={handleEditClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Bio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditBio}>
            <Form.Group controlId="formBasicBio">
              <Form.Label>Bio</Form.Label>
              <Form.Control type="text" placeholder="Enter bio" onChange={handleEditInputChange}/>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Card>
  );
}

export default Profile;
