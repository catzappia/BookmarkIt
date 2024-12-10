import { type FormEvent, useState } from 'react';
import { useMutation } from '@apollo/client';
// import { our post mutation } from '';
// import Post './models/Post';

const PostForm: React.FC = ({ groupId }: any, { profileId }: any) => { // groupId to post in group or bookId to post for a book within x group? still have to figure out what we want to pass.
    
    const [text, setText] = useState('');

    const [addPost, { error }] = useMutation(ADD_POST); // mutation that needs to be implemented

    const handleFormSubmit = async (event: FormEvent) => {
        event.preventDefault();

        try {
            await addPost({
                variables: { groupId, profileId, text },
            });

            setText('');
        } catch (err) {
            console.error(err)
        }
    };

    return (
        <div>
            <h4>Make A Post</h4>
            <form
                className=''
                onSubmit={(handleFormSubmit)}>
                    <div className="mb-3">
                        <input
                        type="text"
                        className="form-control"
                        placeholder='Your Text Here'
                        value={text}
                        onChange={(event) => setText(event.target.value)} />
                    </div>
                    <div>
                        <button>
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