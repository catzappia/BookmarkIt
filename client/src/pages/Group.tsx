import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { useState } from "react";
import DescriptionModal from "../components/Modal-desc";
import "../styles/group.css";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { QUERY_GROUP_BY_NAME } from "../utils/queries";
import { EDIT_GROUP_CURRENT_BOOK } from "../utils/mutations";
import { ADD_BOOK_TO_GROUP_LIST } from "../utils/mutations";
import { NewBookInput } from "../models/Book";
import BookSearch from '../components/EditGroupModal/bookSearch';

const Group = () => {
  const [modalShow, setModalShow] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const params = useParams();
  const queryParam = params.groupName;

  const { data, loading, error } = useQuery(QUERY_GROUP_BY_NAME, {
    variables: { groupName: queryParam },
  });

  const [editGroupCurrentBook] = useMutation(EDIT_GROUP_CURRENT_BOOK);
  const [addBookToGroupList] = useMutation(ADD_BOOK_TO_GROUP_LIST);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const groupData = data.group;
  console.log('Group Data:', groupData);

  // const handleJoinButton = () => {
  //   console.log("Joining group:", groupData.name);
  //   window.location.reload();
  // };

  let setter: NewBookInput = {
    bookId: "",
    title: "",
    authors: [],
    description: "",
    image: "",
  };

  const handleEditFormSubmit = async (event: any) => {
    event.preventDefault();
    if (groupData.currentBook) {
      let prevBook: NewBookInput = {
        bookId: groupData.currentBook.bookId,
        title: groupData.currentBook.title,
        authors: groupData.currentBook.authors,
        description: groupData.currentBook.description,
        image: groupData.currentBook.image,
      };
      console.log("Previous Book:", prevBook);
      console.log("Group ID:", groupData._id);
      await addBookToGroupList({
        variables: { groupId: groupData._id, bookData: prevBook },
      });

      console.log("Setter:", setter);
      await editGroupCurrentBook({
        variables: { groupId: groupData._id, bookData: setter },
      });
    } else {
      console.log("Setter:", setter);
      await editGroupCurrentBook({
        variables: { groupId: groupData._id, bookData: setter },
      });
    }
    console.log("Edit form submitted");
    handleClose();
    window.location.reload();
  };

  const handleChildData = (data: NewBookInput): void => {
    const newCurrentBook = data;
    setter = {
      bookId: newCurrentBook.bookId,
      title: newCurrentBook.title,
      authors: newCurrentBook.authors,
      description: newCurrentBook.description,
      image: newCurrentBook.image,
    };
  };

  return (
    <Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Current Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BookSearch onDataChange={handleChildData} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditFormSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Row>
        <Col>Group Name: {groupData.name}</Col>
        <Col>{groupData.admin ? `Created by: ${groupData.admin}` : null}</Col>
        <Col>Join Group</Col>
      </Row>
      <Row>
        <Col>{groupData.currentBook?.title}</Col>
        <Col>{groupData.currentBook?.authors}</Col>
        <Col>
          Current Book:
          <img src={groupData.currentBook?.image}></img>
          <p onClick={handleShow}>Edit</p>
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
