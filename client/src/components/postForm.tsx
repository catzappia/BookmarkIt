
import { type FormEvent, useState } from "react";
import { useMutation } from "@apollo/client";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import Col from "react-bootstrap/Col";
// import Row from "react-bootstrap/Row";

import { Post, Comment } from "../models/Post";
import { ADD_POST_TO_GROUP, ADD_COMMENT_TO_POST } from "../utils/mutations";

interface PostFormProps {
  groupId: string;
  posts: Post[];

  handleRefresh: () => void;
}

const PostForm = (props: PostFormProps) => {
  console.log("Post Props: ", props);
  const [postText, setPostText] = useState("");
  const [commentText, setCommentText] = useState("");

  const [addPost] = useMutation(ADD_POST_TO_GROUP);
  const [addComment] = useMutation(ADD_COMMENT_TO_POST);

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

  const handleCommentFormSubmit = async (event: FormEvent, postId: string) => {
    event.preventDefault();

    try {
      await addComment({
        variables: { input: postId, commentText },
      });

      setCommentText("");
    } catch (err) {
      console.error(err);
    }
  };

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
                <h5>{post?.user?.username}</h5>
                <p>{post.text}</p>
                <Form onSubmit={(e) => handleCommentFormSubmit(e, post.id)}>
                  <Form.Group>
                    <Form.Label htmlFor="text">Add a Comment</Form.Label>
                    <Form.Control
                      as="textarea"
                      name={post.id}
                      rows={3}
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                    />
                  </Form.Group>
                  <Button type="submit">Submit</Button>
                </Form>
                {post.comments?.map((comment: Comment, index: number) => {
                  return (
                    <Container key={index}>
                      <h6>{comment.user.username}</h6>
                      <p>{comment.text}</p>
                    </Container>
                  );
                }) ?? null}
              </Container>
            );
          })
        : null}
    </Container>
  );
};

export default PostForm;
