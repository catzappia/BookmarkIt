import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { useMutation } from "@apollo/client";
import { FormEvent } from "react";
import { useState } from "react";

import { ADD_COMMENT_TO_POST } from "../utils/mutations";

interface CommentProps {
  postId: string;

    handleRefresh: () => void;
}
const Comment = (props: CommentProps) => {
  const [commentText, setCommentText] = useState("");
  const [addComment] = useMutation(ADD_COMMENT_TO_POST);

  const handleCommentFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    console.log("Post ID: ", props.postId);
    console.log("Comment Text: ", commentText);
    try {
      await addComment({
        variables: { input: { postId: props.postId, text: commentText } },
      });

      setCommentText("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form onSubmit={handleCommentFormSubmit}>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Add a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
      </Form.Group>
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default Comment;
