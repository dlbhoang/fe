import { Card } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";

const Search = (props) => {
  const text = props.match.params.keyword;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://product-nezx.onrender.com/products") // Lấy tất cả sản phẩm qua API
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log("Lỗi => " + err);
      });
  }, [3]);

  return (
    <div>
      <h1>Kết quả tìm kiếm</h1>
      {products
        .filter((data) => {
          if (text == null) {
            return data;
          } else if (data.title.toLowerCase().includes(text.toLowerCase())) {
            return data;
          }
        })
        .map((product, index) => {
          return (
            <div key={index}>
              <Card>
                <h5>{product.title}</h5>
              </Card>
            </div>
          );
        })}
    </div>
  );
};

export default Search;
