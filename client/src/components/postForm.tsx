import { type FormEvent, useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_POST_TO_GROUP } from '../utils/mutations';



interface PostFormProps {
    groupId: string;
    text: string;

}

const PostForm: React.FC<PostFormProps> = ({ groupId, text }) => { // groupId to post in group or bookId to post for a book within x group? still have to figure out what we want to pass.
    
    const [postText, setPostText] = useState(text);
  

    const [addPost, { error }] = useMutation(ADD_POST_TO_GROUP);

    const handleFormSubmit = async (event: FormEvent) => {
        event.preventDefault();

        try {
            await addPost({
                variables: { input: { groupId, text: postText }, },
            });
            console.log("Post Created");

            setPostText('');
        } catch (err) {
            console.error(err)
        }
     
    };

    return (
        <div>
            <h4>Make A Post</h4>
            <form
                className=''
                onSubmit={handleFormSubmit}>
                    <div className="mb-3">
                        <input
                        type="text"
                        className="form-control"
                        placeholder='Your Text Here'
                        value={postText}
                        onChange={(event) => setPostText(event.target.value)} />
                    </div>
                    <div>
                        <button type="submit">
                            Create Post
                        </button>
                    </div>
                    {error && (
                        <div>
                            Something went wrong...
                        </div>
                    )}
            </form>
        

        </div>
    );
};

export default PostForm;