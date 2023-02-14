import styled from "styled-components";
import attributes from "../utils/constants/attributes";
import { HTMLTag } from "./utils/types/index.d";

export const Email = styled.p<HTMLTag>(...attributes);
export const Username = styled.p<HTMLTag>(...attributes);
export const Name = styled.p<HTMLTag>(...attributes);
export const Telephone = styled.p<HTMLTag>(...attributes);
export const Content = {
  Container: styled.article<HTMLTag>(...attributes),
  Header: styled.header<HTMLTag>(...attributes),
  Body: styled.div<HTMLTag>(...attributes),
  Footer: styled.footer<HTMLTag>(...attributes),
  Title: styled.h1<HTMLTag>(...attributes),
  Description: styled.p<HTMLTag>(...attributes),
  Message: styled.small<HTMLTag>(...attributes),
  Section: styled.section<HTMLTag>(...attributes),
};
export const DateTime = {
  Full: styled.time<HTMLTag>(...attributes),
  Years: styled.time<HTMLTag>(...attributes),
  Months: styled.time<HTMLTag>(...attributes),
  Days: styled.time<HTMLTag>(...attributes),
  Hours: styled.time<HTMLTag>(...attributes),
  Minutes: styled.time<HTMLTag>(...attributes),
  Seconds: styled.time<HTMLTag>(...attributes),
  Milliseconds: styled.time<HTMLTag>(...attributes),
};
export const Total = styled.p<HTMLTag>(...attributes);
export const Money = styled.p<HTMLTag>(...attributes);
export const Fieldset = {
  Container: styled.fieldset<HTMLInputElement>(...attributes),
  Label: styled.label<HTMLInputElement>(...attributes),
  Input: styled.input<HTMLInputElement>(...attributes),
  Message: styled.small<HTMLInputElement>(...attributes),
  MessageError: styled.small<HTMLInputElement>(...attributes),
  MessageSuccess: styled.small<HTMLInputElement>(...attributes),
  MessageWarning: styled.small<HTMLInputElement>(...attributes),
};  

export const Message = {
  Container: styled.article<HTMLTag>(...attributes),
  Header: styled.header<HTMLTag>(...attributes),
  Body: styled.div<HTMLTag>(...attributes),
  Footer: styled.footer<HTMLTag>(...attributes),
  Title: styled.h1<HTMLTag>(...attributes),
  Description: styled.p<HTMLTag>(...attributes),
  Section: styled.section<HTMLTag>(...attributes),
};

export const Copyright = styled.p<HTMLTag>(...attributes);