import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import FlexSearch from "flexsearch";
import { debounce } from "lodash";
import React from "react";
import useDataApi from "./APICall";
import SideFilter from "./SideFilter";
import Table from "./Table";

const NetworkWapper = () => {
  const [keys, setKeys] = React.useState([]);
  const [searched, setSearched] = React.useState(false);
  let cData;
  const searchIndex = FlexSearch.create({
    async: true,
    encode: "advanced",
    tokenize: "full",
    threshold: 0,
    resolution: 12,
    suggest: false,
    cache: false
  });

  const postProcessData = data => {

    data.forEach(element => {
        element["Date"] = new Date(element["Date"]).toLocaleDateString("en-GB", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        })
    });

    // data.forEach(d => {
    //   d["Withdrawal AMT"] = parseFloat(d["Withdrawal AMT"])
    //   d["Deposit AMT"] = parseFloat(d["Deposit AMT"])
    //   d["Balance AMT"] =  parseFloat(d["Balance AMT"])
    // });

    for (let i = 0; i < data.length; i++) {
      let d = data[i];
      searchIndex.add(
        i,
          d["Date"]+
          d["Transaction Details"]+
          d["Withdrawal AMT"]+
          d["Deposit AMT"]+
          d["Balance AMT"]
      );
    }
    console.log("search", searchIndex.info());

    setKeys(data);
    cData = data;
    return data;
  };

  const [{ isLoading, isError }] = useDataApi(
    "bankAccount",
    [],
    postProcessData
  );

  const isMounted = React.useRef(false);
  React.useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const doSearch = React.useMemo(
    () =>
      debounce(value => {
        if (!isMounted.current) {
          return;
        }

        if (value === "") {
          setSearched(false);
          setKeys(cData);
        } else {
          setSearched(true);
          searchIndex.search(value).then(results => {
            console.log("search results => ", results, cData.length);;
            results = results.map(i => cData[i])
            setKeys(results);
          });
        }
      }, 1000),
    []
  );

  return (
    <div>
      {isError && <div>Something went wrong ...</div>}
      {isLoading ? (
        <LinearProgress />
      ) : (
        <Grid container>
          <Grid item md={3} xs={12}>
            <SideFilter
              doSearch={doSearch}
            />
          </Grid>
          <Grid item md={9} xs={12}>
            <Table
              data={keys}
              searched={searched}
              setSearched={setSearched}
            />
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default NetworkWapper;
