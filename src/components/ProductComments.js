import React from "react";
import { useGetProductCommentsQuery } from "../Services/API";
import styled from "styled-components";

const StockComment = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    overflow-y: scroll;
    max-height: 200px;
`;

const WrapperComment = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
`;

export default function ProductComments({ productId }) {
    const {
        data: comments,
        isFetching,
        isError,
    } = useGetProductCommentsQuery(productId);

    if (isFetching) {
        return <div>Loading...</div>;
    }

    if (isError || !comments) {
        return <div>Error fetching comments or no comments found.</div>;
    }

    return (
        <WrapperComment>
            <h4>Product comments :</h4>
            {comments.length > 0 ? (
                <StockComment>
                    <div>
                        {comments.map((comment) => (
                            <div key={comment.id}>
                                <p>
                                    {comment.username}: {comment.comment}
                                </p>
                            </div>
                        ))}
                    </div>
                </StockComment>
            ) : (
                <div>No comments</div>
            )}
        </WrapperComment>
    );
}
