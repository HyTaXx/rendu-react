import { useGetProductsQuery } from "../Services/API";
import { useDispatch } from "react-redux";
import ProductComments from "../components/ProductComments";
import CreateCommentForm from "../components/CreateCommentForm";
import styled from "styled-components";
import React, { useState, useContext } from "react";
import { CartContext } from "../Providers/CartContext";
import { Link } from "react-router-dom";

const Header = styled.header`
    background-color: #ffffff;
    min-height: 15vh;
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
    justify-content: space-between;
    align-items: center;
    padding: 0 10vw;
`;

const Main = styled.main`
    background-color: #ffffff;
    min-height: 85vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: black;
    max-width: 100vw;
`;

const CartButton = styled.button`
    background-color: #ffffff;
    border: none;
    cursor: pointer;
    outline: none;
`;

const Modal = styled.div`
    position: absolute;
    z-index: 1;
    overflow: auto;
    background-color: rgb(255, 255, 255);
    padding: 20px;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    min-width: 300px;
    height: 350px;
    overflow-y: scroll;
`;

const ManageModal = styled.div`
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;
`;

const StockProduits = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 95vw;
    @media (max-width: 768px) {
        flex-direction: column;
        width: 100vw;
    }
`;

const StockProductInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
`;

const AddButton = styled.button`
    background-color: #ffffff;
    border: none;
    cursor: pointer;
    outline: none;
`;

const EmptyCartButton = styled.button`
    background-color: #000000;
    border: none;
    cursor: pointer;
    outline: none;
    color: white;
    font-weight: bold;
    width: 100%;
    padding: 10px;
    border-radius: 5px;
`;

const StockCartProduct = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const RemoveFromCart = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    outline: none;
    padding: 10px;
`;

const ProductInfo = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
`;

const OrderButton = styled.button`
    background-color: #000000;
    border: none;
    cursor: pointer;
    outline: none;
    color: white;
    font-weight: bold;
    width: 100%;
    padding: 10px;
    border-radius: 5px;
`;

const ContentModal = styled.div``;

export default function Home() {
    const { cart, addToCart, removeFromCart, emptyCart, calculateTotalPrice } =
        useContext(CartContext);
    const [showModal, setShowModal] = useState(false);
    let { isFetching } = useGetProductsQuery();
    return (
        <div>
            <Header>
                <h1>Le shop</h1>
                <Link to="/about">About</Link>
                <div>
                    {isFetching ? (
                        "Loading..."
                    ) : (
                        <>
                            <p>Items in cart: {cart?.length || 0}</p>
                            <CartButton
                                onClick={() => setShowModal(!showModal)}
                            >
                                <img
                                    src="grocery-store.png"
                                    alt="cart"
                                    width={40}
                                    height={40}
                                ></img>
                            </CartButton>
                            <CartModal
                                showModal={showModal}
                                setShowModal={setShowModal}
                                cart={cart}
                                removeFromCart={removeFromCart}
                                emptyCart={emptyCart}
                                calculateTotalPrice={calculateTotalPrice}
                            />
                        </>
                    )}
                </div>
            </Header>
            <Main>
                {isFetching ? (
                    "Loading..."
                ) : (
                    <div>
                        <ProductsList />
                    </div>
                )}
            </Main>
        </div>
    );
}

function ProductsList() {
    let { data: products } = useGetProductsQuery();
    const { cart, addToCart } = useContext(CartContext);

    return products.map((product) => (
        <React.Fragment key={product.id}>
            <StockProduits>
                <StockProductInfo>
                    <img src={product.image} width={100} height={100} />
                    <h3>{product.price}€</h3>
                    <ProductInfo>
                        <h3>{product.title}</h3>
                        <AddButton onClick={() => addToCart(product)}>
                            <img
                                src="button_add.png"
                                alt="add"
                                width={40}
                                height={40}
                            />
                        </AddButton>
                    </ProductInfo>
                </StockProductInfo>
                <ProductComments productId={product.id} />
                <CreateCommentForm productId={product.id} />
            </StockProduits>
            <hr />
        </React.Fragment>
    ));
}

function CartModal({
    showModal,
    setShowModal,
    cart,
    removeFromCart,
    emptyCart,
    calculateTotalPrice,
}) {
    return (
        showModal && (
            <Modal>
                <ContentModal>
                    <ManageModal>
                        <img
                            src="close.png"
                            alt="close"
                            onClick={() => setShowModal(false)}
                        />
                        <h2>Cart</h2>
                    </ManageModal>
                    <EmptyCartButton
                        onClick={() => {
                            emptyCart();
                        }}
                    >
                        🔥 Empty Cart 🔥
                    </EmptyCartButton>

                    {cart.map((item, index) => (
                        <StockCartProduct key={index}>
                            <h4>
                                {item.title} |{item.price}€
                            </h4>
                            <RemoveFromCart
                                onClick={() => removeFromCart(item.id)}
                            >
                                <img
                                    src="close.png"
                                    alt="remove"
                                    width={15}
                                    height={15}
                                />
                            </RemoveFromCart>
                        </StockCartProduct>
                    ))}
                    <hr />
                    <h3>Total: {calculateTotalPrice()}€</h3>
                    <OrderButton>Commander</OrderButton>
                </ContentModal>
            </Modal>
        )
    );
}
