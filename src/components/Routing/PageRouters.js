import React, { useEffect } from "react";

const PageRouters = () => {
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => console.log(json));
  }, []);
  return <div>PageRouters</div>;
};

export default PageRouters;
