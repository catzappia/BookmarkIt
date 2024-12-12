import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { QUERY_GROUP_BY_NAME } from "../utils/queries";
import DescriptionModal from "../components/Modal-desc";
import "../styles/group.css";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

const Group = () => {
  const [modalShow, setModalShow] = React.useState(false);

    const params = useParams();
    const queryParam = params.groupName;

    const { data, loading, error } = useQuery(QUERY_GROUP_BY_NAME, { variables: { groupName: queryParam }});
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    
    const groupData = data.group;
    console.log('GroupData:', groupData);

    const handleJoinButton = () => {
        console.log('Joining group:', groupData.name);
        window.location.reload();
    }

    const handleRequestButton = () => {
        console.log('Requesting to join group:', groupData.name);
        window.location.reload();
    }

    return (
      <Container>
        <Row>
          <Col>Group Name: {groupData.name}</Col>
          <Col>
            {groupData.admin ? `Created by: ${groupData.admin}` : null}
          </Col>
          <Col>
            {groupData.is_private == false ? (
              <Button onClick={handleJoinButton}>Join Group</Button>
            ) : (
              <Button onClick={handleRequestButton}>Request To Join</Button>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
          {groupData.currentBook?.title}
          </Col>
          <Col>
          {groupData.currentBook?.authors}
          </Col>
          <Col>
          Current Book:
          <img src={groupData.currentBook?.image}></img>
          </Col>
          <Button className="primary" onClick={() => setModalShow(true)}>
        Book Description
      </Button>

      <DescriptionModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        title={groupData.currentBook?.title || "No Title"}
        description={groupData.currentBook?.description || "No Description"}
        link={groupData.currentBook?.link || "No Link Available"}
      />
        </Row>
      </Container>
    );
};

export default Group;