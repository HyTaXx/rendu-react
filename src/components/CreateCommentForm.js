import { useCreateCommentMutation } from "../Services/API";
import styled from "styled-components";

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    gap: 10px;
`;

const TextInput = styled.input`
    width: 300px;
    height: 30px;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.5);
    padding: 5px 10px;
`;

const TextArea = styled.textarea`
    width: 300px;
    height: 100px;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.5);
    padding: 5px 10px;
`;

const SubmitButton = styled.button`
    width: 300px;
    height: 30px;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.5);
    cursor: pointer;
    outline: none;
    color: white;
    background-color: #000000;
    padding: 5px 10px;
`;

export default function CreateCommentForm({ productId }) {
    const [createComment, { isLoading }] = useCreateCommentMutation();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const username = formData.get("username");
        const comment = formData.get("comment");

        await createComment({ productId, username, comment });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <h4>Leave a comment :</h4>
            <TextInput name="username" placeholder="Username" required />
            <TextArea name="comment" placeholder="Comment" required></TextArea>
            <SubmitButton type="submit" disabled={isLoading}>
                Submit
            </SubmitButton>
        </Form>
    );
}
