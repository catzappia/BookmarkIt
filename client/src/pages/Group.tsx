import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { QUERY_GROUP_BY_NAME } from "../utils/queries";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

const Group = () => {
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
          {groupData.currentBook?.description}
          </Col>
          <Col>
          Current Book:
          <img src={groupData.currentBook?.image}></img>
          </Col>
        </Row>
      </Container>
    );
};

export default Group;