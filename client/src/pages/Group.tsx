import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { QUERY_GROUP_BY_NAME } from "../utils/queries";
import { EDIT_GROUP_CURRENT_BOOK } from "../utils/mutations";
import { ADD_BOOK_TO_GROUP_LIST } from "../utils/mutations";
import BookSearch from "../components/EditGroupModal/bookSearch";
import { NewBookInput } from "../models/Book";


const Group = () => {
  const params = useParams();
  const queryParam = params.groupName;

  const { data, loading, error } = useQuery(QUERY_GROUP_BY_NAME, {
    variables: { groupName: queryParam },
  });

  const [editGroupCurrentBook] = useMutation(EDIT_GROUP_CURRENT_BOOK);
  const [addBookToGroupList] = useMutation(ADD_BOOK_TO_GROUP_LIST);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const groupData = data.group;
  console.log("GroupData:", groupData);

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
      }
      console.log("Previous Book:", prevBook);
      console.log("Group ID:", groupData._id);
      await addBookToGroupList({
        variables: { groupId: groupData._id, bookData: prevBook },
      })

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
    console.log("Discover Child Data:", newCurrentBook);
    setter = {
      bookId: newCurrentBook.bookId,
      title: newCurrentBook.title,
      authors: newCurrentBook.authors,
      description: newCurrentBook.description,
      image: newCurrentBook.image,
    }
  };

  return (
    <Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Current Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BookSearch
            onDataChange={handleChildData}
          />
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
        <Col>{groupData.description}</Col>
        <Col>{groupData.admin ? `Created by: ${groupData.admin}` : null}</Col>
        <Col><Button>Join Group</Button></Col>
      </Row>
      <Row>
        <Col>
          <Row>
            <Col>
              <Row>
                Currently Reading: {groupData.currentBook?.title}
                <a onClick={handleShow}>Edit</a>
              </Row>
              <Row>Author: {groupData.currentBook?.authors}</Row>
              <Row>
                <img src={groupData.currentBook?.image}></img>
                {groupData.currentBook?.description}
              </Row> 
              <Row>
                {groupData.books.map((book: NewBookInput, index: number) => {
                  return (
                    <Col key={index}>
                      <h5>{book.title}</h5>
                      <img src={book.image} alt={book.title} />
                      <p>{book.authors}</p>
                    </Col>
                  );
                })}
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Group;
