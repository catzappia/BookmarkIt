import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom'; 
import { QUERY_ME } from '../utils/queries';
// import { QUERY_GROUPS_BY_IDS } from '../utils/queries';
import { Group } from '../models/Group';


function Profile() {
  const router = useNavigate();

  const {loading, data} = useQuery(QUERY_ME);
  const userData = data?.me;
  console.log("UserData From Profile", data?.me);

  if (loading) return <p>Loading...</p>;
  

  const viewGroupPage = (group: any) => {
    router(`/clubs/${group.name}`);
  }

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{userData.username}</Card.Title>
        <Card.Text>
          Profile bio goes here.
        </Card.Text>
      </Card.Body>
      {data.me.adminGroups?.length > 0 ? (
        <ListGroup className="list-group-flush">
        <h3>Clubs I admin</h3>
        {data.me.adminGroups?.map((group: Group) => (
          <div key={group._id}>
            <ListGroup.Item>{group.name}<Button onClick={() => viewGroupPage(group)}>View</Button></ListGroup.Item>
          </div>
        ))}
      </ListGroup> ) : null };
      {data.me.groups?.length > 0 ? (
        <ListGroup className="list-group-flush">
        <h3>Clubs I'm in</h3>
        {data.me.groups?.map((group: Group) => (
          <div key={group._id}>
            <ListGroup.Item>{group.name}<Button onClick={() => viewGroupPage(group)}>View</Button></ListGroup.Item>
          </div>
        ))}
      </ListGroup> ) : null };
      <Card.Body>
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body>
    </Card>
  );
}

export default Profile;
