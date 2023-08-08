import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AutoComplete, Input } from "antd";
import { clearData, getAllProducts } from "../store/slices/productSlice";
import { localLanguage } from "../../utils/constants";

const Searchbar = () => {
  const data = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();
  const onSelect = (value) => {
    if (value.length) {
      const filterData = data?.productsMain.filter((item) => {
        return item.title.toLowerCase().includes(value.toLowerCase());
      });
      dispatch(clearData());
      dispatch(getAllProducts(filterData));
    } else {
      dispatch(clearData());
      dispatch(getAllProducts(data?.productsMain));
    }
  };
  const onSearch = (value) => {
    if (value.length) {
      const filterData = data?.productsMain.filter((item) => {
        return item.title.toLowerCase().includes(value.toLowerCase());
      });
      dispatch(clearData());
      dispatch(getAllProducts(filterData));
    } else {
      dispatch(clearData());
      dispatch(getAllProducts(data?.productsMain));
    }
  };

  return (
    <AutoComplete
      style={{
        width: "100%",
      }}
      onSearch={onSearch}
      onSelect={onSelect}
      notFoundContent={localLanguage.PRODUCT_NOT_FOUND}
      options={data?.products.map((product) => ({
        value: product.title,
        label: product.title,
      }))}
      placeholder={localLanguage.SEARCH_PLACEHOLDER}
      filterOption={(inputValue, option) => {
        return (
          option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        );
      }}
    />
  );
};

export default Searchbar;
