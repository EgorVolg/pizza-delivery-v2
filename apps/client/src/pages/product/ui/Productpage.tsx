import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../../entities/products/model/products.api";
import styles from "./Productpage.module.css";

export const Productpage = () => {
  const { categoryId, productId } = useParams();

  return (
    <div>
      <h1>Пицца #{productId}</h1>
      <p>Категория: {categoryId}</p>
    </div>
  );
};
