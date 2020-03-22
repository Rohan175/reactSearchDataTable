import { TextField } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import classnames from "classnames";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { makeStyles } from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";
import React, { useState } from "react";
const useStyles = makeStyles(theme => ({
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: "auto",
    [theme.breakpoints.up("sm")]: {
      marginRight: -8
    }
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  alignLeft: {
    display: "flex",
    justifyContent: "space-between",
    verticalAlign: "middle"
  },
  wrapperItem: {
    marginLeft: "10px",
    marginRight: "10px",
    paddingLeft: "10px",
    paddingRight: "10px",
    paddingTop: "10px",
    paddingBottom: "10px",
    textAlign: "left"
  }
}));

const SideFilter = props => {
  const [expandInfo, setexpandInfo] = useState(false);
  const classes = useStyles();

  return (
    <div>
      <div className={classes.wrapperItem} style={{ paddingRight: "0px" }}>
        <div className={classes.alignLeft}>
          <TextField
            id="outlined-name"
            style={{ width: "100%" }}
            label="Search"
            className={classes.textField}
            onChange={e => props.doSearch(e.target.value)}
            margin="normal"
            variant="outlined"
          />
        </div>
        <br />
        <Divider />
        <br />
        <div className={classes.wrapperItem}>
          <div className={classes.alignLeft}>
            <Typography variant="subtitle1">Features</Typography>
            <IconButton
              style={{ padding: "0px" }}
              className={classnames(classes.expand, {
                [classes.expandOpen]:expandInfo
              })}
              onClick={e => setexpandInfo(!expandInfo)}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </div>
          <br />
          <Collapse in={expandInfo} timeout="auto">
              <Typography variant="body1">Search in indexed on all columns.</Typography>
              <br/>
              <Typography variant="body1">Hence search on text, amount & date can be done.</Typography>
              <br/>
              <Typography variant="body1">react memo & debounced is used for search input.</Typography>
              <br/>
              <Typography variant="caption" style={{fontSize:"16px"}}>
                  Each column can be sorted individally.
              </Typography>
            <br />
          </Collapse>
          </div>
      </div>
    </div>
  );
};

export default SideFilter;
