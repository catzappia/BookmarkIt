import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import DescriptionModal from "../components/Modal-desc";
import "../styles/group.css";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { QUERY_GROUP_BY_NAME } from "../utils/queries";
import {
  EDIT_GROUP_CURRENT_BOOK,
  ADD_BOOK_TO_GROUP_LIST,
  ADD_USER_TO_GROUP,
  LEAVE_GROUP,
  DELETE_GROUP,
} from "../utils/mutations";
import { NewBookInput } from "../models/Book";
import BookSearch from "../components/EditGroupModal/bookSearch";
import PostForm from "../components/postForm";
import Auth from "../utils/auth";

const Group = () => {
  // const router = useNavigate();

  //Get User Data
  const token = Auth.loggedIn() ? Auth.getToken() : null;
  if (!token) {
    return <p>Not Logged In</p>;
  }

  let userData = Auth.getProfile() as { _id: string; [key: string]: any };
  userData = userData.data;

  const handleRefresh = () => {
    refetch();
  };

  const [editGroupCurrentBook] = useMutation(EDIT_GROUP_CURRENT_BOOK);
  const [addBookToGroupList] = useMutation(ADD_BOOK_TO_GROUP_LIST);
  const [addUserToGroup] = useMutation(ADD_USER_TO_GROUP);
  const [removeUserFromGroup] = useMutation(LEAVE_GROUP);
  const [deleteGroup] = useMutation(DELETE_GROUP);

  const [modalShow, setModalShow] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const params = useParams();
  const queryParam = params.groupName;

  const { data, loading, error, refetch } = useQuery(QUERY_GROUP_BY_NAME, {
    variables: { groupName: queryParam },
  });

  const groupData = data?.group;
  console.log("Group Data:", groupData);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleJoinButton = async () => {
    await addUserToGroup({
      variables: { input: { groupId: groupData._id } },
    });
    console.log("User joined group");
    handleRefresh();
  };

  const handleLeaveButton = async () => {
    await removeUserFromGroup({
      variables: { input: { groupId: groupData._id } },
    });
    console.log("User left group");
    handleRefresh();
  };

  const handleDeleteButton = async () => {
    await deleteGroup({
      variables: { groupId: groupData._id },
    });
    console.log("Group deleted");
    window.location.href = "/";
  };

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
    handleRefresh();
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

  const checkUsers = (array: any) => {
    for (let i = 0; i < array.length; i++) {
      if (array[i]._id === userData._id) {
        return true;
      }
    }
    return false;
  };

  return (
    <Container>
      <Modal show={show} onHide={handleClose} size={"xl"}>
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

      <Row className="text-center">
        <Col>
          <h2>{groupData.name}</h2>
          <p>{groupData.description}</p>
        </Col>
        <Col>Created by: {groupData?.admin?.username}</Col>
        <Col>
          {userData._id === groupData.admin._id ? (
            <Button onClick={handleDeleteButton}>Delete Club</Button>
          ) : Array.isArray(groupData.users) && checkUsers(groupData.users) ? (
            <Button onClick={handleLeaveButton}>Leave Club</Button>
          ) : (
            <Button onClick={handleJoinButton}>Join Club</Button>
          )}
        </Col>
      </Row>

      <Row className="text-center">
        <Col>
          <p>
            Current Book: {groupData.currentBook?.title ? groupData.currentBook.title : null}{" "}
            {userData._id === groupData.admin._id ? (
              <a className="editButton" onClick={handleShow}>
                Edit
              </a>
            ) : null}
          </p>
          {groupData.currentBook?.authors ? <p>Written By: {groupData.currentBook?.authors}</p> : null}
          <img
            className="currentImage"
            src={groupData.currentBook?.image}
          ></img>
          <Row></Row>
          {groupData.currentBook?.description? <Button
            className="descriptionButton"
            onClick={() => setModalShow(true)}
          >
            Book Description
          </Button> : null}
        </Col>

        <DescriptionModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          title={groupData.currentBook?.title || "No Title"}
          description={groupData.currentBook?.description || "No Description"}
          link={groupData.currentBook?.link || "No Link Available"}
        />
      </Row>
      <PostForm
        groupId={groupData._id}
        posts={groupData.posts}
        handleRefresh={handleRefresh}
      />
    </Container>
  );
};

export default Group;
