import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Collapse } from "reactstrap";
import styled from "styled-components";

function CollapsiblePanel({ children, ...props }) {
  const { title, collapse } = props;
  const [isCollapse, setIsCollapse] = useState(collapse);
  const [icon, setIcon] = useState("fa fa-chevron-down");
  const toggle = () => {
    setIsCollapse(!isCollapse);
    setIcon(state => {
      return state === "fa fa-chevron-down"
        ? "fa fa-chevron-right"
        : "fa fa-chevron-down";
    });
  };

  const animate = collapse => {
    setIsCollapse(collapse);
    setIcon(state => {
      return state === "fa fa-chevron-down"
        ? "fa fa-chevron-right"
        : "fa fa-chevron-down";
    });
  };

  useEffect(() => {
    animate(!collapse);
  }, [collapse]);

  return (
    <>
    
          <Actions   onClick={() => toggle()} className="d-flex justify-content-between">
          <p> {title} </p>
          <p>+</p>
          </Actions>
       
    
      <Collapse style={{backgroundColor:'#fff',filter:' drop-shadow(0px -1px 38px rgba(0, 0, 0, 0.12))'}} className="border text-left p-2" isOpen={isCollapse}>
        {children}
      </Collapse>
    </>
  );
}

CollapsiblePanel.defaultProps = {
  children: "Add node as a child",
  title: "Collapsible Panel",
  collapse: true
};

export default CollapsiblePanel;

const Actions = styled.div`
padding:10px;
cursor:pointer;
width:550px;
height: 48px;
border-radius: 4px;
background-color:#fff;
filter: drop-shadow(0px -1px 38px rgba(0, 0, 0, 0.12));
font-size: 16px;
font-family:Roobert-medium;
color:#000;
@media (min-width: 260px) and (max-width: 820px){
    width:370px;
 }
`