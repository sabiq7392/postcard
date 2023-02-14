import { Attributes, HTMLTag, ResponsiveCss } from "./../utils/types/index.d";
import styled from "styled-components";
import attributes from "../../utils/constants/attributes";
import { FlexDirection } from "../utils/types";
import { gap } from "../../utils/styling/responsiveProp";

interface Props extends Attributes, HTMLTag {
  container?: true,
  item?: true,
  vCenter?: true,
  center?: true,
  alignItems?: string,
  hCenter?: true,
  justifyContent?: string,
  gap?: number | string | ResponsiveCss,
  direction?: FlexDirection,
}

export const Flex = styled.div<Props>(
  props => (
    props.container || !props.item ? {
      display: "flex",
      alignItems: props.vCenter ? "center" : props.center ? "center" : props.alignItems,
      justifyContent: props.hCenter ? "center" : props.center ? "center" : props.justifyContent,
      gap: typeof props.gap === "number" ? props.gap + "px" : typeof props.gap === "string" ? props.gap : undefined,
      flexDirection: props.direction,
    }
    : 
    {
      
    }
  ),
  gap,
  ...attributes,
);
