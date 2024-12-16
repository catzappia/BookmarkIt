
import { type FormEvent, useState } from "react";
import { useMutation } from "@apollo/client";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import Col from "react-bootstrap/Col";
// import Row from "react-bootstrap/Row";
import Auth from "../utils/auth";

import { Post, Comment } from "../models/Post";
import { ADD_POST_TO_GROUP, ADD_COMMENT_TO_POST, DELETE_POST } from "../utils/mutations";
// import { QUERY_POSTS_BY_GROUP_ID } from "../utils/queries";



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
  const [commentText, setCommentText] = useState("");

  // const { data, loading, error, refetch } = useQuery(QUERY_POSTS_BY_GROUP_ID, { variables: { groupId: props.groupId } });
  // console.log("Post Data:", data);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;
  const [addPost] = useMutation(ADD_POST_TO_GROUP);
  const [addComment] = useMutation(ADD_COMMENT_TO_POST);
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
                {userData.username === post.user?.username ? ( <Button variant="danger" onClick={() => handleDeletePost(post._id, props.groupId)}>Delete Post</Button> ) : null}
                
                <Form onSubmit={(e) => handleCommentFormSubmit(e, post._id)}>
                  <Form.Group>
                    <Form.Label htmlFor="text">Add a Comment</Form.Label>
                    <Form.Control
                      as="textarea"
                      name={post._id}
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
