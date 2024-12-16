import { type FormEvent, useState } from "react";
import { useMutation } from "@apollo/client";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { Post, Comment } from "../models/Post";
import { ADD_POST_TO_GROUP } from "../utils/mutations";
import { DELETE_POST } from "../utils/mutations";
import CommentComponent from "../components/comment";
import Auth from "../utils/auth";

interface PostFormProps {
  groupId: string;
  posts: Post[];

  handleRefresh: () => void;
}

const PostForm = (props: PostFormProps) => {
  
  //Get User Data
  const token = Auth.loggedIn() ? Auth.getToken() : null;
  if (!token){
    return <p>Not Logged In</p>
  };

  let userData = Auth.getProfile() as { _id: string; [key: string]: any };
  userData = userData.data;
  console.log("User Data:", userData);

  console.log("Post Props: ", props);
  const [postText, setPostText] = useState("");

  const [modalState, setModalState] = useState<{ [key: string]: boolean }>({});
  const handleShow = (postId: string) => {
    setModalState((prev) => ({ ...prev, [postId]: true }));
  };

  const handleClose = (postId: string) => {
    setModalState((prev) => ({ ...prev, [postId]: false }));
  };

  const [addPost] = useMutation(ADD_POST_TO_GROUP);

  const [deletePost] = useMutation(DELETE_POST);

  const handlePostFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await addPost({
        variables: { input: { groupId: props.groupId, text: postText } },
      });

      setPostText("");
      props.handleRefresh();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeletePost = async (postId: string, groupId: string) => {
    try {
      await deletePost({
        variables: { input: { groupId: groupId, postId: postId} },
      });

      props.handleRefresh();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Container>
      <Form onSubmit={handlePostFormSubmit}>
        <Form.Group>
          <Form.Label htmlFor="text">Add a Post</Form.Label>
          <Form.Control
            as="textarea"
            name="postText"
            rows={3}
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          />
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>
      {props.posts?.length !== 0
        ? props.posts?.map((post: Post, index: number) => {
            return (
              <Container key={index}>
                <Modal
                  show={modalState[post._id]}
                  onHide={() => handleClose(post._id)}
                >
                  <Modal.Header>
                    <Modal.Title>Comments</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <CommentComponent postId={post._id} handleRefresh={() => handleClose(post._id)}/>
                    <Button onClick={() => handleClose(post._id)}>Close</Button>
                  </Modal.Body>
                </Modal>
                <h5>{post?.user?.username}</h5>
                <p>{post.text}</p>
                {userData.username === post.user?.username ? ( <Button variant="danger" onClick={() => handleDeletePost(post._id, props.groupId)}>Delete Post</Button> ) : null}
                {post.comments?.map((comment: Comment, index: number) => {
                  return (
                    <Container key={index}>
                      <h6>User: {comment.user?.username}</h6>
                      <p>{comment.text}</p>
                    </Container>
                  );
                })}
                <Button onClick={() => handleShow(post._id)}>
                  Add Comment
                </Button>
              </Container>
            );
          })
        : null}
    </Container>
  );
};

export default PostForm;
