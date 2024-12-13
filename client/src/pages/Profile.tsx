import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { QUERY_ME } from '../utils/queries';
import { QUERY_GROUPS_BY_IDS } from '../utils/queries';
import { Group } from '../models/Group';


function Profile() {
  const router = useNavigate();

  const {loading, error, data} = useQuery(QUERY_ME);
  const userData = data?.me;
  console.log("UserData From Profile", data?.me);

  const { data: adminGroupsData } = useQuery(QUERY_GROUPS_BY_IDS, { variables: { groupIds: userData?.adminGroups.map((group: any) => group._id) } });
  const adminGroups = adminGroupsData?.groupsByIds;

  const { data: groupsData } = useQuery(QUERY_GROUPS_BY_IDS, { variables: { groupIds: userData?.groups.map((group: any) => group._id) } });
  const groups = groupsData?.groupsByIds;

  useEffect(() => {
    if (adminGroupsData || groupsData) {
      console.log("Admin Group Data: ", adminGroupsData);
      console.log("By Ids: ", adminGroupsData.groupsByIds);
    }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const viewGroupPage = (group: any) => {
    router(`/groups/${group.name}`);
  }

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
      <Card.Body>
        <Card.Title>{userData.username}</Card.Title>
        <Card.Text>
          Profile bio goes here.
        </Card.Text>
      </Card.Body>
      {adminGroups?.length > 0 ? (
        <ListGroup className="list-group-flush">
        <h3>Groups I admin</h3>
        {adminGroups?.map((group: Group) => (
          <div key={group._id}>
            <ListGroup.Item>{group.name}<Button onClick={() => viewGroupPage(group)}>View</Button></ListGroup.Item>
          </div>
        ))}
      </ListGroup> ) : null };
      {groups?.length > 0 ? (
        <ListGroup className="list-group-flush">
        <h3>Groups I'm in</h3>
        {groups?.map((group: Group) => (
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
