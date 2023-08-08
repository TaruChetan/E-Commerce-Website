import { Button, Checkbox, Divider, Popover, Radio, Space } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearData, getAllProducts } from "../store/slices/productSlice";
import { localLanguage } from "../../utils/constants";

const Filters = () => {
  const dispatch = useDispatch();
  const MainData = useSelector((state) => state.productReducer);

  const oncheck = (e) => {
    let sortedData = [...MainData.products];
    dispatch(clearData());
    if (e.target.value === 1) {
      sortedData.sort((a, b) => a.price - b.price);
    } else if (e.target.value === 2) {
      sortedData.sort((a, b) => b.price - a.price);
    }
    dispatch(getAllProducts(sortedData));
  };

  const onChange = (checkedValues) => {
    if (checkedValues.length) {
      dispatch(clearData());
      const filterData = MainData?.productsMain.filter((item) => {
        return checkedValues.includes(item.category);
      });

      dispatch(getAllProducts(filterData));
    } else {
      dispatch(clearData());
      dispatch(getAllProducts(MainData?.productsMain));
    }
  };

  const options = [
    {
      label: localLanguage.SMARTPHONE,
      value: localLanguage.SMARTPHONE,
    },
    {
      label: localLanguage.LAPTOP,
      value: localLanguage.LAPTOP,
    },
    {
      label: localLanguage.FRAGRANCE,
      value: localLanguage.FRAGRANCE,
    },
    {
      label: localLanguage.SKINCARE,
      value: localLanguage.SKINCARE,
    },
    {
      label: localLanguage.GROCERY,
      value: localLanguage.GROCERY,
    },
    {
      label: localLanguage.HOME_DECORATION,
      value: localLanguage.HOME_DECORATION,
    },
  ];
  const sorting = [
    {
      label: localLanguage.SORTING_LOW_TO_HIGH,
      value: 1,
    },
    {
      label: localLanguage.SORTING_HIGH_TO_LOW,
      value: 2,
    },
  ];
  const content = (
    <div>
      <h4>{localLanguage.CATEGORY}</h4>
      <div>
        <Checkbox.Group
          style={{ display: "flex", flexDirection: "column" }}
          options={options}
          onChange={onChange}
        />
      </div>
      <Divider />
      <h4>{localLanguage.SORT_BY_PRICE}</h4>
      <div>
        <Radio.Group
          style={{ display: "flex", flexDirection: "column" }}
          options={sorting}
          onChange={oncheck}
        />
      </div>
    </div>
  );

  return (
    <>
      <div style={{}}>
        <Space wrap>
          <Popover content={content} trigger="click">
            <Button style={{ width: "100%" }}>{localLanguage.FILTER}</Button>
          </Popover>
        </Space>
      </div>
    </>
  );
};

export default Filters;
