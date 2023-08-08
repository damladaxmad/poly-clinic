import { Button, Snackbar } from "@material-ui/core";
import { Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutForm from "../Checkout/CheckoutForm";
import TheTable from "../TableItems/TheTable";
import AdditionalInfo from "./AdditionalInfo";
import PriceBox from "./PriceBox";
import Selectors from "./Selectors";
import { addTableData, deleteTableData } from "../../../redux/actions/tableDataActions";

const PurchaseForm = (props) => {
  const [error, setError] = useState(false);
  const [disable, setDisable] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [reset, setReset] = useState(false);
  const open = Boolean(anchorEl);
  const [autoReset, setAutoReset] = useState(1);

  const productsD = useSelector((state) => state.products.products);
  const dispach = useDispatch()


  const [purchaseData, setPurchaseData] = useState({
    item: null,
    unitPrice: null,
    salePrice: null,
    quantity: null,
  });

  const [purchaseInfo, setPurchaseInfo] = useState({
    type: "cash",
    vendor: null,
    date: null,
  });

  let unitP = null;
  productsD?.map((product) => {
    if (product.name == purchaseData.item) unitP = product.unitPrice;
  });
  let saleP = null;
  productsD?.map((product) => {
    if (product.name == purchaseData.item) saleP = product.salePrice;
  });

  const [products, setProducts] = useState([]);

  const removeItem = (item) => {
    dispach(deleteTableData(item))
    setProducts((current) => current.filter((i) => i.item !== item.item));
    setPurchaseData((prevState) => {
      return {
        ...prevState,
        item: null,
      };
    });
  };

  useEffect(() => {
    if (purchaseData) setError(false);
  }, [ purchaseData]);

  useEffect(() => {
    if (!purchaseData.item) setReset((state) => state + 1);
  }, [purchaseData]);

  console.log("again and again")
  return (
    <div style={{ display: "flex", gap: "40px", flexDirection: "column" }}>
      <Selectors
        item={(data) => {
          setPurchaseData((prevState) => {
            return {
              ...prevState,
              item: data,
            };
          });
        }}
        type={(data) => {
          setPurchaseInfo((prevState) => {
            return {
              ...prevState,
              type: data,
            };
          });
        }}
        vendor={(data) => {
          setPurchaseInfo((prevState) => {
            return {
              ...prevState,
              vendor: data,
            };
          });
        }}
        date={(data) => {
          setPurchaseInfo((prevState) => {
            return {
              ...prevState,
              date: data,
            };
          });
        }}
        autoReset={autoReset}
      />

      <div
        style={{
          display: "flex",
          gap: "50px",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
          <div style={{ display: "flex", gap: "30px", alignItems: "flex-end" }}>
            <PriceBox
              unitPriceD={unitP}
              salePriceD={saleP}
              total={purchaseData?.unitPrice * purchaseData?.quantity}
              reset={reset}
              unitPrice={(data) => {
                setPurchaseData((prevState) => {
                  return {
                    ...prevState,
                    unitPrice: parseFloat(data),
                  };
                });
                setReset(false);
              }}
              salePrice={(data) => {
                setPurchaseData((prevState) => {
                  return {
                    ...prevState,
                    salePrice: parseFloat(data),
                  };
                });
                setReset(false);
              }}
              quantity={(data) => {
                setPurchaseData((prevState) => {
                  return {
                    ...prevState,
                    quantity: parseInt(data),
                  };
                });
                setReset(false);
              }}
              item={purchaseData.item}
            />

            <Button
              disabled={disable}
              style={{
                width: "140px",
                fontSize: "15px",
                height: "40px",
                borderRadius: "8px",
                fontWeight: "bold",
                background: disable ? "lightGray" : "black",
                color: "white",
              }}
              type="submit"
              variant="contained"
              onClick={() => {
                if (
                  !purchaseData.item ||
                  !purchaseData.unitPrice ||
                  !purchaseData.salePrice ||
                  !purchaseData.quantity
                ) {
                  return setError(true);
                }
              
                setError(false);
                setDisable(true);
                dispach(addTableData(purchaseData))
                setProducts([...products, purchaseData]);
                setReset(true);
                setAutoReset((state) => state + 1);
                setPurchaseData((prevState) => {
                  return {
                    ...prevState,
                    quantity: null,
                    unitPrice: null,
                    salePrice: null,
                  };
                });
                setDisable(false);
              }}
            >
              Add Item
            </Button>
          </div>

          {error && (
            <p
              style={{
                color: "red",
                marginLeft: "50px",
                fontSize: "16px",
                alignSelf: "center",
              }}
            >
              {" "}
              Please, enter
              {!purchaseData.item && " item,"}
              {!purchaseData.quantity && " quantiy,"}
              {!purchaseData.unitPrice && " unitPrice,"}
              {!purchaseData.salePrice && " salePrice"},{" "}
            </p>
          )}

          {true && (
            <TheTable
              removeItem={(item) => removeItem(item)}
            />
          )}
        </div>

        <CheckoutForm
          products={products}
          data={purchaseInfo}
          complete={() => {
            // setTableData([]);
            setProducts([]);
            setPurchaseData((prevState) => {
              return {
                ...prevState,
                quantity: null,
                unitPrice: null,
                salePrice: null,
                item: null,
              };
            });
          }}
        />
      </div>
    </div>
  );
};

export default PurchaseForm;